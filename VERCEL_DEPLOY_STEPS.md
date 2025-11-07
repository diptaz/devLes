# 🚀 Vercel Deployment - Step by Step

**Project:** LesCatur (devLes)  
**Repo:** https://github.com/diptaz/devLes.git  
**Target:** Deploy to Vercel (ONLY Vercel, not other platforms)

---

## 🎯 Prerequisites

✅ Code sudah di-push ke GitHub  
✅ Environment variables sudah dikonfigurasi  
✅ Vercel account (FREE - sign up at vercel.com)

---

## 📋 Method 1: Vercel Dashboard (RECOMMENDED - Paling Mudah)

### Step 1: Sign Up / Login (1 menit)

1. Go to: **https://vercel.com**
2. Klik "Sign Up" (jika belum punya account)
3. Choose: **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access GitHub

---

### Step 2: Import Project (30 detik)

1. Go to: **https://vercel.com/new**
2. Klik "Import Git Repository"
3. Pilih account GitHub Anda
4. Cari "devLes" atau paste URL: `https://github.com/diptaz/devLes.git`
5. Klik "Import"

---

### Step 3: Configure Project (2 menit)

**Project Name:**
```
dev-les
```
(Atau nama lain yang Anda mau)

**Framework Preset:**
```
Vite
```
(Otomatis terdeteksi - jangan diubah!)

**Root Directory:**
```
./
```
(Default - jangan diubah!)

**Build & Output Settings:**
- Build Command: `npm run build` (otomatis)
- Output Directory: `dist` (otomatis)
- Install Command: `npm install` (otomatis)

**Biarkan semua default!** ✅

---

### Step 4: Environment Variables (2 menit) - PENTING!

Klik **"Environment Variables"** section, lalu tambahkan 3 variables:

#### Variable 1:
```
Name:  VITE_SUPABASE_URL
Value: https://hicojkfoytwflqrvvvbq.supabase.co
Environment: Production, Preview, Development (centang semua)
```

#### Variable 2:
```
Name:  VITE_SUPABASE_ANON_KEY
Value: sb_publishable_gdcLMwahLpzR-2jrqO2UKw_ixoUMHdP
Environment: Production, Preview, Development (centang semua)
```

#### Variable 3:
```
Name:  VITE_APP_ENV
Value: production
Environment: Production, Preview, Development (centang semua)
```

**Screenshot Environment Variables yang benar:**
```
┌───────────────────────────┬─────────────────────────────────────────┐
│ Name                      │ Value                                   │
├───────────────────────────┼─────────────────────────────────────────┤
│ VITE_SUPABASE_URL         │ https://hicojkfoytwflqrvvvbq.supabase.co│
│ VITE_SUPABASE_ANON_KEY    │ sb_publishable_gdcLMwahLpzR-2jrqO2UKw...│
│ VITE_APP_ENV              │ production                              │
└───────────────────────────┴─────────────────────────────────────────┘
```

---

### Step 5: Deploy! (2-3 menit)

1. Klik **"Deploy"** button
2. Tunggu build process (2-3 menit)
3. Watch the logs - should see:
   ```
   ✓ Building...
   ✓ Uploading...
   ✓ Deploying...
   ✓ Ready!
   ```

4. Setelah selesai, Anda akan dapat **Deployment URL**:
   ```
   https://dev-les.vercel.app
   ```
   (Atau URL lain yang di-generate Vercel)

---

### Step 6: Verify (1 menit)

1. **Open URL** (klik link di Vercel dashboard)

2. **Check styling:**
   - ✅ Blue pastel background
   - ✅ Navigation bar styled
   - ✅ Buttons colored
   - ✅ BUKAN plain white page!

3. **Check browser console (F12):**
   - ✅ No red errors
   - ✅ Supabase client initialized

4. **Test navigation:**
   - ✅ Click different pages
   - ✅ Everything loads

---

## ✅ Success Criteria

```
✅ Build completed successfully
✅ No build errors in logs
✅ Deployment URL accessible
✅ Website shows proper styling (blue pastel)
✅ No console errors
✅ Navigation works
✅ Can interact with UI
```

**If all checks pass:** 🎉 **BERHASIL!**

---

## 📋 Method 2: Vercel CLI (Alternative)

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

---

### Step 2: Login

```bash
vercel login
```

Follow prompts to login with GitHub.

---

### Step 3: Deploy

```bash
# Navigate to project directory
cd /path/to/devLes

# Deploy to production
vercel --prod
```

**Follow prompts:**
```
? Set up and deploy "~/devLes"? [Y/n] Y
? Which scope do you want to deploy to? Your Account
? Link to existing project? [y/N] N
? What's your project's name? dev-les
? In which directory is your code located? ./
```

**Deploy starts automatically!**

---

### Step 4: Add Environment Variables (CLI)

```bash
# Add Supabase URL
vercel env add VITE_SUPABASE_URL production
# Paste: https://hicojkfoytwflqrvvvbq.supabase.co

# Add Supabase Key
vercel env add VITE_SUPABASE_ANON_KEY production
# Paste: sb_publishable_gdcLMwahLpzR-2jrqO2UKw_ixoUMHdP

# Add App Env
vercel env add VITE_APP_ENV production
# Paste: production
```

---

### Step 5: Redeploy

```bash
vercel --prod
```

---

## 🆘 Troubleshooting

### Issue 1: Build Failed - Missing Dependencies

**Cause:** Dependencies tidak ter-install

**Solution:**
```bash
# Locally, verify build works:
npm install
npm run build

# If success, push to GitHub:
git add .
git commit -m "fix: Update dependencies"
git push

# Vercel will auto-redeploy
```

---

### Issue 2: Blank Page / White Screen

**Cause:** Environment variables tidak di-set

**Solution:**
1. Go to Vercel Dashboard
2. Select project "dev-les"
3. Go to **Settings** → **Environment Variables**
4. Add missing variables (see Step 4 above)
5. Go to **Deployments** → Latest → **Redeploy**

---

### Issue 3: 404 on Refresh

**Cause:** Missing rewrites configuration

**Solution:**
Sudah di-handle di `vercel.json`. Jika masih error:
1. Check `vercel.json` exists
2. Check rewrites configuration:
   ```json
   "rewrites": [
     { "source": "/(.*)", "destination": "/index.html" }
   ]
   ```
3. Redeploy

---

### Issue 4: Supabase Connection Error

**Cause:** Wrong environment variable names or values

**Solution:**
1. Verify environment variables di Vercel:
   - Name: `VITE_SUPABASE_URL` (bukan NEXT_PUBLIC_)
   - Name: `VITE_SUPABASE_ANON_KEY` (bukan PUBLISHABLE_KEY)
2. Check values are correct (no quotes, no spaces)
3. Redeploy

---

## 🔄 Auto-Deployment

**Good news:** Setelah initial setup, **every git push = auto-deploy!**

```bash
# Make changes
# ...edit files...

# Push to GitHub
git add .
git commit -m "feat: Add new feature"
git push

# Vercel detects push and auto-deploys! ✨
```

**No need to run deploy command again!**

---

## 📊 Monitoring & Analytics

### View Logs:
1. Vercel Dashboard → Project → **Deployments**
2. Click latest deployment
3. View **Build Logs** and **Function Logs**

### View Analytics:
1. Vercel Dashboard → Project → **Analytics**
2. See visitor stats, performance, etc.

### View Errors:
1. Vercel Dashboard → Project → **Monitoring**
2. See runtime errors

---

## 🎯 Custom Domain (Optional)

### Add Custom Domain:
1. Vercel Dashboard → Project → **Settings** → **Domains**
2. Add your domain (e.g., `lescatur.com`)
3. Update DNS records (Vercel provides instructions)
4. Wait for DNS propagation (5-10 minutes)
5. ✅ Done! Auto-SSL included!

---

## ✅ Deployment Checklist

```
Before Deploy:
- [✓] Code pushed to GitHub
- [✓] .env NOT in GitHub (protected)
- [✓] vercel.json exists
- [✓] package.json correct

During Deploy:
- [ ] Import project to Vercel
- [ ] Set framework to Vite
- [ ] Add environment variables (3 variables)
- [ ] Click Deploy
- [ ] Wait for build

After Deploy:
- [ ] Open deployment URL
- [ ] Verify styling loads
- [ ] Check console - no errors
- [ ] Test navigation
- [ ] Test authentication (optional)
- [ ] Share URL! 🎉
```

---

## 📝 Environment Variables Reference

**Format untuk Vercel Dashboard:**

| Name | Value | Apply to |
|------|-------|----------|
| `VITE_SUPABASE_URL` | `https://hicojkfoytwflqrvvvbq.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_gdcLMwahLpzR-2jrqO2UKw_ixoUMHdP` | Production, Preview, Development |
| `VITE_APP_ENV` | `production` | Production, Preview, Development |

**IMPORTANT:**
- ✅ Use `VITE_` prefix (NOT `NEXT_PUBLIC_`)
- ✅ No quotes around values
- ✅ No spaces
- ✅ Apply to all environments

---

## 🚀 Quick Deploy Commands

**ONE-LINE DEPLOY (using CLI):**
```bash
vercel --prod
```

**OR use Dashboard:** https://vercel.com/new

---

## 🎉 Expected Result

**After successful deployment:**

```
✓ Build Completed
✓ Deployment URL: https://dev-les.vercel.app

Your LesCatur platform is now live! 🚀

Features Available:
✓ User Authentication
✓ Course Browsing
✓ Shopping Cart
✓ Virtual Classes
✓ Chess Puzzles
✓ AI Trainer
✓ And more!

Share your URL:
https://dev-les.vercel.app
```

---

## 📞 Support

**Vercel Documentation:**
- Deploying Vite: https://vercel.com/docs/frameworks/vite
- Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables

**Need help?**
- Vercel Discord: https://vercel.com/discord
- Vercel Support: support@vercel.com

---

**Status:** ✅ **READY TO DEPLOY!**  
**Platform:** 🟢 **VERCEL ONLY**  
**Time:** ⏱️ **~10 minutes**

**FOLLOW THE STEPS ABOVE!** 🚀
