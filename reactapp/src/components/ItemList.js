import React, { useState, useEffect } from 'react';
import { itemService } from '../services/apiService';

const ItemList = ({ onEdit, onView }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verileri yükle
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await itemService.getAll();
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError('Veriler yüklenirken bir hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Bileşen yüklendiğinde verileri getir
  useEffect(() => {
    fetchItems();
  }, []);

  // Öğe silme işlemi
  const handleDelete = async (id) => {
    if (window.confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) {
      try {
        await itemService.delete(id);
        // Silinen öğeyi listeden kaldır
        setItems(items.filter(item => item.id !== id));
      } catch (err) {
        setError('Silme işlemi sırasında bir hata oluştu.');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="item-list">
      <h2>Öğe Listesi</h2>
      {items.length === 0 ? (
        <p>Gösterilecek öğe yok.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad</th>
              <th>Açıklama</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => onView(item.id)}>Görüntüle</button>
                  <button onClick={() => onEdit(item.id)}>Düzenle</button>
                  <button onClick={() => handleDelete(item.id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ItemList;