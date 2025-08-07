
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './DashboardAdmin.css';
export default function DashboardAdmin() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [rendezvous, setRendezvous] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [rdvModalOpen, setRdvModalOpen] = useState(false);
  const [currentEditRdv, setCurrentEditRdv] = useState(null);
  const [addModalType, setAddModalType] = useState(null);
  const [newData, setNewData] = useState({});
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  // Gestion des utilisateurs et médecins
  const handleEditClick = (user) => {
    if (user.role === 'medecin') {
      setCurrentEditUser({ ...user, name: user.nom || user.name });
    } else {
      setCurrentEditUser(user);
    }
    setModalOpen(true);
  };
  const handleAdd = (type) => {
    setAddModalType(type);
    setNewData({});
  };
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditUser((prev) => ({ ...prev, [name]: value }));
  };
  // Gestion des rendez-vous
  const handleEditRdvClick = (rdv) => {
    setCurrentEditRdv({
      ...rdv,
      date: rdv.date?.split('T')[0] || '',
      patientId: rdv.patient?._id || rdv.patient,
      medecinId: rdv.medecin?._id || rdv.medecin,
    });
    setRdvModalOpen(true);
  };
  const handleRdvChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditRdv((prev) => ({ ...prev, [name]: value }));
  };
  // Actions CRUD
  const handleAddSubmit = async () => {
    try {
      let endpoint = '';
      let body = {};
      switch (addModalType) {
        case 'utilisateur':
          endpoint = 'http://localhost:5000/api/admin/utilisateur';
          body = {
            name: newData.name,
            email: newData.email,
            password: newData.password,
            role: newData.role || 'patient'
          };
          break;
        case 'medecin':
          endpoint = 'http://localhost:5000/api/admin/medecin';
          body = {
            nom: newData.nom,
            email: newData.email,
            password: newData.password,
            telephone: newData.telephone,
            specialite: newData.specialite
          };
          break;
        case 'rendezvous':
          endpoint = 'http://localhost:5000/api/rendezvous';
          body = {
            date: newData.date,
            heure: newData.heure,
            patient: newData.patient,
            medecin: newData.medecin,
            motif: newData.motif
          };
          break;
        default:
          throw new Error('Type invalide');
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de l\'ajout');
      switch (addModalType) {
        case 'utilisateur':
          setUsers((prev) => [...prev, data]);
          break;
        case 'medecin':
          setMedecins((prev) => [...prev, data]);
          break;
        case 'rendezvous':
          setRendezvous((prev) => [...prev, data]);
          break;
          default:
          break;
      }
      alert(t('ajout_succes'));
      setAddModalType(null);
    } catch (err) {
      alert(t('ajout_echec') + ' ' + err.message);
    }
  };
  const handleUpdate = async () => {
    const isMedecin = currentEditUser?.role === 'medecin';
    const endpoint = isMedecin
      ? `http://localhost:5000/api/admin/medecin/${currentEditUser._id}`
      : `http://localhost:5000/api/admin/utilisateur/${currentEditUser._id}`;
    const payload = isMedecin
      ? {
          nom: currentEditUser.name,
          email: currentEditUser.email,
          telephone: currentEditUser.telephone,
          specialite: currentEditUser.specialite,
        }
      : {
          name: currentEditUser.name,
          email: currentEditUser.email,
        };
    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de la mise à jour');
      if (isMedecin) {
        setMedecins((prev) => prev.map((m) => (m._id === data._id ? data : m)));
      } else {
        setUsers((prev) => prev.map((u) => (u._id === data._id ? data : u)));
      }
      alert(t('update_success'));
      setModalOpen(false);
    } catch (err) {
      alert(t('update_error') + err.message);
    }
  };
  const handleUpdateRdv = async () => {
    try {
      const payload = {
        date: currentEditRdv.date,
        heure: currentEditRdv.heure,
        patient: currentEditRdv.patientId,
        medecin: currentEditRdv.medecinId,
        motif: currentEditRdv.motif,
        statut: currentEditRdv.statut || 'programmé'
      };
      const res = await fetch(`http://localhost:5000/api/admin/rendezvous/${currentEditRdv._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Erreur lors de la mise à jour');
      }
      const data = await res.json();
      setRendezvous((prev) => prev.map((r) => (r._id === currentEditRdv._id ? data.rendezVous : r)));
      alert(t('rdv_update_success'));
      setRdvModalOpen(false);
    } catch (err) {
      alert(t('rdv_update_error') + ': ' + err.message);
    }
  };
  // Suppressions
  const supprimerUtilisateur = async (id) => {
    if (!window.confirm(t('suppression_confirm_user'))) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/utilisateur/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Échec');
      setUsers((prev) => prev.filter((user) => user._id !== id));
      alert(t('suppression_user_success'));
    } catch (err) {
      alert(`${t('suppression_error_user')} ${err.message}`);
    }
  };
  const supprimerMedecin = async (id) => {
    if (!window.confirm(t('suppression_confirm_medecin'))) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/medecin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Échec');
      setMedecins((prev) => prev.filter((m) => m._id !== id));
      alert(t('suppression_medecin_success'));
    } catch (err) {
      alert(`${t('suppression_error_medecin')} ${err.message}`);
    }
  };
  const supprimerRendezVous = async (id) => {
    if (!window.confirm(t('suppression_confirm_rdv'))) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/rendezvous/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Échec de la suppression');
      setRendezvous(prev => prev.filter(rdv => rdv._id !== id));
      alert(t('suppression_rdv_success'));
    } catch (err) {
      alert(t('suppression_error_rdv') + err.message);
    }
  };
  const annulerRendezVous = async (id) => {
    if (!window.confirm(t('annulation_confirm_rdv'))) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/rendezvous/${id}/annuler`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statut: 'annule' }),
      });
      if (!res.ok) throw new Error('Échec de l\'annulation');
      setRendezvous(prev => prev.map(rdv => 
        rdv._id === id ? { ...rdv, statut: 'annule' } : rdv
      ));
      alert(t('annulation_rdv_success'));
    } catch (err) {
      alert(t('annulation_error_rdv') + err.message);
    }
  };
  // Chargement initial des données
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, medecinsRes, rdvRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/utilisateurs', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:5000/api/admin/medecins', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('http://localhost:5000/api/admin/rendezvous', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setUsers(await usersRes.json());
      setMedecins(await medecinsRes.json());
      setRendezvous(await rdvRes.json());
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // Helpers
  const getStatutStyle = (statut) => {
    switch (statut) {
      case 'annule': return { color: '#dc3545', fontWeight: 'bold' };
      case 'confirme': return { color: '#28a745', fontWeight: 'bold' };
      case 'en_attente': return { color: '#ffc107', fontWeight: 'bold' };
      default: return { color: '#6c757d' };
    }
  };
  // Rendu des modales
 

const renderAddModal = () => {
  if (!addModalType) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{t('ajouter')} {t('admin_' + addModalType)}</h2>
        {addModalType === 'utilisateur' && (
          <>
            <label>{t('register_name')}</label>
            <input name="name" onChange={handleAddChange} />
            <label>{t('register_email')}</label>
            <input name="email" type="email" onChange={handleAddChange} />
            <label>{t('register_password')}</label>
            <input name="password" type="password" onChange={handleAddChange} />
            <label>{t('register_role')}</label>
            <select name="role" onChange={handleAddChange}>
              <option value="patient">{t('role_patient')}</option>
              <option value="admin">{t('role_admin')}</option>
            </select>
          </>
        )}
        {addModalType === 'medecin' && (
          <>
            <label>{t('register_name')}</label>
            <input name="nom" onChange={handleAddChange} />
            <label>{t('register_email')}</label>
            <input name="email" type="email" onChange={handleAddChange} />
            <label>{t('register_password')}</label>
            <input name="password" type="password" onChange={handleAddChange} />
            <label>{t('register_telephone')}</label>
            <input name="telephone" onChange={handleAddChange} />
            <label>{t('register_specialite')}</label>
            <input name="specialite" onChange={handleAddChange} />
          </>
        )}
        {addModalType === 'rendezvous' && (
          <>
            <label>{t('date')}</label>
            <input name="date" type="date" onChange={handleAddChange} />
            <label>{t('heure')}</label>
            <input name="heure" type="time" onChange={handleAddChange} />
            <label>{t('patient')}</label>
            <select name="patient" onChange={handleAddChange}>
              <option value="">{t('selectionner_patient')}</option>
              {users.filter(u => u.role === 'patient').map(patient => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
            <label>{t('medecin')}</label>
            <select name="medecin" onChange={handleAddChange}>
              <option value="">{t('selectionner_medecin')}</option>
              {medecins.map(medecin => (
                <option key={medecin._id} value={medecin._id}>
                  Dr. {medecin.nom} - {medecin.specialite}
                </option>
              ))}
            </select>
            <label>{t('motif')}</label>
            <input name="motif" onChange={handleAddChange} />
          </>
        )}
        <div className="modal-actions">
          <button onClick={handleAddSubmit}>{t('enregistrer')}</button>
          <button onClick={() => setAddModalType(null)}>{t('annuler')}</button>
        </div>
      </div>
    </div>
  );
};
  const renderEditModal = () => {
    if (!modalOpen || !currentEditUser) return null;
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>{t('modifier')} {currentEditUser.name}</h2>
          
          <label>{t('register_name')}</label>
          <input
            type="text"
            name="name"
            value={currentEditUser.name || ''}
            onChange={handleChange}
          />
          <label>{t('register_email')}</label>
          <input
            type="email"
            name="email"
            value={currentEditUser.email || ''}
            onChange={handleChange}
          />
          {currentEditUser.role === 'medecin' && (
            <>
              <label>{t('register_telephone')}</label>
              <input
                type="text"
                name="telephone"
                value={currentEditUser.telephone || ''}
                onChange={handleChange}
              />
              <label>{t('register_specialite')}</label>
              <input
                type="text"
                name="specialite"
                value={currentEditUser.specialite || ''}
                onChange={handleChange}
              />
            </>
          )}
          <div className="modal-actions">
            <button onClick={handleUpdate}>{t('enregistrer')}</button>
            <button onClick={() => setModalOpen(false)}>{t('annuler')}</button>
          </div>
        </div>
      </div>
    );
  };
  const renderRdvEditModal = () => {
    if (!rdvModalOpen || !currentEditRdv) return null;
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>{t('modifier_rdv')}</h2>
          
          <label>{t('date')}</label>
          <input 
            type="date" 
            name="date" 
            value={currentEditRdv.date || ''} 
            onChange={handleRdvChange} 
          />
          
          <label>{t('heure')}</label>
          <input 
            type="time" 
            name="heure" 
            value={currentEditRdv.heure || ''} 
            onChange={handleRdvChange} 
          />
          
          <label>{t('patient')}</label>
          <select 
            name="patientId" 
            value={currentEditRdv.patientId || ''} 
            onChange={handleRdvChange}
          >
            <option value="">{t('selectionner_patient')}</option>
            {users.filter(u => u.role === 'patient').map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
          
          <label>{t('medecin')}</label>
          <select 
            name="medecinId" 
            value={currentEditRdv.medecinId || ''} 
            onChange={handleRdvChange}
          >
            <option value="">{t('selectionner_medecin')}</option>
            {medecins.map(medecin => (
              <option key={medecin._id} value={medecin._id}>
                {medecin.nom} - {medecin.specialite}
              </option>
            ))}
          </select>
          
          <label>{t('motif')}</label>
          <textarea 
            name="motif" 
            value={currentEditRdv.motif || ''} 
            onChange={handleRdvChange}
            rows="3"
          />
          
          <label>{t('statut')}</label>
          <select 
            name="statut" 
            value={currentEditRdv.statut || 'confirme'} 
            onChange={handleRdvChange}
          >
            <option value="en_attente">{t('statut_en_attente')}</option>
            <option value="confirme">{t('statut_programme')}</option>
            <option value="annule">{t('statut_annule')}</option>
          </select>
          
          <div className="modal-actions">
            <button onClick={handleUpdateRdv}>{t('enregistrer')}</button>
            <button onClick={() => setRdvModalOpen(false)}>{t('annuler')}</button>
          </div>
        </div>
      </div>
    );
  };
  // Rendu principal
  return (
    <div className="admin-dashboard-container">
      <header className="welcome-title">
        <h1>{t('admin_dashboard_title')}, <span className="admin-name">{username}</span></h1>
      </header>
      <p className="subtitle">{t('admin_dashboard_subtitle')}</p>
      {loading ? (
        <p>{t('admin_loading')}</p>
      ) : (
        <div className="card-grid">
          <div className="admin-card">
            <h2>{t('admin_users')}</h2>
            <button className="ajouter-btn" onClick={() => handleAdd('utilisateur')}>
              {t('ajouter_utilisateur')}
            </button>
            {users.filter((u) => u.role !== 'medecin').map((user) => (
              <div className="admin-item" key={user._id}>
                <span>
                  <strong>{user.name}</strong> ({user.role}) - {user.email}
                </span>
                <div className="admin-actions">
                  <button className="edit-btn" onClick={() => handleEditClick(user)}>
                    {t('modifier')}
                  </button>
                  <button className="delete-btn" onClick={() => supprimerUtilisateur(user._id)}>
                    {t('admin_delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="admin-card">
            <h2>{t('admin_medecins')}</h2>
            <button className="ajouter-btn" onClick={() => handleAdd('medecin')}>
              {t('ajouter_medecin')}
            </button>
            {medecins.map((m) => (
              <div className="admin-item" key={m._id}>
                <span>
                  <strong>{m.nom}</strong> - {m.specialite}
                </span>
                <div className="admin-actions">
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEditClick({ ...m, name: m.nom, role: 'medecin' })}
                  >
                    {t('modifier')}
                  </button>
                  <button className="delete-btn" onClick={() => supprimerMedecin(m._id)}>
                    {t('admin_delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="admin-card">
            <h2>{t('admin_rendezvous')}</h2>
            <button className="ajouter-btn" onClick={() => handleAdd('rendezvous')}>
              {t('ajouter_rendezvous')}
            </button>
            {rendezvous.map((r) => (
              <div className="admin-item" key={r._id}>
                <div className="rdv-info">
                  <div>
                    <strong>{r.date}</strong> à <strong>{r.heure}</strong>
                  </div>
                  <div>
                    {r.patient?.name || 'Patient inconnu'} ➜ {r.medecin?.nom || 'Médecin inconnu'}
                  </div>
                  <div>
                    <em>{r.motif}</em>
                  </div>
                  <div style={getStatutStyle(r.statut)}>
                    {t(`statut_${r.statut}`) || r.statut || 'Confirmé'}
                  </div>
                </div>
                <div className="admin-actions">
                  <button className="edit-btn" onClick={() => handleEditRdvClick(r)}>
                    {t('modifier')}
                  </button>
                  <button className="delete-btn" onClick={() => supprimerRendezVous(r._id)}>
                    {t('admin_delete')}
                  </button>
                  {r.statut !== 'annule' && (
                    <button className="cancel-btn" onClick={() => annulerRendezVous(r._id)}>
                      {t('annuler')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {renderEditModal()}
      {renderAddModal()}
      {renderRdvEditModal()}
    </div>
  );
}