import React, { useState } from 'react';
import './CustomerList.css';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const [entries, setEntries] = useState([
    {
      id: 0,
      country: 'Egypt',
      city: 'Cairo',
      museum: 'New Cairo Museum',
      section: 'Ancient Egyptian',
    },
  ]);
  const [form, setForm] = useState({
    country: '',
    city: '',
    museum: '',
    section: '',
  });
  const [editForm, setEditForm] = useState({
    id: null,
    country: '',
    city: '',
    museum: '',
    section: '',
  });
  const [showEdit, setShowEdit] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();
  const home = () => navigate('/');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    const { country, city, museum, section } = form;
    if (!country || !city || !museum || !section) {
      alert('Please fill all fields.');
      return;
    }
    const newEntry = { id: nextId, ...form };
    setEntries([...entries, newEntry]);
    setForm({ country: '', city: '', museum: '', section: '' });
    setNextId(nextId + 1);
  };

  const deleteEntry = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (confirmDelete) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const startEdit = (entry) => {
    setEditForm({
      id: entry.id,
      country: entry.country || '',
      city: entry.city || '',
      museum: entry.museum || '',
      section: entry.section || '',
    });
    setShowEdit(true);
  };

  const saveEdit = () => {
    setEntries(entries.map((e) => (e.id === editForm.id ? editForm : e)));
    setShowEdit(false);
  };

  return (
    <div className="customer-container">
      <div className="customer-card">
        <h2 className="title">📋 Destination List</h2>

        <div className="form-row">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="museum"
            placeholder="Museum"
            value={form.museum}
            onChange={handleChange}
          />
          <input
            type="text"
            name="section"
            placeholder="Section"
            value={form.section}
            onChange={handleChange}
          />
          <button onClick={addEntry}>Add</button>
          <button onClick={home}>Home</button>
        </div>

        <div className="form-row">
          <input
            type="text"
            placeholder="Search by any field"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Country</th>
              <th>City</th>
              <th>Museum</th>
              <th>Section</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries
              .filter((entry) => {
                const text = searchText.toLowerCase();
                return (
                  (entry.country || '').toLowerCase().includes(text) ||
                  (entry.city || '').toLowerCase().includes(text) ||
                  (entry.museum || '').toLowerCase().includes(text) ||
                  (entry.section || '').toLowerCase().includes(text)
                );
              })
              .map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.country}</td>
                  <td>{entry.city}</td>
                  <td>{entry.museum}</td>
                  <td>{entry.section}</td>
                  <td className="actions">
                    <button onClick={() => startEdit(entry)}>✏️</button>
                    <button onClick={() => deleteEntry(entry.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No data added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showEdit && (
        <div className="modal-backdrop" style={{ color: 'black' }}>
          <div className="modal">
            <h3>Edit Entry</h3>

            <label>Country</label>
            <input
              type="text"
              name="country"
              value={editForm.country}
              onChange={handleEditChange}
            />

            <label>City</label>
            <input
              type="text"
              name="city"
              value={editForm.city}
              onChange={handleEditChange}
            />

            <label>Museum</label>
            <input
              type="text"
              name="museum"
              value={editForm.museum}
              onChange={handleEditChange}
            />

            <label>Section</label>
            <input
              type="text"
              name="section"
              value={editForm.section}
              onChange={handleEditChange}
            />

            <div className="modal-buttons">
              <button onClick={saveEdit}>Save</button>
              <button className="cancel" onClick={() => setShowEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
