import React, { useState } from 'react';
import { itemService } from '../services/apiService';

const CreateForm = ({ onItemCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
    // Diğer alanları API'nize göre ekleyin
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      const response = await itemService.create(formData);
      
      // Formu sıfırla
      setFormData({
        name: '',
        description: ''
      });
      
      // Başarılı oluşturma sonrası callback
      if (onItemCreated) {
        onItemCreated(response.data);
      }
      
    } catch (err) {
      setError('Öğe oluşturulurken bir hata meydana geldi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-form">
      <h2>Yeni Öğe Ekle</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Ad:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Açıklama:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Ekleniyor...' : 'Ekle'}
        </button>
      </form>
    </div>
  );
};

export default CreateForm;