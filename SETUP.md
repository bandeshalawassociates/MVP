# Setup & Installation Guide

## Prerequisites

- **Node.js 16+** - [Download](https://nodejs.org/)
- **npm** or **yarn**
- Cloudinary account with credentials:
  - Cloud Name: `sarg5qfy`
  - API Key: `your_api_key`
  - API Secret: `your_api_secret`

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd "Cloudinary Projects/bla"
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 4. Environment Configuration
The `.env` file is already configured with your Cloudinary credentials:
```env
CLOUDINARY_CLOUD_NAME=sarg5qfy
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
NODE_ENV=development
```

## Running the Application

### Option 1: Start Backend Only
```bash
npm run dev:backend
```
Backend will run on `http://localhost:5000`

### Option 2: Start Frontend Only (in another terminal)
```bash
npm run dev:frontend
```
Frontend will run on `http://localhost:5173` and proxy API calls to `http://localhost:5000`

### Option 3: Start Both (Recommended)
**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

Then open your browser to `http://localhost:5173`

## Project Structure

```
bla/
├── server.js                    # Express backend server
├── package.json                 # Backend dependencies
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── README.md                    # Project documentation
├── SETUP.md                     # This file
│
└── frontend/
    ├── src/
    │   ├── App.jsx              # Main App component
    │   ├── App.css              # Main styles
    │   ├── main.jsx             # Entry point
    │   ├── index.css            # Global styles
    │   │
    │   └── components/
    │       ├── Gallery.jsx      # Image gallery component
    │       ├── Gallery.css
    │       ├── UploadForm.jsx   # File upload component
    │       ├── UploadForm.css
    │       ├── SearchBar.jsx    # Search component
    │       ├── SearchBar.css
    │       ├── TransformationPreview.jsx  # Transformation tool
    │       └── TransformationPreview.css
    │
    ├── index.html               # HTML template
    ├── vite.config.js           # Vite configuration
    └── package.json             # Frontend dependencies
```

## API Endpoints

### Upload
- **POST** `/api/upload` - Upload image with automatic transformations

### Assets
- **GET** `/api/assets` - List all assets with pagination
- **GET** `/api/search?query=...` - Search assets by tag
- **GET** `/api/assets/:publicId` - Get asset details
- **DELETE** `/api/assets/:publicId` - Delete asset

### Transformations
- **POST** `/api/transform` - Generate transformation preview

### Analysis
- **POST** `/api/analyze` - Analyze image (tags, metadata)

### Utilities
- **POST** `/api/responsive-url` - Generate responsive image URL
- **GET** `/api/usage` - Get account usage statistics

## Key Features

### Upload with Transformations
Images automatically get:
- Thumbnail generation (300x300, 600x600)
- Quality optimization
- Format selection

### Responsive Images
- Automatic srcset generation
- Device-aware delivery
- Format optimization (WebP, AVIF)

### Transformations
Real-time image transformations including:
- Resizing & cropping
- Gravity (face detection)
- Effects (blur, grayscale, sepia)
- Rotation & opacity
- Auto quality & format

### Search & Organization
- Tag-based search
- Asset metadata viewing
- Bulk operations

## Troubleshooting

### Port Already in Use
If port 5000 or 5173 is in use, change them in:
- Backend: Modify `PORT` in `.env`
- Frontend: Modify port in `vite.config.js`

### CORS Issues
The backend is configured with CORS enabled. If issues persist, check:
- Frontend proxy in `frontend/vite.config.js`
- Backend CORS setup in `server.js`

### Cloudinary Credentials Not Working
1. Verify credentials in `.env`
2. Check that your Cloudinary account is active
3. Ensure API key and secret match your account
4. Visit https://console.cloudinary.com to verify

### Upload Fails
- Check network connection
- Verify file size (max usually 100MB)
- Ensure file is a valid image format
- Check browser console for error details

## Next Steps

1. **Upload Images** - Use the Upload tab to add images
2. **Explore Gallery** - View your uploaded images
3. **Transform Images** - Select an image and apply transformations
4. **Analyze Images** - Check AI-generated metadata

## Learn More

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [API Reference](https://cloudinary.com/documentation/image_upload_api_reference)
- [Transformation Guide](https://cloudinary.com/documentation/image_transformation_reference)
- [Admin API](https://cloudinary.com/documentation/admin_api)

## Support

For issues:
1. Check error messages in browser console
2. Review backend logs in terminal
3. Visit Cloudinary support: https://support.cloudinary.com
4. Check project README.md for more details
