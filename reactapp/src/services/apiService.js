import axios from 'axios';

// API URL'sini ortam değişkeninden al veya varsayılan değeri kullan
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5163/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const itemService = {
  // Tüm öğeleri getir
  getAll: () => {
    return apiClient.get('/Items');
  },
  
  // ID'ye göre tek öğe getir
  getById: (id) => {
    return apiClient.get(`/Items/${id}`);
  },
  
  // Yeni öğe oluştur
  create: (item) => {
    return apiClient.post('/Items', item);
  },
  
  // Öğe güncelle
  update: (id, item) => {
    return apiClient.put(`/Items/${id}`, item);
  },
  
  // Öğe sil
  delete: (id) => {
    return apiClient.delete(`/Items/${id}`);
  }
};