import { useState } from 'react';
import './Gallery.css';
import { FiDelete, FiEdit2, FiExternalLink } from 'react-icons/fi';

function Gallery({ assets, onDeleteAsset, onSelectAsset, selectedAsset }) {
  const [hoveredId, setHoveredId] = useState(null);

  const generateResponsiveUrl = (publicId, width) => {
    return `https://res.cloudinary.com/sarg5qfy/image/upload/w_${width},c_fill,q_auto,f_auto/gallery/${publicId}`;
  };

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {assets.map((asset) => (
          <div
            key={asset.public_id}
            className={`gallery-card ${selectedAsset?.public_id === asset.public_id ? 'selected' : ''}`}
            onMouseEnter={() => setHoveredId(asset.public_id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="gallery-image-wrapper">
              <img
                src={generateResponsiveUrl(asset.public_id, 300)}
                alt={asset.public_id}
                onClick={() => onSelectAsset(asset)}
                loading="lazy"
              />

              {hoveredId === asset.public_id && (
                <div className="gallery-overlay">
                  <button
                    className="action-btn edit-btn"
                    title="Edit transformations"
                    onClick={() => onSelectAsset(asset)}
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <a
                    href={asset.secure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn view-btn"
                    title="View original"
                  >
                    <FiExternalLink size={18} />
                  </a>
                  <button
                    className="action-btn delete-btn"
                    title="Delete image"
                    onClick={() => onDeleteAsset(asset.public_id)}
                  >
                    <FiDelete size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="gallery-info">
              <p className="gallery-id" title={asset.public_id}>
                {asset.public_id}
              </p>
              <p className="gallery-meta">
                {asset.width} × {asset.height}
              </p>
            </div>
          </div>
        ))}
      </div>

      {assets.length === 0 && (
        <div className="empty-gallery">
          <p>No images in gallery</p>
        </div>
      )}
    </div>
  );
}

export default Gallery;
