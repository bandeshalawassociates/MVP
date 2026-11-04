import { useState } from 'react';
import './UploadForm.css';
import { FiUpload, FiCheck, FiAlertCircle } from 'react-icons/fi';

function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
      setStatus(null);
      setMessage('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-active');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-active');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-active');
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(droppedFiles[0]);
      setStatus(null);
      setMessage('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('error');
      setMessage('Please select a file');
      return;
    }

    setLoading(true);
    setStatus(null);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(`Image uploaded successfully!`);
        setFile(null);
        setPreview(null);

        // Call the callback with the asset details
        if (data.asset) {
          onUploadSuccess(data.asset);
        }

        // Clear form after 2 seconds
        setTimeout(() => {
          setStatus(null);
          setMessage('');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setStatus('error');
      setMessage('Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <h2>Upload Image</h2>

      <form onSubmit={handleUpload} className="upload-form">
        <div
          className="upload-dropzone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon">
            <FiUpload size={48} />
          </div>
          <h3>Drag and drop your image here</h3>
          <p>or</p>
          <label className="file-input-label">
            <span className="file-input-text">Click to browse</span>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="file-input"
              disabled={loading}
            />
          </label>
        </div>

        {preview && (
          <div className="preview-section">
            <h3>Preview</h3>
            <img src={preview} alt="Preview" className="preview-image" />
            <p className="file-name">{file?.name}</p>
            <p className="file-size">
              {(file?.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="message-box success">
            <FiCheck size={20} />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="message-box error">
            <FiAlertCircle size={20} />
            <span>{message}</span>
          </div>
        )}

        <button
          type="submit"
          className="upload-btn"
          disabled={!file || loading}
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      <div className="upload-info">
        <h3>Features</h3>
        <ul>
          <li>✅ Automatic thumbnail generation</li>
          <li>✅ Multiple quality versions</li>
          <li>✅ Auto format optimization</li>
          <li>✅ CDN delivery</li>
          <li>✅ Instant transformations</li>
        </ul>
      </div>
    </div>
  );
}

export default UploadForm;
