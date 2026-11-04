import { useState, useEffect } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import UploadForm from './components/UploadForm';
import SearchBar from './components/SearchBar';
import TransformationPreview from './components/TransformationPreview';

function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Fetch assets
  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/assets');
      const data = await response.json();
      setAssets(data.assets || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Search assets
  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (!query.trim()) {
      fetchAssets();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setAssets(data.assets || []);
    } catch (error) {
      console.error('Error searching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle upload success
  const handleUploadSuccess = (newAsset) => {
    setAssets([newAsset, ...assets]);
    setActiveTab('gallery');
  };

  // Delete asset
  const handleDeleteAsset = async (publicId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const response = await fetch(`/api/assets/${encodeURIComponent(publicId)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAssets(assets.filter((a) => a.public_id !== publicId));
        alert('Image deleted successfully');
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
      alert('Error deleting image');
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>🎬 CloudFrame</h1>
          <p className="subtitle">
            Professional Media Management & AI-Powered Asset Optimization
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('gallery');
                setSelectedAsset(null);
              }}
            >
              📁 Gallery
            </button>
            <button
              className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              ⬆️ Upload
            </button>
            <button
              className={`tab-btn ${activeTab === 'transform' ? 'active' : ''}`}
              onClick={() => setActiveTab('transform')}
            >
              🎨 Transform
            </button>
          </div>

          {/* Content */}
          {activeTab === 'gallery' && (
            <div className="gallery-section">
              <SearchBar onSearch={handleSearch} />
              {loading ? (
                <div className="loading">Loading images...</div>
              ) : assets.length === 0 ? (
                <div className="empty-state">
                  <p>No images found. Upload your first image to get started!</p>
                </div>
              ) : (
                <Gallery
                  assets={assets}
                  onDeleteAsset={handleDeleteAsset}
                  onSelectAsset={setSelectedAsset}
                  selectedAsset={selectedAsset}
                />
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="upload-section">
              <UploadForm onUploadSuccess={handleUploadSuccess} />
            </div>
          )}

          {activeTab === 'transform' && (
            <div className="transform-section">
              {selectedAsset ? (
                <TransformationPreview asset={selectedAsset} />
              ) : (
                <div className="empty-state">
                  <p>Select an image from the gallery to apply transformations</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>
            Built with <strong>Cloudinary</strong> |{' '}
            <a href="https://cloudinary.com/documentation" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>{' '}
            |{' '}
            <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer">
              Visit Cloudinary
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
