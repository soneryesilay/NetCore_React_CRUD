import React, { useState } from 'react';
import './App.css';
import ItemList from './components/ItemList';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import ItemDetail from './components/ItemDetail';

function App() {
  const [view, setView] = useState('list'); // 'list', 'create', 'update', 'detail'
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Liste görünümüne dön
  const goToList = () => {
    setView('list');
    setSelectedItemId(null);
  };

  // Öğe oluşturma işlemi tamamlandığında
  const handleItemCreated = () => {
    setRefreshFlag(!refreshFlag); // Listeyi yenile
    goToList();
  };

  // Öğe güncelleme işlemi tamamlandığında
  const handleItemUpdated = () => {
    setRefreshFlag(!refreshFlag); // Listeyi yenile
    goToList();
  };

  // Düzenleme görünümüne geç
  const handleEdit = (id) => {
    setSelectedItemId(id);
    setView('update');
  };

  // Detay görünümüne geç
  const handleView = (id) => {
    setSelectedItemId(id);
    setView('detail');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CRUD Uygulaması</h1>
      </header>

      <main className="App-main">
        <div className="container">
          {/* Navigasyon Butonları */}
          <div className="nav-buttons">
            {view !== 'list' && (
              <button onClick={goToList}>Listeye Dön</button>
            )}
            {view !== 'create' && (
              <button onClick={() => setView('create')}>Yeni Öğe Ekle</button>
            )}
          </div>

          {/* Görünümleri göster */}
          {view === 'list' && (
            <ItemList 
              key={refreshFlag} // Yenilemek için key değiştir
              onEdit={handleEdit} 
              onView={handleView} 
            />
          )}

          {view === 'create' && (
            <CreateForm onItemCreated={handleItemCreated} />
          )}

          {view === 'update' && selectedItemId && (
            <UpdateForm 
              itemId={selectedItemId} 
              onItemUpdated={handleItemUpdated} 
              onCancel={goToList} 
            />
          )}

          {view === 'detail' && selectedItemId && (
            <ItemDetail 
              itemId={selectedItemId} 
              onBack={goToList} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;