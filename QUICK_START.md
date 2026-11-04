# Quick Start Guide

Get the app running in 5 minutes!

## Step 1: Install Dependencies (2 minutes)

```bash
cd "Cloudinary Projects/bla"
npm install && cd frontend && npm install && cd ..
```

## Step 2: Start the Backend (Terminal 1)

```bash
npm run dev:backend
```

✅ Backend running on `http://localhost:5000`

## Step 3: Start the Frontend (Terminal 2)

```bash
npm run dev:frontend
```

✅ Frontend running on `http://localhost:5173`

## Step 4: Open in Browser

Visit: **http://localhost:5173**

---

## What Can You Do?

### 🔼 Upload Images
1. Click **"⬆️ Upload"** tab
2. Drag & drop an image or click to browse
3. Click **"Upload Image"** button
4. Image gets automatic transformations!

### 📁 View Gallery
1. Click **"📁 Gallery"** tab
2. See all your uploaded images
3. Hover over images to see options
4. Click edit icon to transform

### 🎨 Transform Images
1. Click **"🎨 Transform"** tab (or click edit in gallery)
2. Adjust these controls:
   - **Size**: Width, Height
   - **Crop**: Fill, Scale, Fit, etc.
   - **Effects**: Blur, Grayscale, etc.
   - **Quality**: Auto, Best, Good
3. See real-time preview!
4. Copy the generated URL

### 🔍 Search Images
Use the search bar to find images by tags

### 🗑️ Delete Images
Hover over an image in gallery → Click delete button

---

## Key Features

| Feature | Location | What It Does |
|---------|----------|-------------|
| Upload | Upload tab | Upload images with automatic optimizations |
| Gallery | Gallery tab | Browse all images in a responsive grid |
| Transform | Transform tab | Apply real-time effects and transformations |
| Search | Top of gallery | Find images by tags |
| Delete | Hover on image | Remove images from your gallery |
| Responsive URLs | Transform options | Generate mobile-optimized image URLs |

---

## Sample Transformations

Try these transformation combinations:

### Portrait Mode
- Width: 400, Height: 500
- Crop: Fill
- Gravity: Face

### Social Media Thumbnail
- Width: 1200, Height: 630
- Crop: Fill
- Gravity: Auto

### Mobile Image
- Width: 320, Height: 480
- Crop: Fill
- Quality: Auto
- Format: Auto

### Artistic Effect
- Width: 600, Height: 600
- Effect: Blur
- Crop: Fill

---

## API Quick Reference

All API calls are made from the frontend automatically!

```bash
# Upload
POST /api/upload

# List images
GET /api/assets

# Search images
GET /api/search?query=tag-name

# Transform
POST /api/transform

# Delete
DELETE /api/assets/{publicId}

# Get usage stats
GET /api/usage
```

---

## Troubleshooting

### "Cannot GET /api/upload"
- Backend is not running on port 5000
- Start backend: `npm run dev:backend`

### "Connection refused"
- Check both terminals are running
- Backend: `npm run dev:backend`
- Frontend: `npm run dev:frontend`

### Images not uploading
- Check browser console for errors (F12)
- Verify image is valid format (JPG, PNG, etc.)
- Check network tab for failed requests

### Transformation not showing
- Make sure you selected an image from gallery
- Try clicking the edit icon instead

---

## Your Cloudinary Credentials (Already Set!)

```
Cloud Name: sarg5qfy
API Key: configured in your local `.env`
API Secret: (hidden, stored in .env)
```

✅ Everything is pre-configured and ready to use!

---

## Next Steps

1. **Try uploading 5-10 images** to build your gallery
2. **Experiment with different transformations** to see Cloudinary power
3. **Check transformation URLs** - these are production-ready!
4. **Explore the code** in `frontend/src/components/` to learn integration patterns

---

## Get Help

- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Check SETUP.md**: Detailed installation & troubleshooting
- **Check FEATURES.md**: Full feature documentation
- **Check README.md**: Project overview

---

## Pro Tips

💡 **f_auto** = Automatically chooses best format (WebP, AVIF, etc.)
💡 **q_auto** = Automatically optimizes quality for size
💡 **g_face** = Focuses on faces when cropping
💡 **c_fill** = Fills the entire dimension without stretching
💡 **w_300,h_300,c_fill** = Perfect for thumbnails

---

## 🎉 Ready to Showcase?

Your app demonstrates:
✅ Upload API - Direct cloud uploads
✅ Transformation API - Real-time effects
✅ Admin API - Asset management
✅ Best practices - Optimization, responsive images
✅ Production patterns - Error handling, pagination

Perfect for Cloudinary creator community! 🚀
