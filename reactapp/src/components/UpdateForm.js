import React, { useState, useEffect } from 'react';
import { itemService } from '../services/apiService';

const UpdateForm = ({ itemId, onItemUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
    // Diğer alanları API'nize göre ekleyin
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Öğeyi yükle
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await itemService.getById(itemId);
        setFormData(response.data);
        setError(null);
      } catch (err) {
        setError('Öğe yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

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
      await itemService.update(itemId, formData);
      
      // Başarılı güncelleme sonrası callback
      if (onItemUpdated) {
        onItemUpdated(formData);
      }
      
    } catch (err) {
      setError('Öğe güncellenirken bir hata meydana geldi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="update-form">
      <h2>Öğe Düzenle</h2>
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

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </button>
          <button type="button" onClick={onCancel}>
            İptal
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;