const { Groq } = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const Medecin = require('../models/Medecin');
const RendezVous = require('../models/RendezVous');
const langdetect = require('langdetect'); // ✅ Ajout

exports.chatbotIA = async (req, res) => {
  const { question } = req.body;

  try {
    // 🧠 Détection automatique de langue
    const detectedLang = langdetect.detect(question);
    const langue = detectedLang === 'fr' ? 'fr' : 'en';

    // 🔎 Récupération des données MongoDB
    const medecins = await Medecin.find();
    const rendezvous = await RendezVous.find({ statut: 'programmé' })
      .populate('medecin', 'nom specialite')
      .populate('patient', 'name email');

    const specialites = [...new Set(medecins.map(m => m.specialite))];
    const totalMedecins = medecins.length;
    const totalRDV = rendezvous.length;
    const dispoCount = medecins.filter(m => m.disponibilites && m.disponibilites.length > 0).length;

    const nomsMedecins = medecins.map(m => m.nom).join(', ');

    const horairesRDV = rendezvous
      .filter(r => r.medecin && r.medecin.nom && r.patient)
      .map(r => `• ${r.date} à ${r.heure} — Patient : ${r.patient.name}, Médecin : ${r.medecin.nom} (${r.medecin.specialite})`)
      .join('\n');

    const systemPrompt = langue === 'fr'
      ? `Tu es l'assistant officiel de la Clinique+. Voici les informations en temps réel :
- Nombre de médecins inscrits : ${totalMedecins}
- Spécialités disponibles : ${specialites.join(', ')}
- Médecins : ${nomsMedecins}
- Nombre de rendez-vous programmés : ${totalRDV}
- Rendez-vous actuels :
${horairesRDV}

Tu peux répondre à ces questions intelligentes :
1. "Comment réserver un rendez-vous ?" → Réponds : cliquez sur "Prendre rendez-vous" dans le menu ou allez sur /rendez-vous.
2. "Je veux annuler un rendez-vous" → Dites : connectez-vous, allez dans 'Mes rendez-vous' et cliquez sur 'Annuler'.
3. "Je me suis trompé d'heure" → Explique comment modifier un rendez-vous dans le tableau de bord.
4. "Peut-on prendre RDV par téléphone ?" → Oui, au 514-123-4567.

Questions médicales à traiter :
- "J’ai mal à la poitrine" → recommander un cardiologue
- "Mon enfant tousse" → recommander un pédiatre
- "Un médecin qui parle anglais ?" → filtrer les médecins parlant anglais
- "Qui est libre cette semaine ?" → proposer un médecin avec créneaux les plus proches

Réponds toujours poliment, clairement et uniquement en français.`
      : `You are the official assistant of Clinique+. Here is the real-time information:
- Registered doctors: ${totalMedecins}
- Specialties available: ${specialites.join(', ')}
- Doctors: ${nomsMedecins}
- Total scheduled appointments: ${totalRDV}
- Current appointment schedule:
${horairesRDV}

You can also answer intelligently:
1. "How to book an appointment?" → Say: click "Book Appointment" in the menu or go to /rendez-vous.
2. "I want to cancel my appointment" → Say: log in, go to 'My Appointments', then click 'Cancel'.
3. "I chose the wrong time" → Explain how to edit it from the dashboard.
4. "Can I book by phone?" → Yes, call 514-123-4567.

Medical logic:
- "Chest pain" → recommend a cardiologist
- "My child is coughing" → recommend a pediatrician
- "Doctor who speaks English?" → filter doctors who speak English
- "Fast appointment this week?" → suggest doctor with earliest availability

Always answer politely and only in English.`;

    const chat = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      model: 'llama3-8b-8192'
    });

    res.json({ response: chat.choices[0].message.content });
  } catch (err) {
    console.error("Erreur IA enrichie :", err);
    res.status(500).json({ error: 'Erreur IA enrichie' });
  }
};


exports.recommanderMedecin = async (req, res) => {
  const { symptome, langue } = req.body;

  const correspondances = [
    { mots: ['poitrine', 'coeur', 'palpitations'], specialite: 'Cardiologue' },
    { mots: ['toux', 'respirer', 'asthme', 'bronches'], specialite: 'Pneumologue' },
    { mots: ['enfant', 'fièvre', 'bébé', 'pédiatrie'], specialite: 'Pédiatre' },
    { mots: ['tête', 'migraine', 'fatigue', 'fièvre'], specialite: 'Généraliste' },
    { mots: ['estomac', 'digestion', 'douleur abdominale'], specialite: 'Généraliste' },
  ];

  const match = correspondances.find(entry =>
    entry.mots.some(mot => symptome.toLowerCase().includes(mot))
  );

  if (!match) {
    return res.json({
      message: langue === 'fr'
        ? "Je suis désolé, je ne peux pas identifier la spécialité à partir de ce symptôme."
        : "Sorry, I couldn’t identify the medical specialty based on the symptom."
    });
  }

  try {
    const medecins = await Medecin.find({ specialite: match.specialite });

    if (medecins.length === 0) {
      return res.json({
        message: langue === 'fr'
          ? `Aucun médecin ${match.specialite} n'est disponible actuellement.`
          : `No ${match.specialite} doctor is currently available.`
      });
    }

    const liste = medecins.map(m => `• ${m.nom}`).join('\n');

    return res.json({
      message: langue === 'fr'
        ? `Voici les médecins spécialisés en ${match.specialite} :\n${liste}`
        : `Here are the available ${match.specialite} doctors:\n${liste}`
    });
  } catch (err) {
    console.error("Erreur moteur de recommandation :", err);
    res.status(500).json({ error: 'Erreur moteur IA' });
  }
};
