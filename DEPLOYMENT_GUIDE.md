# 🚀 HealthSync Deployment Guide (Railway + MongoDB Atlas)

## Overview
This guide walks you through deploying HealthSync to production using:
- **Railway** - for hosting backend and frontend
- **MongoDB Atlas** - for cloud database

Total time: **15-20 minutes**

---

## 📋 Prerequisites

Before deploying, you need:
1. ✅ GitHub repository (already done!)
2. ✅ MongoDB Atlas account
3. ✅ Railway account
4. ✅ Your own domain (optional, Railway provides free URLs)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (5 minutes)

### 1.1 Create MongoDB Atlas Account
1. Go to **https://www.mongodb.com/cloud/atlas**
2. Click **"Start Free"**
3. Sign up with Google, GitHub, or email
4. Create a new **Organization** (name it "HealthSync")

### 1.2 Create a Free Cluster
1. Click **"Create a Deployment"**
2. Choose **"Free"** tier
3. Leave defaults and click **"Create"**
4. Wait ~5-10 minutes for cluster to deploy

### 1.3 Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Drivers"**
4. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/healthsync
   ```
5. **Save this** - you'll need it for Railway

### 1.4 Create Database User
1. In Atlas, go to **"Security" → "Database Access"**
2. Click **"Create New Database User"**
3. Set username: `healthsync_user`
4. Set password: Choose a strong password
5. Click **"Create"**
6. **Replace `username:password` in your connection string**

---

## 🚀 Step 2: Deploy to Railway (10 minutes)

### 2.1 Create Railway Account
1. Go to **https://railway.app**
2. Click **"Start Now"**
3. Sign in with **GitHub**
4. Authorize Railway to access your GitHub account

### 2.2 Create New Project
1. Click **"+ New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select **`healthsync`** repository
4. Click **"Deploy Now"**

### 2.3 Configure Backend Service

Railway automatically detected your repo. Now configure it:

**Backend Service Setup:**
1. Go to **Variables** tab
2. Add these environment variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | Generate strong random string (use: openssl rand -hex 32) |
| `FRONTEND_URL` | `https://your-railway-url.railway.app` |
| `OPENAI_API_KEY` | Your API key (optional, can be added later) |

3. Click **"Deploy"**

### 2.4 Configure Frontend Service

The backend should be running. Now add frontend:

1. In Railway project, click **"+ Add Service"**
2. Choose **"GitHub Repo"**
3. Select your `healthsync` repo again
4. In **"Service Name"**, type: `frontend`
5. In **Variables** tab, add:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://api-your-railway-url.railway.app/api` |

6. Click **"Deploy"**

### 2.5 Get Your Public URLs

After deployment:
1. In Railway, click on your backend service
2. Look for **"Domains"** section
3. Copy the URL (example: `https://healthsync-backend.railway.app`)
4. Do the same for frontend
5. **Update your variables with correct URLs**

---

## ✅ Step 3: Verify Deployment

### Test Backend
```bash
curl https://your-backend-url.railway.app/api/health
# Should return: { "message": "Server is running" }
```

### Test Frontend
Visit: `https://your-frontend-url.railway.app`
- Should see HealthSync login page
- Try login with: `sarah@example.com` / `password123`

### Check Logs (if something fails)
In Railway:
1. Click on your service
2. Click **"Logs"** tab
3. Look for error messages

---

## 🔧 Step 4: Custom Configuration (Optional)

### Add Custom Domain
1. In Railway project settings
2. Go to **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

### Enable Automatic Deployments
Railway auto-deploys on GitHub push by default! Just commit and push:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Verify connection string includes correct password
- Check MongoDB Atlas IP whitelist: Allow `0.0.0.0/0` (anyone)
- Ensure database name in URL is `healthsync`

### Issue: "Frontend can't reach backend API"
**Solution:**
- Update `VITE_API_URL` with correct backend URL
- Ensure backend has `FRONTEND_URL` set correctly for CORS
- Redeploy frontend after updating variables

### Issue: "Deployment keeps failing"
**Solution:**
- Check **Logs** tab in Railway
- Ensure `package.json` has correct scripts
- Verify all environment variables are set

---

## 📱 Accessing Your Application

After successful deployment:

**Frontend:** `https://healthsync-frontend.railway.app`
- Demo login: `sarah@example.com` / `password123`
- Or create a new account

**Backend API:** `https://healthsync-backend.railway.app/api`
- Health check: `/health`
- API docs in README.md

---

## 💰 Cost Estimate

| Service | Cost | Notes |
|---------|------|-------|
| MongoDB Atlas | Free | 10GB free tier, enough for testing |
| Railway | Free* | $5 credit/month free, overage is pay-as-you-go (~$5/month typical) |
| **Total** | ~$0-5/month | Very affordable! |

*Railway also has free tier with limitations

---

## 🔒 Security Notes

✅ **Production-Ready Security:**
- JWT tokens for authentication
- Password hashing with bcryptjs
- CORS enabled for your domain only
- Environment variables for secrets (not in code)
- MongoDB Atlas IP whitelist

⚠️ **Before Going Live:**
1. Change `JWT_SECRET` to a strong random string
2. Change MongoDB password
3. Set `NODE_ENV=production`
4. Disable demo login in production (optional)
5. Add real OpenAI API key if using chatbot

---

## 🎉 Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Deploy to Railway
3. ✅ Test your application
4. ✅ Share your app URL with others
5. ✅ Monitor performance in Railway dashboard

---

## 📚 Additional Resources

- **Railway Docs:** https://docs.railway.app
- **MongoDB Atlas Docs:** https://docs.mongodb.com/manual
- **HealthSync README:** See README.md for API documentation

---

## 💬 Questions?

If something doesn't work:
1. Check **Railway Logs**
2. Check **MongoDB Atlas Logs**
3. Review this guide's troubleshooting section
4. Post issue on your GitHub repository

---

**Happy deploying! 🚀**

Your HealthSync app will soon be live for the world to see!
