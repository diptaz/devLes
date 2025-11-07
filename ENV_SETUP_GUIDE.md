# 🔐 Environment Variables Setup Guide

Panduan lengkap untuk setup file `.env` di LesCatur project.

---

## 📋 Quick Summary

**What we created:**
- ✅ `.env.example` - Template (akan di-commit ke GitHub)
- ✅ `.env` - Your actual credentials (TIDAK di-commit)
- ✅ `.gitignore` - Melindungi `.env` dari ter-commit

**What you need to do:**
1. Create Supabase project (gratis)
2. Copy credentials to `.env`
3. Test connection
4. Start development

**Time required:** ~10 minutes

---

## 🚀 Step-by-Step Setup

### Step 1: Create Supabase Project (FREE)

#### 1.1 Sign Up / Login to Supabase

**Go to:** https://supabase.com

- Click "Start your project"
- Sign up with GitHub (recommended) or email
- It's **FREE** (no credit card required!)

#### 1.2 Create New Project

1. Click "New Project"
2. Fill in:
   - **Project Name:** `lescatur` (atau nama lain)
   - **Database Password:** Buat password kuat (simpan ini!)
   - **Region:** Southeast Asia (Singapore) - terdekat dengan Indonesia
   - **Pricing Plan:** Free (sudah cukup untuk development)
3. Click "Create new project"
4. Wait 1-2 minutes for setup

---

### Step 2: Get Your Credentials

#### 2.1 Navigate to API Settings

1. Di Supabase Dashboard, pilih project Anda
2. Klik **Settings** (icon ⚙️ di sidebar kiri)
3. Klik **API** di submenu

#### 2.2 Copy Credentials

Anda akan melihat:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```
☝️ Copy ini untuk `VITE_SUPABASE_URL`

**API Keys:**

Scroll ke bawah, Anda akan melihat 2 keys:

1. **`anon` `public`** 
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   ☝️ Copy ini untuk `VITE_SUPABASE_ANON_KEY`

2. **`service_role` `secret`**
   ⚠️ JANGAN pakai yang ini di frontend! (untuk server-side only)

---

### Step 3: Update .env File

#### 3.1 Open .env File

Open file `.env` di root project Anda dengan text editor.

#### 3.2 Replace Placeholders

**BEFORE:**
```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE
```

**AFTER (example - use YOUR credentials!):**
```bash
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTU4NTIwMCwiZXhwIjoxOTU1MTYxMjAwfQ.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### 3.3 Save File

**Important:**
- NO spaces around `=`
- NO quotes around values
- NO trailing spaces
- NO empty lines between variables (optional but cleaner)

---

### Step 4: Verify .env is Protected

#### 4.1 Check .gitignore

```bash
# Check if .env is in .gitignore
grep "\.env" .gitignore
```

**Should show:**
```
.env
.env.local
.env.development.local
...
```

#### 4.2 Verify .env is NOT Tracked

```bash
# Check if .env is tracked by git
git ls-files | grep .env
```

**Should return:** Nothing (empty)

**If it shows `.env`:**
```bash
# Remove from git tracking
git rm --cached .env
git commit -m "chore: Remove .env from version control"
```

---

### Step 5: Test Connection

#### 5.1 Install Dependencies

```bash
npm install
```

#### 5.2 Start Dev Server

```bash
npm run dev
```

#### 5.3 Test in Browser

Open: http://localhost:3000

**Test Supabase Connection:**

1. Open browser console (F12)
2. Paste this code:

```javascript
// Quick test
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
```

**Expected output:**
```
Supabase URL: https://your-project-id.supabase.co
Supabase Key exists: true
```

**If you see `undefined`:**
- ❌ .env file not loaded
- ❌ Variable name wrong
- ❌ Need to restart dev server

**Solution:**
```bash
# Stop dev server (Ctrl+C)
# Restart
npm run dev
```

---

## 🏗️ Setup Supabase Database Schema (Optional but Recommended)

### Option A: Use SQL Editor (Manual)

1. Go to Supabase Dashboard → **SQL Editor**
2. Click "New Query"
3. Copy schema from `BACKEND_SETUP_GUIDE.md`
4. Paste and run

### Option B: Use Migrations (Recommended)

See `BACKEND_SETUP_GUIDE.md` for detailed instructions.

### Quick Schema for Testing

**Minimal tables untuk testing:**

```sql
-- Users table (basic)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Test query
SELECT * FROM users;
```

---

## ✅ Verification Checklist

Before continuing development:

- [ ] `.env` file exists
- [ ] `.env.example` file exists  
- [ ] `.gitignore` includes `.env`
- [ ] `VITE_SUPABASE_URL` is set (not placeholder)
- [ ] `VITE_SUPABASE_ANON_KEY` is set (not placeholder)
- [ ] `git ls-files | grep .env` returns nothing
- [ ] `npm run dev` starts without errors
- [ ] Browser console shows Supabase URL correctly
- [ ] No errors in browser console about Supabase

---

## 🔒 Security Best Practices

### DO ✅

- ✅ Keep `.env` in `.gitignore`
- ✅ Use `.env.example` as template (commit this)
- ✅ Use environment variables for all secrets
- ✅ Use different credentials for dev/staging/prod
- ✅ Rotate keys regularly
- ✅ Enable Row Level Security (RLS) in Supabase
- ✅ Use `anon` key for frontend
- ✅ Use `service_role` key only for server-side

### DON'T ❌

- ❌ NEVER commit `.env` to GitHub
- ❌ NEVER share `.env` publicly
- ❌ NEVER hardcode secrets in code
- ❌ NEVER use `service_role` key in frontend
- ❌ NEVER push secrets to public repos
- ❌ NEVER share credentials in screenshots
- ❌ NEVER use production keys in development

---

## 🆘 Troubleshooting

### Issue 1: "Environment variables not loading"

**Symptoms:**
- `import.meta.env.VITE_SUPABASE_URL` is `undefined`
- Supabase client throws errors

**Solutions:**

```bash
# 1. Check file name is exactly .env (not .env.txt)
ls -la | grep .env

# 2. Check variable names start with VITE_
cat .env | grep VITE_

# 3. Restart dev server
# Ctrl+C to stop
npm run dev

# 4. Check Vite is reading .env
# In browser console:
console.log(import.meta.env)
```

---

### Issue 2: ".env is committed to GitHub"

**Symptoms:**
- You can see `.env` on GitHub
- Security warning

**Solutions:**

```bash
# 1. Remove from git tracking
git rm --cached .env

# 2. Add to .gitignore (should already be there)
echo ".env" >> .gitignore

# 3. Commit the removal
git add .gitignore
git commit -m "chore: Remove .env from version control"

# 4. Push
git push origin main

# 5. IMPORTANT: Rotate your credentials!
# Go to Supabase → Settings → API → Reset Keys
```

---

### Issue 3: "Invalid Supabase URL or Key"

**Symptoms:**
- Errors about invalid URL
- Authentication fails

**Solutions:**

```bash
# 1. Verify URL format
# Should be: https://xxxxx.supabase.co (with https://)

# 2. Verify key is complete
# Should be very long (starts with eyJ...)

# 3. Check for extra spaces
cat .env
# Should have no spaces around =

# 4. Try copying credentials again from Supabase
```

---

### Issue 4: "Can't connect to Supabase"

**Symptoms:**
- Network errors
- Connection timeout

**Solutions:**

```bash
# 1. Check internet connection

# 2. Verify Supabase project is active
# Go to Supabase dashboard
# Project should show "Active" status

# 3. Check if project is paused (free tier)
# Supabase pauses inactive projects after 1 week
# Click "Resume" if paused

# 4. Test URL directly
# Open: https://your-project-id.supabase.co
# Should show a response (not 404)
```

---

## 📚 Environment Variables Reference

### Required for Development

```bash
# Supabase (REQUIRED)
VITE_SUPABASE_URL=              # Your project URL
VITE_SUPABASE_ANON_KEY=         # Public/anon key

# App Settings
VITE_APP_ENV=development        # Current environment
VITE_APP_URL=http://localhost:3000  # App URL
VITE_DEBUG=true                 # Enable debug logs
```

### Optional for Production

```bash
# Production Supabase (use different project!)
VITE_SUPABASE_URL=              # Production URL
VITE_SUPABASE_ANON_KEY=         # Production key

# App Settings
VITE_APP_ENV=production
VITE_APP_URL=https://lescatur.vercel.app
VITE_DEBUG=false

# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Future Features (Optional)

See `.env.example` for full list including:
- Payment gateways (Midtrans, Xendit)
- Video conferencing (Agora, Daily)
- AI features (OpenAI)
- Email services (SendGrid)
- Monitoring (Sentry)

---

## 🌐 Deployment Environment Variables

### Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_ENV=production`
   - `VITE_APP_URL=https://your-domain.vercel.app`
5. Save
6. Redeploy

### Netlify

1. Go to Netlify Dashboard
2. Select your site
3. Go to Site settings → Environment variables
4. Add same variables as Vercel
5. Save
6. Trigger redeploy

---

## 🔄 Multiple Environments

### Development (.env)
```bash
VITE_SUPABASE_URL=https://dev-project.supabase.co
VITE_SUPABASE_ANON_KEY=dev-key-here
VITE_APP_ENV=development
```

### Staging (.env.staging)
```bash
VITE_SUPABASE_URL=https://staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=staging-key-here
VITE_APP_ENV=staging
```

### Production (.env.production)
```bash
VITE_SUPABASE_URL=https://prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=prod-key-here
VITE_APP_ENV=production
VITE_DEBUG=false
```

**Usage:**
```bash
# Development
npm run dev

# Build for staging
VITE_APP_ENV=staging npm run build

# Build for production
npm run build
```

---

## ✅ Final Checklist

Before committing to GitHub:

- [ ] `.env` has correct credentials
- [ ] `.env.example` is up to date
- [ ] `.gitignore` includes `.env`
- [ ] Tested locally (npm run dev works)
- [ ] Supabase connection works
- [ ] No secrets in code
- [ ] `.env` is NOT in git (`git ls-files | grep .env` = empty)

Before deploying to production:

- [ ] Different Supabase project for production
- [ ] Environment variables set in deployment platform
- [ ] `VITE_DEBUG=false` in production
- [ ] Analytics configured
- [ ] Error monitoring setup
- [ ] Secrets rotated regularly

---

## 📞 Need Help?

### Check These First:

1. **Variable not loading?** 
   - Restart dev server
   - Check variable name starts with `VITE_`

2. **Connection failing?**
   - Verify credentials in Supabase dashboard
   - Check project is active (not paused)

3. **Security concerns?**
   - Verify `.env` in `.gitignore`
   - Verify `.env` not on GitHub
   - Rotate keys if exposed

### Resources:

- Supabase Docs: https://supabase.com/docs
- Vite Env Docs: https://vitejs.dev/guide/env-and-mode.html
- Project Docs: `BACKEND_SETUP_GUIDE.md`

---

**Created:** November 7, 2024  
**Status:** ✅ Ready to Use

**Happy Coding! 🔐🚀**
