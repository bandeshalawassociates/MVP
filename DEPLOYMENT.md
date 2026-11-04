# Deployment Guide

Deploy your Cloudinary Media Gallery to production!

---

## 🚀 Deployment Options

### Option 1: Vercel (Frontend) + Heroku (Backend) - **Recommended**

#### Deploy Backend to Heroku

1. **Create Heroku Account**
   - Visit https://www.heroku.com
   - Sign up for free account

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Create Heroku App**
   ```bash
   cd "Cloudinary Projects/bla"
   heroku login
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set CLOUDINARY_CLOUD_NAME=sarg5qfy
   heroku config:set CLOUDINARY_API_KEY=your_api_key
   heroku config:set CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

#### Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Visit https://vercel.com
   - Sign in with GitHub

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy via Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

4. **Update API URL**
   - In `frontend/src/components/*` files
   - Replace `localhost:5000` with your Heroku URL
   - Or use environment variable: `VITE_API_URL`

---

### Option 2: Railway - All-in-One

Railway makes it super easy to deploy both frontend and backend together.

1. **Create Account**
   - Visit https://railway.app
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub"

3. **Configure**
   - Set environment variables for Cloudinary
   - Railway auto-detects Node.js app

4. **Deploy**
   - Push to GitHub
   - Railway auto-deploys on push

---

### Option 3: Docker + Any Cloud (AWS, Google Cloud, Azure)

#### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install backend dependencies
COPY package*.json ./
RUN npm install

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
RUN npm run build

# Return to root
WORKDIR /app

EXPOSE 5000

CMD ["npm", "start"]
```

#### Create .dockerignore

```
node_modules
.env.local
.git
frontend/node_modules
frontend/dist
```

#### Build & Push

```bash
docker build -t cloudinary-gallery .
docker run -p 5000:5000 cloudinary-gallery
```

---

### Option 4: Static Hosting (Netlify/Vercel) + Separate Backend

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Deploy Frontend to Netlify

1. Connect GitHub repository
2. Build command: `cd frontend && npm run build`
3. Publish directory: `frontend/dist`

#### Deploy Backend

Use any Node.js hosting (Heroku, Railway, AWS Lambda, etc.)

#### Connect Them

Update `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://your-backend-url.com',
      changeOrigin: true,
    },
  },
},
```

---

## 📝 Environment Variables for Production

Create `.env.production`:

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=sarg5qfy
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5000
NODE_ENV=production

# Frontend API
VITE_API_URL=https://your-backend-url.com
```

---

## 🔒 Security for Production

### 1. Use Environment Variables
Never commit secrets to GitHub:

```bash
# Use platform secrets instead
heroku config:set SECRET_KEY=value
vercel env add SECRET_KEY
```

### 2. Enable HTTPS
All platforms provide free HTTPS certificates

### 3. Rate Limiting
Add to backend `server.js`:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. Input Validation
Already implemented in the app - good job!

### 5. CORS Configuration
Update `server.js` for production:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

---

## 📊 Monitoring & Analytics

### Add Error Tracking

```bash
npm install @sentry/node
```

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

### Monitor Performance

- Heroku: Check dashboard metrics
- Railway: Built-in monitoring
- Vercel: Web Analytics included

---

## 🚀 Production Checklist

- [ ] Environment variables set correctly
- [ ] HTTPS enabled
- [ ] CORS configured for production URLs
- [ ] Error handling in place
- [ ] Rate limiting enabled
- [ ] Monitoring configured
- [ ] Database backups configured (if using DB)
- [ ] CDN configured (Cloudinary handles this)
- [ ] Performance optimized
- [ ] Security headers set

---

## 💾 Backup & Recovery

### Backup Cloudinary Assets

Cloudinary provides backup options:
1. Enable backup versions in Console
2. Use Admin API to export assets
3. Schedule regular exports

### Application Backups

- GitHub is your backup
- Use version control best practices
- Keep production `.env` backed up securely

---

## 📈 Scaling Tips

### When You Need More Performance:

1. **Add Caching**
   ```javascript
   app.use(express.static('public', { maxAge: '1d' }));
   ```

2. **Database** (if needed later)
   - MongoDB Atlas
   - PostgreSQL
   - Firebase

3. **CDN** (Optional, Cloudinary CDN is great)
   - Cloudflare
   - AWS CloudFront

4. **Load Balancing** (when traffic grows)
   - Heroku auto-scales
   - Railway auto-scales
   - AWS load balancer

---

## 📞 Deployment Support

### Heroku Issues
- Docs: https://devcenter.heroku.com
- Support: https://help.heroku.com

### Vercel Issues
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

### Railway Issues
- Docs: https://docs.railway.app
- Support: https://discord.gg/railway

### Cloudinary Issues
- Docs: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com

---

## 🎯 Recommended Setup for Beginners

**BEST FOR GETTING STARTED:**

1. **Frontend:** Deploy to Vercel
   - Free tier available
   - GitHub integration
   - Auto-deploys on push
   - Preview URLs

2. **Backend:** Deploy to Railway
   - Free tier available
   - Simple UI
   - Auto-deploys
   - Environment variables easy to set

3. **Total Cost:** $0/month

---

## 🔗 Quick Links

| Service | Link | Notes |
|---------|------|-------|
| Vercel | https://vercel.com | Frontend |
| Railway | https://railway.app | Backend |
| Heroku | https://heroku.com | Backend |
| Docker | https://docker.com | Containers |
| GitHub | https://github.com | Version control |

---

## 📝 Post-Deployment

### Tell the World!

1. **Write a blog post** about the project
2. **Share on social media** with live link
3. **Add to portfolio** with description
4. **Create demo video** showing features
5. **Share with Cloudinary community**

### Cloudinary Creator Showcase

Submit your project:
- https://cloudinary.com/company/case-studies
- Tweet @cloudinary
- Share on forums

---

## ✅ Deployment Checklist

**Before Deploying:**
- [ ] All tests passing locally
- [ ] No console errors
- [ ] Environment variables ready
- [ ] Database configured (if applicable)
- [ ] CORS settings correct
- [ ] Rate limiting enabled
- [ ] Error handling working
- [ ] Performance optimized

**After Deploying:**
- [ ] Test all features
- [ ] Check error logs
- [ ] Verify CDN caching
- [ ] Monitor performance
- [ ] Set up alerts
- [ ] Document API URLs
- [ ] Share with community!

---

**Your app is production-ready! Deploy with confidence! 🚀**
