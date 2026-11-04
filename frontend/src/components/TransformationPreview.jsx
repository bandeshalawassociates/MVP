import { useState } from 'react';
import './TransformationPreview.css';

function TransformationPreview({ asset }) {
  const [transformations, setTransformations] = useState({
    width: 500,
    height: 500,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    fetch_format: 'auto',
    effect: 'none',
    angle: 0,
    opacity: 100,
  });

  const generateUrl = () => {
    const params = [];

    if (transformations.width || transformations.height) {
      params.push(`w_${transformations.width}`);
      params.push(`h_${transformations.height}`);
      params.push(`c_${transformations.crop}`);
    }

    if (transformations.gravity !== 'auto') {
      params.push(`g_${transformations.gravity}`);
    }

    if (transformations.quality !== 'none') {
      params.push(`q_${transformations.quality}`);
    }

    if (transformations.fetch_format !== 'auto') {
      params.push(`f_${transformations.fetch_format}`);
    }

    if (transformations.effect !== 'none') {
      params.push(`e_${transformations.effect}`);
    }

    if (transformations.angle !== 0) {
      params.push(`a_${transformations.angle}`);
    }

    if (transformations.opacity !== 100) {
      params.push(`o_${transformations.opacity}`);
    }

    const baseUrl = `https://res.cloudinary.com/sarg5qfy/image/upload`;
    const transformString = params.join(',');

    return `${baseUrl}/${transformString}/gallery/${asset.public_id}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransformations((prev) => ({
      ...prev,
      [name]: isNaN(value) ? value : parseInt(value),
    }));
  };

  const url = generateUrl();

  return (
    <div className="transformation-container">
      <h2>Image Transformation Preview</h2>

      <div className="transformation-layout">
        <div className="preview-column">
          <div className="preview-box">
            <img src={url} alt="Transformed" className="preview-img" />
          </div>
          <div className="url-box">
            <p className="url-label">Generated URL:</p>
            <code className="url-code">{url}</code>
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(url)}
            >
              Copy URL
            </button>
          </div>
        </div>

        <div className="controls-column">
          <div className="control-group">
            <label>Width (px)</label>
            <input
              type="number"
              name="width"
              value={transformations.width}
              onChange={handleChange}
              min="50"
              max="2000"
              step="50"
            />
          </div>

          <div className="control-group">
            <label>Height (px)</label>
            <input
              type="number"
              name="height"
              value={transformations.height}
              onChange={handleChange}
              min="50"
              max="2000"
              step="50"
            />
          </div>

          <div className="control-group">
            <label>Crop Mode</label>
            <select name="crop" value={transformations.crop} onChange={handleChange}>
              <option value="fill">Fill</option>
              <option value="scale">Scale</option>
              <option value="fit">Fit</option>
              <option value="crop">Crop</option>
              <option value="thumb">Thumb</option>
            </select>
          </div>

          <div className="control-group">
            <label>Gravity</label>
            <select name="gravity" value={transformations.gravity} onChange={handleChange}>
              <option value="auto">Auto</option>
              <option value="center">Center</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
              <option value="north_east">North East</option>
              <option value="north_west">North West</option>
              <option value="south_east">South East</option>
              <option value="south_west">South West</option>
              <option value="face">Face</option>
            </select>
          </div>

          <div className="control-group">
            <label>Quality</label>
            <select name="quality" value={transformations.quality} onChange={handleChange}>
              <option value="auto">Auto</option>
              <option value="best">Best</option>
              <option value="good">Good</option>
              <option value="85">85%</option>
              <option value="70">70%</option>
            </select>
          </div>

          <div className="control-group">
            <label>Format</label>
            <select name="fetch_format" value={transformations.fetch_format} onChange={handleChange}>
              <option value="auto">Auto</option>
              <option value="webp">WebP</option>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
            </select>
          </div>

          <div className="control-group">
            <label>Effect</label>
            <select name="effect" value={transformations.effect} onChange={handleChange}>
              <option value="none">None</option>
              <option value="blur">Blur</option>
              <option value="grayscale">Grayscale</option>
              <option value="sepia">Sepia</option>
              <option value="negate">Negate</option>
              <option value="brightness">Brightness</option>
            </select>
          </div>

          <div className="control-group">
            <label>Rotation (degrees)</label>
            <input
              type="number"
              name="angle"
              value={transformations.angle}
              onChange={handleChange}
              min="0"
              max="360"
              step="15"
            />
          </div>

          <div className="control-group">
            <label>Opacity (%)</label>
            <input
              type="number"
              name="opacity"
              value={transformations.opacity}
              onChange={handleChange}
              min="0"
              max="100"
              step="10"
            />
          </div>
        </div>
      </div>

      <div className="transformation-tips">
        <h3>💡 Pro Tips</h3>
        <ul>
          <li>Use <strong>f_auto</strong> for automatic format selection (WebP, etc.)</li>
          <li>Use <strong>q_auto</strong> for quality optimization</li>
          <li>Use <strong>g_face</strong> to focus on faces when cropping</li>
          <li>Combine effects for creative transformations</li>
          <li>All transformations are applied server-side and cached</li>
        </ul>
      </div>
    </div>
  );
}

export default TransformationPreview;
