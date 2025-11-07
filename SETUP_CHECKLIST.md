# ✅ LesCatur Setup Checklist

Complete this checklist to ensure your project is ready for development.

---

## 🎯 Phase 1: Environment Setup (REQUIRED)

### Step 1: Create Supabase Account
- [ ] Go to https://supabase.com
- [ ] Sign up (email or GitHub)
- [ ] Verify email (if required)
- [ ] Login to dashboard

**Time:** 2 minutes

---

### Step 2: Create Supabase Project
- [ ] Click "New Project"
- [ ] Enter project name: `lescatur` (or your choice)
- [ ] Create strong database password (save it!)
- [ ] Select region: **Southeast Asia (Singapore)**
- [ ] Select plan: **Free**
- [ ] Click "Create new project"
- [ ] Wait 1-2 minutes for setup

**Time:** 3 minutes

---

### Step 3: Get Supabase Credentials
- [ ] Go to Settings (⚙️ icon in sidebar)
- [ ] Click "API" in submenu
- [ ] Find and copy **Project URL**
  ```
  Example: https://abcdefghijk.supabase.co
  ```
- [ ] Find and copy **anon / public key** (the long one starting with `eyJ...`)
- [ ] Keep these somewhere safe temporarily

**Time:** 1 minute

---

### Step 4: Update .env File
- [ ] Open `.env` file in project root
- [ ] Find line: `VITE_SUPABASE_URL=...`
- [ ] Paste your Project URL
- [ ] Find line: `VITE_SUPABASE_ANON_KEY=...`
- [ ] Paste your anon key
- [ ] Save file
- [ ] **DO NOT** add quotes around values
- [ ] **DO NOT** add spaces around `=`

**Example:**
```bash
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTU4NTIwMCwiZXhwIjoxOTU1MTYxMjAwfQ.xxxxx
```

**Time:** 1 minute

---

### Step 5: Verify Security
- [ ] Check `.env` is in `.gitignore`:
  ```bash
  grep "\.env" .gitignore
  ```
  Should show: `.env`

- [ ] Verify `.env` is NOT tracked by Git:
  ```bash
  git ls-files | grep .env
  ```
  Should return: nothing (or only `.env.example`)

- [ ] If `.env` is tracked, remove it:
  ```bash
  git rm --cached .env
  git commit -m "chore: Remove .env from tracking"
  ```

**Time:** 2 minutes

---

## 🔧 Phase 2: CSS & Dependencies (REQUIRED)

### Step 6: Verify Configuration Files

- [ ] Check `postcss.config.js`:
  ```bash
  grep "@tailwindcss/postcss" postcss.config.js
  ```
  Should contain: `'@tailwindcss/postcss': {}`

- [ ] Check `package.json`:
  ```bash
  grep "@tailwindcss/postcss" package.json
  ```
  Should contain: `"@tailwindcss/postcss": "^4.0.0"`

- [ ] Check `styles/globals.css`:
  ```bash
  head -n 1 styles/globals.css
  ```
  Should be: `@import "tailwindcss";`

**If any check fails:**
```bash
# Windows
.\fix-css.ps1

# Mac/Linux
chmod +x fix-css.sh
./fix-css.sh
```

**Time:** 2 minutes

---

### Step 7: Install Dependencies

- [ ] Clean previous installations:
  ```bash
  # Windows PowerShell
  Remove-Item -Recurse -Force node_modules, .vite, package-lock.json -ErrorAction SilentlyContinue
  
  # Mac/Linux
  rm -rf node_modules .vite package-lock.json
  ```

- [ ] Install packages:
  ```bash
  npm install
  ```

- [ ] Verify @tailwindcss/postcss installed:
  ```bash
  # Windows
  dir node_modules\@tailwindcss\postcss
  
  # Mac/Linux
  ls node_modules/@tailwindcss/postcss
  ```
  Should show the package directory

**Time:** 3-5 minutes (depending on internet speed)

---

## 🧪 Phase 3: Testing (REQUIRED)

### Step 8: Test Development Server

- [ ] Start dev server:
  ```bash
  npm run dev
  ```

- [ ] Check terminal output:
  ```
  VITE v5.x.x  ready in xxx ms
  
  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ```

- [ ] Server starts without errors
- [ ] No red errors in terminal

**Time:** 1 minute

---

### Step 9: Test in Browser

- [ ] Open http://localhost:3000
- [ ] Website loads successfully
- [ ] See blue pastel background (NOT white)
- [ ] Navigation bar is styled
- [ ] Buttons have colors and hover effects
- [ ] Cards have shadows and rounded corners
- [ ] Fonts look good (NOT Times New Roman)
- [ ] Layout is properly spaced

**Time:** 2 minutes

---

### Step 10: Test Browser Console

- [ ] Press F12 to open DevTools
- [ ] Go to Console tab
- [ ] No red errors
- [ ] No Tailwind/CSS errors
- [ ] No Supabase connection errors

- [ ] Test environment variables:
  ```javascript
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
  ```

- [ ] Should show your Supabase URL
- [ ] Should show `true` for key exists

**Time:** 2 minutes

---

### Step 11: Test Build

- [ ] Build for production:
  ```bash
  npm run build
  ```

- [ ] Build completes without errors
- [ ] `dist` folder is created
- [ ] No TypeScript errors
- [ ] No build warnings (or only minor ones)

- [ ] Preview production build:
  ```bash
  npm run preview
  ```

- [ ] Opens at http://localhost:4173
- [ ] Website works correctly

**Time:** 3 minutes

---

## 📝 Phase 4: Git & GitHub (REQUIRED)

### Step 12: Verify Git Status

- [ ] Check git status:
  ```bash
  git status
  ```

- [ ] `.env` should NOT appear (protected by .gitignore)
- [ ] Only see:
  - `.env.example`
  - `.gitignore`
  - Documentation files (`.md`)
  - Configuration files
  - Source code

**Time:** 1 minute

---

### Step 13: Commit Changes

- [ ] Add all changes:
  ```bash
  git add .
  ```

- [ ] Verify what's being committed:
  ```bash
  git status
  ```

- [ ] **VERIFY:** `.env` is NOT in the list!

- [ ] Commit with message:
  ```bash
  git commit -m "feat: Add environment setup and CSS configuration
  
  - Added .env.example template
  - Added .gitignore to protect secrets
  - Updated PostCSS for Tailwind v4
  - Added comprehensive documentation
  - Added automation scripts"
  ```

**Time:** 2 minutes

---

### Step 14: Push to GitHub

- [ ] Push to GitHub:
  ```bash
  git push origin main
  ```

- [ ] Go to https://github.com/diptaz/website-lescatur

- [ ] Verify new files are there:
  - `.env.example` ✅
  - `.gitignore` ✅
  - `ENV_SETUP_GUIDE.md` ✅
  - Documentation files ✅
  - Scripts (`.sh`, `.ps1`) ✅

- [ ] **VERIFY:** `.env` is NOT on GitHub ✅

**Time:** 2 minutes

---

## 🚀 Phase 5: Optional Enhancements

### Step 15: Setup Database Schema (Optional)

- [ ] Read `BACKEND_SETUP_GUIDE.md`
- [ ] Go to Supabase Dashboard → SQL Editor
- [ ] Run schema migrations
- [ ] Create tables:
  - users
  - courses
  - bookings
  - subscriptions
  - etc.
- [ ] Enable Row Level Security (RLS)
- [ ] Test queries

**Time:** 15-30 minutes

---

### Step 16: Deploy to Vercel (Optional)

- [ ] Read `DEPLOYMENT_GUIDE.md`
- [ ] Go to https://vercel.com
- [ ] Import GitHub repository
- [ ] Add environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_APP_ENV=production`
- [ ] Deploy
- [ ] Test production URL

**Time:** 10-15 minutes

---

### Step 17: Test Authentication (Optional)

- [ ] Open website
- [ ] Click Sign Up
- [ ] Create test account
- [ ] Check Supabase Dashboard → Authentication
- [ ] See new user
- [ ] Test login
- [ ] Test logout

**Time:** 5 minutes

---

## 📋 Final Verification Checklist

### Environment:
- [ ] `.env` has real Supabase credentials
- [ ] `.env` is in `.gitignore`
- [ ] `.env` is NOT on GitHub
- [ ] `.env.example` IS on GitHub

### CSS & Dependencies:
- [ ] `postcss.config.js` uses `@tailwindcss/postcss`
- [ ] `package.json` has `@tailwindcss/postcss` dependency
- [ ] `styles/globals.css` imports Tailwind
- [ ] `node_modules` is installed
- [ ] Website shows blue pastel styling

### Testing:
- [ ] `npm run dev` works
- [ ] Website displays correctly in browser
- [ ] No console errors
- [ ] `npm run build` succeeds
- [ ] `npm run preview` works

### Git & GitHub:
- [ ] All changes committed
- [ ] Pushed to GitHub
- [ ] `.env` not on GitHub
- [ ] Documentation files on GitHub

### Optional:
- [ ] Database schema setup
- [ ] Deployed to Vercel/Netlify
- [ ] Authentication tested
- [ ] Team can clone and run

---

## 🎓 Next Steps

After completing this checklist:

### For Development:
1. Read `ARCHITECTURE_OVERVIEW.md`
2. Explore components in `components/`
3. Read `BACKEND_API_DOCUMENTATION.md`
4. Start building features!

### For Deployment:
1. Read `DEPLOYMENT_GUIDE.md`
2. Setup Vercel account
3. Configure environment variables
4. Deploy to production

### For Team Collaboration:
1. Share repository URL
2. Share `.env.example`
3. Team members follow this checklist
4. Everyone has working environment

---

## 📊 Time Summary

**Minimum setup (required):**
- Phase 1 (Environment): ~10 minutes
- Phase 2 (CSS): ~10 minutes  
- Phase 3 (Testing): ~10 minutes
- Phase 4 (Git): ~5 minutes

**Total:** ~35 minutes

**With optional enhancements:**
- Phase 5 (Database + Deploy): +30-60 minutes

**Grand Total:** ~1-2 hours for complete setup

---

## 🆘 If Something Goes Wrong

### CSS not loading?
→ Run `fix-css.ps1` or `fix-css.sh`
→ Read `CSS_FIX_GUIDE.md`

### Environment variables not working?
→ Read `ENV_SETUP_GUIDE.md`
→ Check `ENV_QUICK_REFERENCE.md`

### Git issues?
→ Read `GITHUB_SYNC_GUIDE.md`

### Build errors?
→ Run `npm run type-check`
→ Run `npm run lint`

### General help?
→ Read `DOCUMENTATION_INDEX.md`
→ Check browser console (F12)
→ Check terminal errors

---

## ✅ Success Criteria

You're done when:

1. ✅ All items in this checklist are checked
2. ✅ `npm run dev` shows styled website
3. ✅ No errors in browser console
4. ✅ `npm run build` succeeds
5. ✅ Code is on GitHub
6. ✅ `.env` is protected

**Congratulations! Your LesCatur project is ready! 🎉**

---

**Version:** 1.0.1  
**Last Updated:** November 7, 2024  
**Status:** ✅ Complete

**Happy Building! 🚀♟️**
