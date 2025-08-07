// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLang = localStorage.getItem('langue') || 'fr';

i18n.use(initReactI18next).init({
  lng: savedLang,
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
  resources: {
    fr: {
      translation: {
        accueil: "Accueil",
        services: "Services",
        specialites: "Spécialités",
        laboratoire: "Laboratoires",
        laboratoire_titre: "Laboratoire d'Analyses Médicales",
        laboratoire_sous_titre: "Des services fiables pour vos examens biologiques",
        laboratoire_section1_titre: "Des équipements modernes",
        laboratoire_section1_contenu: "Notre laboratoire est équipé de technologies de pointe permettant des analyses rapides, fiables et sécurisées.",
        laboratoire_section2_titre: "Une équipe qualifiée",
        laboratoire_section2_contenu: "Nos biologistes et techniciens sont hautement qualifiés pour garantir des résultats précis et un accompagnement personnalisé.",
        laboratoire_section3_titre: "Examens disponibles",
        laboratoire_section3_contenu: "Nous réalisons une large gamme d’examens : sanguins, urinaires, hormonaux, sérologiques et bien plus encore.",
        desc_laboratoire: "Nos laboratoires sont équipés pour fournir des analyses rapides et fiables.",

        urgences: "Urgences",
        desc_urgences: "Service d'urgence ouvert 24h/24 pour répondre à toutes les situations critiques.",
        urgence_rapide_titre: "Prise en charge rapide",
        urgence_rapide_texte: "Nos équipes d'urgence sont prêtes à intervenir immédiatement pour toutes les urgences médicales.",
        urgence_equipe_titre: "Médecins expérimentés",
        urgence_equipe_texte: "Notre personnel comprend des médecins urgentistes, infirmiers et spécialistes formés aux situations critiques.",
        urgence_localisation_titre: "Accès facile",
        urgence_localisation_texte: "Notre service d'urgence est situé au rez-de-chaussée avec accès direct 24h/24, 7j/7.",

        radiologie: "Radiologie",
        desc_radiologie: "Imagerie médicale moderne pour un diagnostic précis.",
        radiologie_section1_titre: "Technologie de pointe",
        radiologie_section1_contenu: "Notre service de radiologie utilise des équipements d’imagerie dernier cri pour des diagnostics précis.",
        radiologie_section2_titre: "Spécialistes en imagerie",
        radiologie_section2_contenu: "Notre équipe est composée de radiologues expérimentés pour interpréter vos résultats avec exactitude.",
        radiologie_section3_titre: "Types d’examens",
        radiologie_section3_contenu: "Radiographies, IRM, échographies, scanner… nous couvrons une large gamme d’examens d’imagerie.",

        pharmacie: "Pharmacie",
        desc_pharmacie: "Notre pharmacie propose un large choix de produits et des conseils personnalisés.",
        pharmacie_produits: "Large choix de produits",
        pharmacie_produits_desc: "Notre pharmacie propose des médicaments sur ordonnance et en vente libre, adaptés à tous les besoins.",
        pharmacie_conseil: "Conseils personnalisés",
        pharmacie_conseil_desc: "Nos pharmaciens sont disponibles pour vous accompagner dans la prise de vos traitements.",
        pharmacie_horaires: "Horaires flexibles",
        pharmacie_horaires_desc: "La pharmacie est ouverte tous les jours, y compris les week-ends, pour mieux vous servir.",

        pneumologie: "Pneumologie",
        desc_pneumologie: "Soins spécialisés pour les maladies respiratoires.",
        pneumologie_examens: "Examens respiratoires complets",
        pneumologie_examens_desc: "Nous réalisons des spirométries, gaz du sang, tests d’effort et plus pour diagnostiquer les troubles pulmonaires.",
        pneumologie_soins: "Soins personnalisés",
        pneumologie_soins_desc: "Nos pneumologues élaborent des traitements adaptés à chaque patient, incluant asthme, BPCO, et infections pulmonaires.",
        pneumologie_suivi: "Suivi régulier",
        pneumologie_suivi_desc: "Un suivi continu est assuré pour évaluer l'efficacité du traitement et adapter les soins si nécessaire.",


        cardiologie: "Cardiologie",
        desc_cardiologie: "Diagnostic et traitement des maladies du cœur.",
        cardio_diagnostic: "Diagnostic cardiaque complet",
        cardio_diagnostic_desc: "Électrocardiogrammes, échocardiographies, et tests d’effort pour détecter les maladies cardiaques.",
        cardio_traitement: "Traitement personnalisé",
        cardio_traitement_desc: "Nos cardiologues élaborent des traitements adaptés à chaque pathologie, incluant hypertension, insuffisance cardiaque, etc.",
        cardio_suivi: "Suivi à long terme",
        cardio_suivi_desc: "Un suivi régulier est assuré pour prévenir les complications et améliorer la qualité de vie des patients.",

        pediatrie: "Pédiatrie",
        desc_pediatrie: "Soins médicaux adaptés aux enfants de tout âge.",
        pediatrie_soins: "Soins pédiatriques de qualité",
        pediatrie_soins_desc: "Nous assurons un suivi médical régulier des enfants de la naissance à l’adolescence.",
        pediatrie_accompagnement: "Accompagnement des parents",
        pediatrie_accompagnement_desc: "Nos équipes informent et conseillent les parents à chaque étape du développement de leur enfant.",
        pediatrie_vaccins: "Vaccinations et bilans",
        pediatrie_vaccins_desc: "Nous assurons les vaccinations obligatoires et proposons des bilans de santé réguliers.",

        contact: "Contact",
        contact_intro: "N'hésitez pas à nous contacter pour toute question ou demande.",
        contact_phone: "Téléphone",
        contact_email: "Courriel",
        contact_address: "Adresse",
        contact_form_title: "Formulaire de contact",
        contact_name: "Votre nom",
        contact_message: "Votre message",
        contact_send: "Envoyer",
        contact_success: "Votre message a été envoyé avec succès !",
        contact_error: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer plus tard.",
        contact_phone1: "Numéro de téléphone",
        contact_sent: "Message déjà envoyé",

        rendezvous: "📅 Rendez-vous",
        rendezvous_intro: "Réservez votre consultation facilement.",
        rendezvous_service: "Sélectionnez un service",
        rendezvous_envoyer: "Envoyer",
        rendezvous_success: "✅ Votre rendez-vous a été envoyé avec succès.",
        rendezvous_error: "❌ Une erreur est survenue. Veuillez réessayer.",
        veuillez_connecter: "Veuillez vous connecter pour prendre un rendez-vous.",
        rendezvous_creneau_occupe: "Ce créneau est déjà réservé.",
        rendezvous_deja_patient: "Vous avez déjà un rendez-vous à cette heure.",
        contact_name1: "Nom",
        contact_email1: "Email",
        contact_phone2: "Téléphone",
        contact_message1: "Message",
        
        connexion: "Connexion",
        titre_bienvenue: "Bienvenue sur Clinique+",
        connexion_title: "Connexion à votre compte",
        connexion_email: "Adresse e-mail",
        connexion_password: "Mot de passe",
        connexion_button: "Se connecter",
        connexion_no_account: "Vous n’avez pas encore de compte ?",
        connexion_register_link: "S'inscrire",
        connexion_forgot_password: "Mot de passe oublié ?",
        connexion_error: "Email ou mot de passe incorrect.",
        connexion_server_error: "Erreur du serveur. Veuillez réessayer.",


        register_title: "Inscription",
        register_name: "Nom complet",
        register_email: "Adresse e-mail",
        register_password: "Mot de passe",
        register_confirm_password: "Confirmez le mot de passe",
        register_button: "S'inscrire",
        register_role_patient: "Patient",
        register_role_medecin: "Médecin",
        /*register_success: "Inscription réussie !",
        register_error_generic: "Une erreur est survenue lors de l'inscription.",*/
        //register_password_mismatch: "Les mots de passe ne correspondent pas.",
        register_success : "Inscription réussie ! Redirection en cours...",
        register_error_generic: "Une erreur est survenue. Veuillez réessayer.",
        register_error_password_length: "Le mot de passe doit contenir au moins 6 caractères.",
        register_password_mismatch: "Les mots de passe ne correspondent pas.",
        register_error_email_exists: "Cette adresse e-mail est déjà utilisée.",
        register_already_account: "Vous avez déjà un compte ?",
        register_login_link: "Se connecter",
        register_specialite: "Spécialité",
        register_telephone: "Téléphone",
        register_disponibilites: "Disponibilités (ex: Lundi:09:00,10:00)",
        register_disponibilites_format: "Entrez chaque jour sur une ligne. Exemple : Mardi:10:00,14:00",
        register_error_disponibilites_required: "Les disponibilités sont obligatoires pour un médecin.",
        register_role: "Rôle",

        texte_intro: "Cette plateforme vous permet de prendre des rendez-vous médicaux en ligne.",
        ostheo: "Consultation Ostéopathie",
        medecin: "Médecin ",
        jours: "Lundis, Mardis & Mercredis",
        horaires: "9h - 18h",
        changer_theme: "Changer le thème",
        btn_rdv: "Prendre rendez-vous",


         banniere1_titre: "Bienvenue à la Clinique Plus",
          banniere1_sous_titre: "Santé, excellence et bien-être au cœur de notre mission",
          banniere2_titre: "Technologie de pointe",
          banniere2_sous_titre: "Nous utilisons des équipements modernes pour votre santé",
          banniere3_titre: "Une équipe expérimentée",
          banniere3_sous_titre: "Des professionnels engagés à votre écoute",
          btn_rdv2: "Prendre rendez-vous",

          a_propos_titre: "À Propos",
          a_propos_texte1: "La Clinique Plus est un pôle d’excellence, un espace de bien-être pour les patients, un cadre d’épanouissement et de réalisation de soi pour le personnel.",
          a_propos_texte2: "Elle réserve un accueil chaleureux et réconfortant à tous ses patients. Sa politique d’innovation et de veille technologique transforme les menaces en opportunités de développement durable dans le respect du droit des patients et de l’éthique.",

          nos_services: "Nos Services",
          laboratoire2: "Laboratoire",
          urgences2: "Urgences",
          radiologie2: "Radiologie",
          pharmacie2: "Pharmacie",

          temoignages: "Témoignages",
          temoin1_nom: "Momo Adetor",
          temoin1_role: "Patient régulier",
          temoin1_texte: "Grâce à la Clinique Plus, j’ai reçu des soins rapides et efficaces. Toute l’équipe a été formidable du début à la fin. L’organisation est fluide, les médecins sont à l’écoute, et je n’ai jamais attendu plus de 10 minutes. Je me sens en confiance à chaque visite.",
          temoin2_nom: "Jacqueline Mensah",
          temoin2_role: "Maman accompagnante",
          temoin2_texte: "L’accueil chaleureux, la propreté des lieux et le professionnalisme du personnel m’ont beaucoup rassurée pour mon fils. Chaque étape de la consultation a été bien expliquée. Les infirmiers ont fait preuve de beaucoup d’humanité. C’est une clinique qui place vraiment les patients au centre.",
          temoin3_nom: "Essia Koffi",
          temoin3_role: "Patient",
          temoin3_texte: "Je suis impressionné par la technologie de pointe utilisée ici. Les résultats ont été rapides et précis. L’environnement est moderne et apaisant. Je tiens à saluer la gentillesse de la réceptionniste et le professionnalisme du docteur qui m’a reçu. Bravo à toute l’équipe médicale, vous faites un travail remarquable.",

          actualites: "Actualités",
          actu1_titre: "Ouverture d’un nouveau centre de radiologie numérique",
          actu1_texte: "Notre clinique s’agrandit avec l’inauguration d’un centre de radiologie numérique de dernière génération. Cette technologie permettra un diagnostic plus rapide, une précision accrue, et un meilleur confort pour nos patients. Ce projet s’inscrit dans notre engagement à offrir des soins de qualité supérieure à la communauté.",
          actu2_titre: "Campagne de dépistage gratuit du diabète",
          actu2_texte: "À l’occasion de la Journée mondiale du diabète, nous organisons une campagne de dépistage gratuite. L’objectif est de sensibiliser la population sur les risques liés au diabète et d’encourager un suivi médical précoce. Tous les patients recevront des conseils personnalisés de nos spécialistes.",
          actu3_titre: "Formation continue pour notre personnel infirmier",
          actu3_texte: "Notre équipe infirmière a récemment suivi une formation continue sur les gestes d’urgence et la prise en charge des patients en situation critique. Ces formations garantissent une mise à jour constante des compétences pour assurer une prise en charge optimale et sécurisée.",


          dashboard_title: "Bienvenue sur le Tableau de Bord",
          dashboard_subtitle: "Accédez à vos fonctionnalités principales en un clic",

          dashboard_card_rdv_title: "Mes Rendez-vous",
          dashboard_card_rdv_text: "Voir et gérer vos rendez-vous",
          dashboard_card_rdv_btn: "Voir plus",

          dashboard_card_profile_title: "Mon Profil",
          dashboard_card_profile_text: "Modifier vos informations personnelles",
          dashboard_card_profile_btn: "Modifier",

          dashboard_card_settings_title: "Paramètres",
          dashboard_card_settings_text: "Gérez vos préférences",
          dashboard_card_settings_btn: "Configurer",
          
          
          dashboard_medecin_title: "Tableau de bord du médecin",
          dashboard_medecin_subtitle: "Gérez vos consultations, horaires et informations professionnelles.",
          medecin_card_rdv_title: "Mes Rendez-vous",
          medecin_card_rdv_text: "Consultez la liste de vos rendez-vous à venir.",
          medecin_card_rdv_btn: "Voir les rendez-vous",
          medecin_card_profile_title: "Profil professionnel",
          medecin_card_profile_text: "Modifiez vos informations de spécialité, disponibilités, etc.",
          medecin_card_profile_btn: "Modifier mon profil",
          medecin_card_calendar_title: "Calendrier de disponibilité",
          medecin_card_calendar_text: "Planifiez vos horaires de disponibilité.",
          medecin_card_calendar_btn: "Gérer le calendrier",
          medecin_card_stats_title: "Statistiques",
          medecin_card_stats_text: "Consultez vos statistiques de consultation.",
          medecin_card_stats_btn: "Voir les stats",
          medecin_card_settings_title: "Paramètres",
          medecin_card_settings_text: "Gérez vos préférences, langue, mot de passe, etc.",
          medecin_card_settings_btn: "Ouvrir les paramètres",

          mon_espace: "Mon espace",

          calendrier_medecin_title: "Calendrier de disponibilité",
          calendrier_medecin_subtitle: "Gérez vos créneaux disponibles pour les rendez-vous.",
          calendrier_medecin_placeholder: "Ici apparaîtra votre calendrier.",

          se_deconnecter: "Se déconnecter",

          statistiques_medecin_title: "Statistiques de consultation",
          statistiques_medecin_subtitle: "Vue d’ensemble de vos activités médicales.",
          stat_total_rdv: "Rendez-vous total",
          stat_rdv_mois: "Rendez-vous ce mois",
          stat_patients_uniques: "Patients uniques",

          medecin_parametres_title: "Paramètres du médecin",
          medecin_parametres_subtitle: "Gérez vos préférences de langue, thème, et mot de passe.",
          medecin_parametres_langue: "Choisissez votre langue",
          medecin_parametres_theme: "Choisissez un thème",
          medecin_parametres_password: "Mot de passe",
          changer_mot_de_passe: "Changer le mot de passe",
          theme_clair: "Clair",
          theme_sombre: "Sombre",
          theme_systeme: "Système",


          profil_medecin_title: "Profil professionnel",
          profil_specialite: "Spécialité",
          profil_telephone: "Téléphone",
          profil_disponibilites: "Disponibilités",
          profil_enregistrer: "Enregistrer les modifications",
          profil_update_success: "✅ Profil mis à jour avec succès",
          profil_update_error: "❌ Échec de la mise à jour du profil",


          mes_rendezvous_title: "Mes Rendez-vous",
          mes_rendezvous_aucun: "Aucun rendez-vous trouvé.",
          nom_medecin: "Nom du médecin",
          specialite: "Spécialité",
          date: "Date",
          heure: "Heure",
          statut: "Statut",
          programmé: "Programmé",
          mes_rendezvous  : "Mes rendez-vous",
          choisir_medecin: "Choisir un médecin",

          annuler: "Annuler",
          confirmer_annulation: "Voulez-vous vraiment annuler ce rendez-vous ?",
          modifier: "Modifier",
          annulé: "Annulé",

          modifier_rendezvous: "Modifier le rendez-vous",
          selectionner_medecin: "Sélectionnez un médecin",
          enregistrer_modifications: "Enregistrer les modifications",
          rendezvous_modifie: "Rendez-vous modifié avec succès",
          erreur_recuperation_rdv: "Erreur lors de la récupération du rendez-vous",
          motif: "Motif",

          register_role_admin: "Administrateur",

          admin_dashboard_title: "Tableau de bord administrateur",
          admin_loading: "Chargement en cours...",
          admin_users: "Utilisateurs",
          admin_medecins: "Médecins",
          admin_rendezvous: "Rendez-vous",
          admin_delete: "Supprimer",  

          register_code_admin: "Code de sécurité administrateur",
          register_code_admin_invalid: "Code administrateur invalide",
          admin_bienvenue: "Bienvenue",
          admin_edit: "Modifier",


          admin_dashboard_title1: "Tableau de bord de l’administrateur",
          admin_dashboard_subtitle: "Gérez les utilisateurs, médecins et rendez-vous",
          admin_users1: "Utilisateurs",
          admin_medecins1: "Médecins",
          admin_rendezvous1: "Rendez-vous",
          admin_loading1: "Chargement en cours...",
          admin_card_users_title: "Gestion des utilisateurs",
          admin_delete1: "Supprimer",
          admin_edit1: "Modifier",


          suppression_confirm_user: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
          suppression_confirm_medecin: "Êtes-vous sûr de vouloir supprimer ce médecin ?",
          suppression_user_success: "Utilisateur supprimé avec succès.",
          suppression_medecin_success: "Médecin supprimé avec succès.",
          suppression_error_user: "Erreur lors de la suppression de l'utilisateur :",
          suppression_error_medecin: "Erreur lors de la suppression du médecin :",


          register_name1: "Nom",
          register_email1: "Email",
          register_role1: "Rôle",
          register_telephone1: "Téléphone",
          register_specialite1: "Spécialité",
          role_patient: "Patient",
          role_medecin: "Médecin",
          role_admin: "Admin",
          enregistrer1: "Enregistrer",
          annuler1: "Annuler",
        update_success: "✅ Mise à jour réussie",
        update_error: "❌ Échec de la mise à jour",

        ajouter: "Ajouter",
        ajout_succes: "Ajout effectué avec succès",
        ajout_echec: "Échec de l'ajout",
        patient: "Patient",
        ajouter_rendezvous: "Ajouter un rendez-vous",
        ajouter_medecin: "Ajouter un médecin",
        ajouter_utilisateur: "Ajouter un utilisateur",

        admin_utilisateur: "utilisateur",
        admin_medecin: "médecin",

        rdv_update_success: "Rendez-vous modifié avec succès",
      rdv_update_error: "Erreur lors de la modification du rendez-vous",
      
        statut_programme: "Programmé",
        statut_annule: "Annulé", 
        statut_en_attente: "En attente",
        statut1: "Statut",
        programmé1: "Programmé",
        statut_confirme: "Confirmé",
        statut_programmé: "Programmé",
        statut_annulé: "Annulé",
        statut_en_attente1: "En attente",

        rdv_update_success1: "Rendez-vous mis à jour avec succès",
        rdv_update_error1: "Erreur lors de la mise à jour du rendez-vous",

        annulation_rdv_success: "Rendez-vous annulé avec succès",
        annulation_rdv_error: "Erreur lors de l'annulation du rendez-vous",
        annulation_confirm_rdv: "Êtes-vous sûr de vouloir annuler ce rendez-vous ?",
        suppression_error_rdv: "Erreur lors de la suppression du rendez-vous :",

        suppression_rdv_success: "Rendez-vous supprimé avec succès.",
        suppression_error_rdv1: "Erreur lors de la suppression du rendez-vous :",
        suppression_confirm_rdv: "Êtes-vous sûr de vouloir supprimer ce rendez-vous ?",

        enregistrer: "Enregistrer",


       conflit_rendezvous: "Un rendez-vous existe déjà à cette date et heure.",
        erreur_modification: "Erreur lors de la modification.",

          
      exporter_pdf: "Exporter en PDF",
        filtrer_a_venir: "Filtrer les rendez-vous à venir",
        modification_succes: "Modification réussie",

        annulation_succes: "Le rendez-vous a été annulé avec succès.",
        erreur_annulation: "Une erreur est survenue lors de l'annulation.",

        mdp_oublie: {
        titre: "Mot de passe oublié",
        label: "Adresse e-mail",
        placeholder: "Entrez votre email",
        bouton: "Envoyer le lien",
        email_envoye: "Un lien de réinitialisation vous a été envoyé par email.",
        erreur: "Une erreur est survenue. Veuillez réessayer.",
      },


      reset: {
        titre: "Réinitialiser le mot de passe",
        nouveau: "Nouveau mot de passe",
        confirm: "Confirmer le mot de passe",
        bouton: "Réinitialiser",
        succes: "Mot de passe réinitialisé avec succès. Redirection...",
        erreur: "Erreur lors de la réinitialisation.",
        erreur_confirmation: "Les mots de passe ne correspondent pas."
      },

      chat: {
        titre: "Chatbot médical IA",
        placeholder: "Posez votre question de santé ici...",
        envoyer: "Envoyer",
        chargement: "Chargement...",
        reponse: "Réponse de l'IA",
        erreur: "Erreur lors de la communication avec l'IA."
      },

      chatbienvenue: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
      themeclair: "Clair",
      themesombre: "Sombre",
      themesysteme: "Système",







        }

  },
  en: {
    translation: {
      accueil: "Home",
        services: "Services",
        specialites: "Specialties",
        laboratoire: "Laboratories",
        laboratoire_titre: "Medical Analysis Laboratory",
        laboratoire_sous_titre: "Reliable services for your biological tests",
        laboratoire_section1_titre: "Modern Equipment",
        laboratoire_section1_contenu: "Our laboratory is equipped with state-of-the-art technology for fast, reliable, and secure analyses.",
        laboratoire_section2_titre: "Qualified Team",
        laboratoire_section2_contenu: "Our biologists and technicians are highly qualified to ensure accurate results and personalized support.",
        laboratoire_section3_titre: "Available Tests",
        laboratoire_section3_contenu: "We offer a wide range of tests: blood, urine, hormonal, serological, and more.",
        desc_laboratoire: "Our labs are equipped to deliver quick and reliable test results.",

        urgences: "Emergency",
        desc_urgences: "24/7 emergency services to handle all critical situations.",
        urgence_rapide_titre: "Rapid Response",
        urgence_rapide_texte: "Our emergency teams are ready to intervene immediately for any medical emergency.",
        urgence_equipe_titre: "Experienced Doctors",
        urgence_equipe_texte: "Our staff includes emergency physicians, nurses, and specialists trained for critical care.",
        urgence_localisation_titre: "Easy Access",
        urgence_localisation_texte: "Our emergency department is located on the ground floor with 24/7 direct access.",

        
        radiologie: "Radiology",
        desc_radiologie: "Modern imaging technology for precise diagnosis.",
        radiologie_section1_titre: "Advanced Technology",
        radiologie_section1_contenu: "Our radiology department uses state-of-the-art imaging equipment for accurate diagnostics.",
        radiologie_section2_titre: "Imaging Specialists",
        radiologie_section2_contenu: "Our team includes experienced radiologists to provide precise interpretation of your results.",
        radiologie_section3_titre: "Types of Exams",
        radiologie_section3_contenu: "X-rays, MRIs, ultrasounds, CT scans... we cover a wide range of imaging exams.",

        pharmacie: "Pharmacy",
        desc_pharmacie: "Our pharmacy offers a wide range of products and personalized advice.",
        pharmacie_produits: "Wide range of products",
        pharmacie_produits_desc: "Our pharmacy offers prescription and over-the-counter medicines to meet every need.",
        pharmacie_conseil: "Personalized advice",
        pharmacie_conseil_desc: "Our pharmacists are available to assist you with your treatments.",
        pharmacie_horaires: "Flexible hours",
        pharmacie_horaires_desc: "The pharmacy is open daily, including weekends, to better serve you.",

        pneumologie: "Pulmonology",
        desc_pneumologie: "Specialized care for respiratory illnesses.",
        pneumologie_examens: "Comprehensive respiratory tests",
        pneumologie_examens_desc: "We offer spirometry, blood gas analysis, stress tests and more to diagnose lung conditions.",
        pneumologie_soins: "Personalized care",
        pneumologie_soins_desc: "Our pulmonologists provide tailored treatments for asthma, COPD, and lung infections.",
        pneumologie_suivi: "Ongoing monitoring",
        pneumologie_suivi_desc: "We ensure continuous follow-up to evaluate treatment effectiveness and adjust as needed.",

        cardiologie: "Cardiology",
        desc_cardiologie: "Diagnosis and treatment of heart diseases.",
        cardio_diagnostic: "Comprehensive heart diagnostics",
        cardio_diagnostic_desc: "ECGs, echocardiograms, and stress tests to detect heart conditions.",
        cardio_traitement: "Personalized treatment",
        cardio_traitement_desc: "Our cardiologists provide tailored treatments for hypertension, heart failure, and more.",
        cardio_suivi: "Long-term monitoring",
        cardio_suivi_desc: "We ensure regular follow-up to prevent complications and improve patients’ quality of life.",

        
        pediatrie: "Pediatrics",
        desc_pediatrie: "Medical care tailored for children of all ages.",
        pediatrie_soins: "High-quality pediatric care",
        pediatrie_soins_desc: "We provide regular medical check-ups for children from birth to adolescence.",
        pediatrie_accompagnement: "Support for parents",
        pediatrie_accompagnement_desc: "Our team offers guidance and information for parents throughout their child’s development.",
        pediatrie_vaccins: "Vaccines and health checks",
        pediatrie_vaccins_desc: "We provide mandatory vaccines and regular health assessments for children.",


        contact: "Contact",
        contact_intro: "Feel free to reach out with any questions or inquiries.",
        contact_phone: "Phone",
        contact_email: "Email",
        contact_address: "Address",
        contact_form_title: "Contact Form",
        contact_name: "Your name",
        contact_message: "Your message",
        contact_send: "Send",
        contact_success: "Your message has been sent successfully!",
        contact_error: "There was an error sending your message. Please try again later.",
        contact_phone1: "Phone number",
        contact_sent: "Message already sent",

        rendezvous: "📅 Book Now",
        rendezvous_intro: "Easily book your consultation.",
        rendezvous_service: "Select a service",
        rendezvous_envoyer: "Send",
        rendezvous_success: "✅ Your appointment has been successfully sent.",
        rendezvous_error: "❌ An error occurred. Please try again.",
        contact_name1: "Name",
        contact_email1: "Email",
        contact_phone2: "Phone",
        contact_message1: "Message",
        veuillez_connecter: "Please log in to book an appointment.",
        rendezvous_creneau_occupe: "This time slot is already taken.",
        rendezvous_deja_patient: "You already have an appointment at this time.",
      

        connexion: "Login",
        titre_bienvenue: "Welcome to Clinique+",
        connexion_title: "Login to your account",
        connexion_email: "Email address",
        connexion_password: "Password",
        connexion_button: "Log in",
        connexion_no_account: "Don't have an account yet?",
        connexion_register_link: "Sign up",
        connexion_forgot_password: "Forgot password?",
        connexion_error: "Incorrect email or password.",
        connexion_server_error: "Server error. Please try again.",

        
        register_title: "Register",
        register_name: "Full Name",
        register_email: "Email",
        register_password: "Password",
        register_confirm_password: "Confirm Password",
        register_button: "Sign Up",
        register_role_patient: "Patient",
        register_role_medecin: "Doctor",
        /*register_success: "Registration successful!",
        register_error_generic: "An error occurred during registration.",
        register_password_mismatch: "Passwords do not match."*/
        register_success: "Registration successful! Redirecting...",
        register_error_generic: "An error occurred. Please try again.",
        register_error_password_length: "Password must be at least 6 characters.",
        register_password_mismatch: "Passwords do not match.",
        register_error_email_exists: "This email is already in use.",
        register_already_account: "Already have an account?",
        register_login_link: "Login",
        register_specialite: "Specialty",
        register_telephone: "Phone number",
        register_disponibilites: "Availability (e.g. Monday:09:00,10:00)",
        register_disponibilites_format: "Enter each day on a new line. Example: Tuesday:10:00,14:00",
        register_error_disponibilites_required: "Availability is required for doctors.",
        register_role: "Role",



        texte_intro: "This platform allows you to book medical appointments online.",
        ostheo: "Osteopathy Consultation",
        medecin: "Doctor",
        jours: "Mondays, Tuesdays & Wednesdays",
        horaires: "9am - 6pm",
        changer_theme: "Toggle Theme",
        btn_rdv: "Book Appointment",



        banniere1_titre: "Welcome to Clinique Plus",
      banniere1_sous_titre: "Health, excellence, and well-being at the heart of our mission",
      banniere2_titre: "Cutting-edge technology",
      banniere2_sous_titre: "We use modern equipment for your health",
      banniere3_titre: "An experienced team",
      banniere3_sous_titre: "Dedicated professionals at your service",
      btn_rdv2: "Book an appointment",

      a_propos_titre: "About Us",
      a_propos_texte1: "Clinique Plus is a center of excellence, a place of well-being for patients, and a space for personal and professional fulfillment.",
      a_propos_texte2: "We offer a warm and comforting welcome to all our patients. Our innovation and technological watch policy turns threats into sustainable development opportunities, respecting patient rights and ethics.",

      nos_services: "Our Services",
      laboratoire2: "Laboratory",
      urgences2: "Emergency",
      radiologie2: "Radiology",
      pharmacie2: "Pharmacy",

      temoignages: "Testimonials",
      temoin1_nom: "Momo Adetor",
      temoin1_role: "Regular Patient",
      temoin1_texte: "Thanks to Clinique Plus, I received fast and efficient care. The whole team was great from start to finish. The organization is smooth, the doctors are attentive, and I never waited more than 10 minutes. I feel confident every time I visit.",
      temoin2_nom: "Jacqueline Mensah",
      temoin2_role: "Mother",
      temoin2_texte: "The warm welcome, cleanliness, and professionalism of the staff reassured me for my son. Each step of the consultation was clearly explained. The nurses were very compassionate. This clinic truly puts patients first.",
      temoin3_nom: "Essia Koffi",
      temoin3_role: "Patient",
      temoin3_texte: "I’m impressed by the cutting-edge technology used here. The results were fast and accurate. The environment is modern and soothing. I commend the receptionist’s kindness and the doctor’s professionalism. Well done to the whole team — you’re doing a remarkable job.",

      actualites: "News",
      actu1_titre: "Opening of a new digital radiology center",
      actu1_texte: "Our clinic is expanding with the launch of a state-of-the-art digital radiology center. This technology allows for faster diagnosis, improved accuracy, and better comfort for patients. This project aligns with our commitment to providing superior care to the community.",
      actu2_titre: "Free diabetes screening campaign",
      actu2_texte: "To mark World Diabetes Day, we are organizing a free screening campaign. The goal is to raise awareness about diabetes risks and encourage early medical monitoring. All participants will receive personalized advice from our specialists.",
      actu3_titre: "Ongoing training for our nursing staff",
      actu3_texte: "Our nursing team recently received continuing education on emergency procedures and critical care management. These trainings ensure up-to-date skills for optimal and safe patient care.",


      dashboard_title: "Welcome to the Dashboard",
      dashboard_subtitle: "Access your main features in one click",

      dashboard_card_rdv_title: "My Appointments",
      dashboard_card_rdv_text: "View and manage your appointments",
      dashboard_card_rdv_btn: "See more",

      dashboard_card_profile_title: "My Profile",
      dashboard_card_profile_text: "Edit your personal information",
      dashboard_card_profile_btn: "Edit",

      dashboard_card_settings_title: "Settings",
      dashboard_card_settings_text: "Manage your preferences",
      dashboard_card_settings_btn: "Configure",


      dashboard_medecin_title: "Doctor's Dashboard",
      dashboard_medecin_subtitle: "Manage your consultations, availability and professional information.",
      medecin_card_rdv_title: "My Appointments",
      medecin_card_rdv_text: "View your upcoming consultations.",
      medecin_card_rdv_btn: "View Appointments",
      medecin_card_profile_title: "Professional Profile",
      medecin_card_profile_text: "Edit your specialty, availability, etc.",
      medecin_card_profile_btn: "Edit Profile",
      medecin_card_calendar_title: "Availability Calendar",
      medecin_card_calendar_text: "Manage your working hours and availability.",
      medecin_card_calendar_btn: "Manage Calendar",
      medecin_card_stats_title: "Statistics",
      medecin_card_stats_text: "View your consultation statistics.",
      medecin_card_stats_btn: "View Stats",
      medecin_card_settings_title: "Settings",
      medecin_card_settings_text: "Manage your preferences, language, password, etc.",
      medecin_card_settings_btn: "Open Settings",

      mon_espace: "My dashboard",
      
      se_deconnecter: "Log out",

      calendrier_medecin_title: "Availability Calendar",
      calendrier_medecin_subtitle: "Manage your available slots for appointments.",
      calendrier_medecin_placeholder: "Your calendar will appear here.",

      statistiques_medecin_title: "Consultation Statistics",
      statistiques_medecin_subtitle: "Overview of your medical activity.",
      stat_total_rdv: "Total Appointments",
      stat_rdv_mois: "Appointments This Month",
      stat_patients_uniques: "Unique Patients",

      medecin_parametres_title: "Doctor Settings",
      medecin_parametres_subtitle: "Manage your language, theme, and password preferences.",
      medecin_parametres_langue: "Choose your language",
      medecin_parametres_theme: "Choose a theme",
      medecin_parametres_password: "Password",
      changer_mot_de_passe: "Change Password",
      theme_clair: "Light",
      theme_sombre: "Dark",
      theme_systeme: "System",

      profil_medecin_title: "Professional Profile",
      profil_specialite: "Specialty",
      profil_telephone: "Phone",
      profil_disponibilites: "Availability",
      profil_enregistrer: "Save changes",
      profil_update_success: "✅ Profile updated successfully",
      profil_update_error: "❌ Failed to update profile",

      mes_rendezvous_title: "My Appointments",
      mes_rendezvous_aucun: "No appointments found.",
      nom_medecin: "Doctor's name",
      specialite: "Specialty",
      date: "Date",
      heure: "Time",
      statut: "Status",
      programmé: "Scheduled",
      mes_rendezvous: "My Appointments",
      choisir_medecin: "Choose a doctor",

      annuler: "Cancel",
      confirmer_annulation: "Are you sure you want to cancel this appointment?",
      modifier: "Edit",
      annulé: "Cancelled",

      modifier_rendezvous: "Edit appointment",
      selectionner_medecin: "Select a doctor",
      enregistrer_modifications: "Save changes",
      rendezvous_modifie: "Appointment successfully updated",
      erreur_recuperation_rdv: "Error while retrieving appointment",
      motif: "Reason",

      register_role_admin: "Administrator",

      admin_dashboard_title: "Administrator Dashboard",
      admin_loading: "Loading...",
      admin_users: "Users",
      admin_medecins: "Doctors",
      admin_rendezvous: "Appointments",
      admin_delete: "Delete",

      register_code_admin: "Code de sécurité administrateur",
      register_code_admin_invalid: "Code administrateur invalide",
      
      admin_bienvenue: "Welcome",
      admin_edit: "Edit",
      admin_dashboard_subtitle : "Manage users, doctors, and appointments",

      suppression_confirm_user: "Are you sure you want to delete this user?",
      suppression_confirm_medecin: "Are you sure you want to delete this doctor?",
      suppression_user_success: "User deleted successfully.",
      suppression_medecin_success: "Doctor deleted successfully.",
      suppression_error_user: "Error deleting user:",
      suppression_error_medecin: "Error deleting doctor:",

      register_name1: "Name",
      register_email1: "Email",
      register_role1: "Role",
      register_telephone1: "Phone",
      register_specialite1: "Specialty",
      role_patient: "Patient",
      role_medecin: "Doctor",
      role_admin: "Admin",
      enregistrer1: "Save",
      annuler1: "Cancel",
      update_sucess: "✅ Update successful",
      update_error: "❌ Update failed",
      update_success: "✅ Update successful",

      ajouter: "Add",
      ajout_succes: "Successfully added",
      ajout_echec: "Failed to add",
      patient: "Patient",

      ajouter_rendezvous: "Add Appointment",
      ajouter_medecin: "Add Doctor",
      ajouter_utilisateur: "Add User",

      admin_utilisateur: "user",
      admin_medecin: "doctor",

      rdv_update_success: "Appointment updated successfully",
      rdv_update_error: "Error updating appointment",

      statut_programme: "Scheduled",
      statut_annule: "Cancelled",
      statut_en_attente: "Pending",

      statut1: "Status",
      programmé1: "Scheduled",

      statut_confirme: "Confirmed",

      statut_programmé: "Scheduled",
      statut_annulé: "Cancelled",
      statut_en_attente1: "Pending",
      rdv_update_success1: "Appointment updated successfully",
      rdv_update_error1: "Error updating appointment",

      annulation_rdv_success: "Appointment cancelled successfully",
      annulation_rdv_error: "Error cancelling appointment",
      annulation_confirm_rdv: "Are you sure you want to cancel this appointment?",

       suppression_error_rdv: "Error deleting appointment:",
        suppression_rdv_success: "Appointment deleted successfully.",
        suppression_error_rdv1: "Error deleting appointment:",

        suppression_confirm_rdv: "Are you sure you want to delete this appointment?",

        enregistrer: "Save",

        

        conflit_rendezvous: "An appointment already exists at this date and time.",
        erreur_modification: "Error during modification.",

        exporter_pdf: "Export as PDF",

        filtrer_a_venir: "Filter upcoming appointments",

        modification_succes: "Modification successful",
        annulation_succes: "The appointment was successfully cancelled.",
        erreur_annulation: "Error cancelling appointment.",

        mdp_oublie: {
        titre: "Forgot Password",
        label: "Email Address",
        placeholder: "Enter your email",
        bouton: "Send Link",
        email_envoye: "A reset link has been sent to your email.",
        erreur: "An error occurred. Please try again."
      },


      reset: {
        titre: "Reset Password",
        nouveau: "New Password",
        confirm: "Confirm Password",
        bouton: "Reset",
        succes: "Password reset successfully. Redirecting...",
        erreur: "Error resetting password.",
        erreur_confirmation: "Passwords do not match."
      },

      chat: {
        titre: "Medical AI Chatbot",
        placeholder: "Ask your health question here...",
        envoyer: "Send",
        chargement: "Loading...",
        reponse: "AI Response",
        erreur: "Error while contacting AI."
      },

      chatbienvenue: "Hello! I am your AI assistant. How can I help you today?",
      themeclair: "Light",
      themesombre: "Dark",
      themesysteme: "System Default",




      

      



          
      }
    }
  }
});

export default i18n;
