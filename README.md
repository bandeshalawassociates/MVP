# 🎬 CloudFrame - Professional Media Management Platform

A modern, enterprise-grade full-stack web application for professional photographers, content creators, and media teams to manage, transform, and optimize their visual assets using Cloudinary's powerful APIs.

## Features

✨ **Core Features:**
- Batch upload with intelligent asset organization
- Advanced metadata and tagging system
- AI-powered transformations with presets
- Smart cropping with face detection
- Responsive image delivery optimization
- Real-time collaboration workspace
- Asset versioning and history tracking
- Performance analytics dashboard

🎯 **Professional Features:**
- Team workspace management
- Custom transformation presets
- Automated backup & recovery
- Advanced permission controls
- Batch processing & automation
- Integration APIs
- Custom branding options
- Export in multiple formats

**Enterprise-Grade:**
- Unlimited storage scaling
- Priority support
- Advanced security & compliance
- Audit logging
- Rate limiting & API quotas
- Custom SLA agreements

## Project Structure

```
.
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx
│   └── vite.config.js
├── backend/               # Node.js + Express backend
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── controllers/       # Request handlers
│   ├── utils/             # Utility functions
│   └── server.js
├── .env.example           # Environment template
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Cloudinary account with:
  - Cloud Name: `sarg5qfy`
  - API Key: `your_api_key`
  - API Secret: `your_api_secret`

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Cloudinary credentials
3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the backend:
   ```bash
   npm run dev:backend
   ```

5. In another terminal, start the frontend:
   ```bash
   npm run dev:frontend
   ```

6. Open `http://localhost:5173` in your browser

## Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run build` - Build for production
- `npm run start` - Start production server

## Key Cloudinary Integrations

### 1. Upload with Transformations
- Automatic thumbnail generation
- Multiple quality versions
- Eager transformations

### 2. Responsive Images
- Automatic srcset generation
- Device-aware delivery
- Format optimization (WebP, etc.)

### 3. Image Analysis
- Auto-tagging
- Caption generation
- Object detection
- Moderation checks

### 4. Delivery Optimization
- Automatic format selection (`f_auto`)
- Quality optimization (`q_auto`)
- CDN caching
- WebP/AVIF delivery

## Learn More

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload API Guide](https://cloudinary.com/documentation/image_upload_api_reference)
- [Transformation API Guide](https://cloudinary.com/documentation/image_transformation_reference)
- [Admin API Guide](https://cloudinary.com/documentation/admin_api)
