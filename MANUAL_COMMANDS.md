# Manual Deploy Commands - No Emoji!

**Untuk Windows PowerShell yang tidak support emoji**

---

## Copy-Paste Commands Ini Satu Per Satu:

### Step 1: Navigate ke folder yang benar

```powershell
# Ganti path ini sesuai lokasi folder src Anda!
cd "D:\a\src"

# Verify Anda di tempat yang benar
dir package.json
```

**Harus muncul `package.json`!**

---

### Step 2: Install Dependencies

```powershell
npm install
```

**Wait sampai selesai** (2-3 menit)

---

### Step 3: Git Init

```powershell
git init
```

---

### Step 4: Add All Files

```powershell
git add .
```

---

### Step 5: Check Status (PENTING!)

```powershell
git status
```

**VERIFY:** File `.env` **TIDAK ADA** di list!  
Jika ada, jalankan:
```powershell
git reset HEAD .env
git rm --cached .env
```

---

### Step 6: Commit

```powershell
git commit -m "feat: Initial commit - LesCatur platform with Supabase integration"
```

---

### Step 7: Set Branch to Main

```powershell
git branch -M main
```

---

### Step 8: Add Remote

```powershell
git remote add origin https://github.com/diptaz/devLes.git
```

---

### Step 9: Push to GitHub!

```powershell
git push -u origin main
```

**DONE!** Code sudah di GitHub!

---

## ONE-LINE COMMAND (Copy-Paste Semua Sekaligus!)

**Setelah `npm install` selesai, copy-paste ini:**

```powershell
git init; git add .; git status; git commit -m "feat: Initial commit - LesCatur platform"; git branch -M main; git remote add origin https://github.com/diptaz/devLes.git; git push -u origin main
```

---

## Troubleshooting

### Error: "fatal: not a git repository"
**Solution:** Jalankan `git init` dulu

### Error: "remote origin already exists"
**Solution:** Skip step 8, langsung ke step 9

### Error: "nothing to commit"
**Solution:** 
```powershell
git add .
git commit -m "feat: Initial commit"
```

### Error: ".env appears in git status"
**Solution:**
```powershell
git reset HEAD .env
git rm --cached .env
git add .
git status
# .env should NOT appear now
```

---

## After Push Success

**Go to:** https://github.com/diptaz/devLes

**Verify:**
- Files are there
- `.env` is NOT visible (protected!)

---

## Next: Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. **Go to:** https://vercel.com/new

2. **Import Project:**
   - Click "Import Git Repository"
   - Select: `https://github.com/diptaz/devLes`

3. **Configure:**
   - Framework: Vite (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)

4. **Add Environment Variables:**

   ```
   Name: VITE_SUPABASE_URL
   Value: https://hicojkfoytwflqrvvvbq.supabase.co
   Apply to: Production, Preview, Development
   ```

   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: sb_publishable_gdcLMwahLpzR-2jrqO2UKw_ixoUMHdP
   Apply to: Production, Preview, Development
   ```

   ```
   Name: VITE_APP_ENV
   Value: production
   Apply to: Production, Preview, Development
   ```

5. **Click "Deploy"**

6. **Wait 2-3 minutes**

7. **DONE!** Website live!

---

### Option 2: Vercel CLI

```powershell
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Then add environment variables via Vercel Dashboard.

---

## Quick Reference

**Your GitHub Repo:**
```
https://github.com/diptaz/devLes
```

**Environment Variables:**
```
VITE_SUPABASE_URL=https://hicojkfoytwflqrvvvbq.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_gdcLMwahLpzR-2jrqO2UKw_ixoUMHdP
VITE_APP_ENV=production
```

**Vercel:**
```
https://vercel.com/new
```

---

## Timeline

```
npm install:          2-3 minutes
Git commands:         1 minute
Git push:             1-2 minutes
Vercel setup:         2 minutes
Vercel build:         2-3 minutes
-----------------------------------
Total:                8-11 minutes
```

---

## Success Checklist

```
[✓] npm install completed
[✓] git init
[✓] git add .
[✓] git status (no .env!)
[✓] git commit
[✓] git branch -M main
[✓] git remote add
[✓] git push
[✓] Code visible on GitHub
[✓] .env NOT visible on GitHub
[✓] Deploy to Vercel
[✓] Add environment variables
[✓] Build succeeds
[✓] Website live!
```

---

**CURRENT PATH:** `D:\a\src`

**READY TO RUN!**
