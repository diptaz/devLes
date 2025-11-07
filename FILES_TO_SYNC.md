# 📋 Files to Sync with GitHub

## 🔧 Critical Configuration Files (MUST be correct)

### 1. **postcss.config.js**
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // ← MUST be this, not 'tailwindcss: {}'
    autoprefixer: {},
  },
}
```

**Check:** `cat postcss.config.js`

---

### 2. **package.json** (devDependencies section)
```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",  // ← MUST have this
    "tailwindcss": "^4.0.0",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.17",
    ...
  }
}
```

**Check:** `grep "@tailwindcss/postcss" package.json`

---

### 3. **styles/globals.css** (first line)
```css
@import "tailwindcss";  // ← MUST be first line

@custom-variant dark (&:is(.dark *));
...
```

**Check:** `head -n 1 styles/globals.css`

---

### 4. **vite.config.ts** (server ports)
```ts
server: {
  port: 5173,  // ← Should be 5173, not 3000
  host: true,
},
preview: {
  port: 4173,  // ← Should be 4173
  host: true,
},
```

**Check:** `grep -A 3 "server:" vite.config.ts`

---

## 📝 New Documentation Files

These should be uploaded to GitHub:

- [ ] `QUICK_FIX.md` - Quick CSS fix guide
- [ ] `CSS_FIX_GUIDE.md` - Detailed CSS troubleshooting
- [ ] `CSS_FIX_SUMMARY.md` - What was fixed and why
- [ ] `DOCUMENTATION_INDEX.md` - All docs index
- [ ] `CHANGELOG.md` - Version history
- [ ] `FILES_TO_SYNC.md` - This file!

---

## 🔧 New Script Files

- [ ] `fix-css.sh` - Bash automation script (chmod +x required)
- [ ] `fix-css.ps1` - PowerShell automation script

---

## ⚙️ Configuration Files to Verify

- [ ] `.gitignore` - You edited manually ✓
- [ ] `.npmrc` - You edited manually ✓
- [ ] `.env.example` - Should exist
- [ ] `vercel.json` - Should exist
- [ ] `netlify.toml` - Should exist
- [ ] `tsconfig.json` - Should exist

---

## 🚫 Files that Should NOT be in GitHub

Make sure these are in `.gitignore`:

- [ ] `.env` - Contains secrets!
- [ ] `node_modules/` - Dependencies folder
- [ ] `.vite/` - Vite cache
- [ ] `dist/` - Build output
- [ ] `package-lock.json` - Optional (can be ignored)

---

## ✅ Verification Commands

### Check if postcss.config.js is correct:
```bash
grep -o "@tailwindcss/postcss" postcss.config.js
# Should return: @tailwindcss/postcss
```

### Check if package.json has the dependency:
```bash
grep "@tailwindcss/postcss" package.json
# Should return: "@tailwindcss/postcss": "^4.0.0",
```

### Check if globals.css imports Tailwind:
```bash
head -n 1 styles/globals.css
# Should return: @import "tailwindcss";
```

### Check git status:
```bash
git status
# Should show which files are modified
```

### Check differences with GitHub:
```bash
git fetch origin
git diff main origin/main
# Shows what's different between local and GitHub
```

---

## 🔄 Sync Steps

### If GitHub is BEHIND (you have latest):
```bash
# 1. Add all changes
git add .

# 2. Commit
git commit -m "fix: Tailwind CSS v4 configuration

- Updated postcss.config.js to use @tailwindcss/postcss
- Added @tailwindcss/postcss to package.json
- Added comprehensive CSS fix documentation
- Added automation scripts"

# 3. Push
git push origin main
```

### If GitHub is AHEAD (you're behind):
```bash
# 1. Pull latest
git pull origin main

# 2. Check for conflicts
git status

# 3. Resolve conflicts if any
# Edit conflicting files

# 4. Add and commit
git add .
git commit -m "merge: Sync with remote"

# 5. Push
git push origin main
```

---

## 📦 After Syncing

```bash
# Clean install
rm -rf node_modules .vite package-lock.json
npm install

# Test locally
npm run dev
# Open: http://localhost:5173

# Build test
npm run build

# If all good, deploy!
```

---

## 🎯 Quick Verification Checklist

Before pushing to GitHub:

- [ ] `postcss.config.js` has `'@tailwindcss/postcss': {}`
- [ ] `package.json` has `"@tailwindcss/postcss": "^4.0.0"`
- [ ] `styles/globals.css` starts with `@import "tailwindcss";`
- [ ] `.env` is NOT committed (in .gitignore)
- [ ] `node_modules` is NOT committed (in .gitignore)
- [ ] All documentation files are included
- [ ] Scripts (fix-css.sh, fix-css.ps1) are included
- [ ] `npm install` works locally
- [ ] `npm run dev` shows styled website
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)

---

## 🆘 If Sync Fails

### Conflict Resolution:
```bash
# 1. Pull and see conflicts
git pull origin main

# 2. Check which files conflict
git status

# 3. For each conflict:
# - Open file
# - Look for <<<<<<< HEAD markers
# - Choose correct version
# - Remove markers

# 4. Add resolved files
git add <file>

# 5. Continue
git commit -m "merge: Resolved conflicts"
git push origin main
```

### Reset to GitHub Version (Nuclear Option):
```bash
# ⚠️ WARNING: This discards ALL local changes!
git fetch origin
git reset --hard origin/main
```

### Reset GitHub to Local (Nuclear Option):
```bash
# ⚠️ WARNING: This overwrites GitHub with local!
git push -f origin main
```

---

**Last Updated:** November 7, 2024
**Status:** Ready to Sync
