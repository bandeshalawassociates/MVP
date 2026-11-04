import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(cors());
app.use(express.json());

// Multer Storage Configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gallery',
    resource_type: 'auto',
    eager: [
      { width: 300, height: 300, crop: 'fill' },
      { width: 600, height: 600, crop: 'fill' },
    ],
  },
});

const upload = multer({ storage });

// ==================== Routes ====================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'CloudFrame API is running!',
    version: '1.0.0',
    platform: 'CloudFrame Professional Media Management'
  });
});

// ==================== Upload Routes ====================

// Upload single image
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      asset: {
        public_id: req.file.filename,
        url: req.file.path,
        secure_url: req.file.path,
        resource_type: req.file.resource_type,
        created_at: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== Asset Routes ====================

// Get all assets with pagination
app.get('/api/assets', async (req, res) => {
  try {
    const { max_results = 12, next_cursor } = req.query;

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'gallery',
      max_results: parseInt(max_results),
      next_cursor,
      resource_type: 'image',
    });

    res.json({
      assets: result.resources,
      next_cursor: result.next_cursor || null,
      total_count: result.total_count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search assets
app.get('/api/search', async (req, res) => {
  try {
    const { query = '', max_results = 12 } = req.query;

    const result = await cloudinary.api.resources_by_tag(query, {
      max_results: parseInt(max_results),
      resource_type: 'image',
    });

    res.json({
      assets: result.resources,
      total_count: result.resources.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get asset details
app.get('/api/assets/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;
    
    const result = await cloudinary.api.resource(`gallery/${publicId}`, {
      resource_type: 'image',
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete asset
app.delete('/api/assets/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;

    await cloudinary.uploader.destroy(`gallery/${publicId}`);

    res.json({
      success: true,
      message: 'Asset deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== Transformation Routes ====================

// Generate transformation preview
app.post('/api/transform', (req, res) => {
  try {
    const { publicId, transformations } = req.body;

    if (!publicId || !transformations) {
      return res
        .status(400)
        .json({ error: 'Missing publicId or transformations' });
    }

    const url = cloudinary.url(`gallery/${publicId}`, transformations);

    res.json({
      success: true,
      url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== Analysis Routes ====================

// Analyze image (tagging, moderation, etc.)
app.post('/api/analyze', async (req, res) => {
  try {
    const { publicId, analysisType = 'tagging' } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: 'Missing publicId' });
    }

    const imageUrl = cloudinary.url(`gallery/${publicId}`);

    let result = {};

    // Auto-tagging
    if (analysisType === 'tagging' || analysisType === 'all') {
      try {
        const tagResult = await cloudinary.api.resource(`gallery/${publicId}`, {
          resource_type: 'image',
          custom_coordinates: true,
        });
        result.tags = tagResult.tags || [];
      } catch (e) {
        // Tagging might not be available
      }
    }

    // Get image metadata for analysis
    try {
      const metadata = await cloudinary.api.resource(`gallery/${publicId}`, {
        resource_type: 'image',
      });
      result.metadata = metadata;
    } catch (e) {
      console.log('Could not fetch metadata');
    }

    res.json({
      success: true,
      analysis: result,
      imageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== Utility Routes ====================

// Generate responsive image URL
app.post('/api/responsive-url', (req, res) => {
  try {
    const { publicId, breakpoints = [320, 768, 1024, 1920] } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: 'Missing publicId' });
    }

    const srcSet = breakpoints
      .map((width) => {
        const url = cloudinary.url(`gallery/${publicId}`, {
          width,
          crop: 'fill',
          quality: 'auto',
          fetch_format: 'auto',
        });
        return `${url} ${width}w`;
      })
      .join(', ');

    res.json({
      success: true,
      srcSet,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get usage statistics
app.get('/api/usage', async (req, res) => {
  try {
    const result = await cloudinary.api.usage();

    res.json({
      success: true,
      usage: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== Error Handling ====================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🎬 CloudFrame Professional Media Platform`);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📦 Cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  console.log(`💾 Ready for production use`);
});
