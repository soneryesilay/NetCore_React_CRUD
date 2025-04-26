import React, { useState, useEffect } from 'react';
import { itemService } from '../services/apiService';

const ItemDetail = ({ itemId, onBack }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await itemService.getById(itemId);
        setItem(response.data);
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

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div>Öğe bulunamadı.</div>;

  return (
    <div className="item-detail">
      <h2>Öğe Detayları</h2>
      <div className="detail-content">
        <p><strong>ID:</strong> {item.id}</p>
        <p><strong>Ad:</strong> {item.name}</p>
        <p><strong>Açıklama:</strong> {item.description}</p>
        {/* Diğer alanları API'nize göre ekleyin */}
      </div>
      <button onClick={onBack}>Geri Dön</button>
    </div>
  );
};

export default ItemDetail;