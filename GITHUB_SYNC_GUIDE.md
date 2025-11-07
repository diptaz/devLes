# 🔄 GitHub Sync Guide - LesCatur

Panduan lengkap untuk sinkronisasi code dengan GitHub repository.

**Your GitHub Repo:** https://github.com/diptaz/website-lescatur.git

---

## 🎯 Quick Action - Do This Now!

### Step 1: Check Configuration

**Windows:**
```powershell
.\check-config.ps1
```

**Mac/Linux:**
```bash
chmod +x check-config.sh
./check-config.sh
```

This will verify all your configuration files are correct.

---

### Step 2: Download Critical Files from Make

Download these files from Figma Make and **replace** your local versions:

#### Must-have files:
1. **`postcss.config.js`** - PostCSS configuration
2. **`package.json`** - Dependencies (check devDependencies)
3. **`styles/globals.css`** - CSS with Tailwind import

#### New documentation files:
4. `QUICK_FIX.md`
5. `CSS_FIX_GUIDE.md`
6. `CSS_FIX_SUMMARY.md`
7. `DOCUMENTATION_INDEX.md`
8. `CHANGELOG.md`
9. `FILES_TO_SYNC.md`
10. `GITHUB_SYNC_GUIDE.md` (this file)

#### New script files:
11. `fix-css.sh`
12. `fix-css.ps1`
13. `check-config.sh`
14. `check-config.ps1`

---

### Step 3: Verify Files Locally

```bash
# Check postcss.config.js
cat postcss.config.js
# Should have: '@tailwindcss/postcss': {}

# Check package.json
grep "@tailwindcss/postcss" package.json
# Should return: "@tailwindcss/postcss": "^4.0.0",

# Check globals.css
head -n 1 styles/globals.css
# Should return: @import "tailwindcss";
```

---

### Step 4: Install Dependencies

```bash
# Clean install
rm -rf node_modules .vite package-lock.json

# Install
npm install

# Verify @tailwindcss/postcss is installed
ls node_modules/@tailwindcss/postcss
# Should show the package directory
```

---

### Step 5: Test Locally

```bash
# Start dev server
npm run dev
```

Open `http://localhost:5173` in browser.

**Verify:**
- ✅ Blue pastel background (#bfdbfe)
- ✅ Styled navigation and cards
- ✅ Proper fonts and spacing
- ✅ No console errors (F12)

If CSS still not loading, run:
```bash
.\fix-css.ps1  # Windows
./fix-css.sh   # Mac/Linux
```

---

### Step 6: Commit to Git

```bash
# Check what changed
git status

# See differences
git diff postcss.config.js
git diff package.json
git diff styles/globals.css

# Add all changes
git add .

# Commit with descriptive message
git commit -m "fix: Update Tailwind CSS v4 configuration

- Updated postcss.config.js to use @tailwindcss/postcss plugin
- Added @tailwindcss/postcss to package.json devDependencies
- Ensured globals.css imports tailwindcss correctly
- Added comprehensive documentation (CSS_FIX_GUIDE, etc.)
- Added automation scripts (fix-css.sh, fix-css.ps1, check-config)
- Updated CHANGELOG.md to v1.0.1

Fixes CSS not loading issue. All styling now works correctly with Tailwind v4."
```

---

### Step 7: Push to GitHub

```bash
# Push to main branch
git push origin main
```

If you get an error about diverged branches:
```bash
# Pull first (with merge)
git pull origin main --no-rebase

# Or pull with rebase (cleaner history)
git pull origin main --rebase

# Then push
git push origin main
```

---

### Step 8: Verify on GitHub

1. Go to: https://github.com/diptaz/website-lescatur
2. Check that new files are there:
   - `CSS_FIX_GUIDE.md`
   - `fix-css.ps1`
   - `fix-css.sh`
   - Updated `postcss.config.js`
   - Updated `package.json`
3. Check the commit message appears
4. Verify `.env` is NOT there (security!)

---

## 🔍 Detailed Sync Scenarios

### Scenario A: Your Local is Ahead

**Situation:** You have changes locally that GitHub doesn't have.

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your commit message"

# Push
git push origin main
```

---

### Scenario B: GitHub is Ahead

**Situation:** Someone else pushed to GitHub, or you made changes on GitHub.

```bash
# Pull latest changes
git pull origin main

# If there are conflicts:
# 1. Open conflicting files
# 2. Look for <<<<<<< HEAD markers
# 3. Choose which version to keep
# 4. Remove conflict markers
# 5. Save file

# After resolving conflicts:
git add .
git commit -m "merge: Resolved conflicts"
git push origin main
```

---

### Scenario C: Both Have Changes (Merge Conflict)

**Situation:** You and GitHub both have different changes.

```bash
# Try to pull
git pull origin main
# Git will tell you there are conflicts

# Check which files conflict
git status
# Files with "both modified" are conflicts

# Fix each conflict:
# 1. Open the file
# 2. Find conflict markers:
#    <<<<<<< HEAD
#    Your changes
#    =======
#    GitHub changes
#    >>>>>>> origin/main
# 3. Choose which to keep (or keep both)
# 4. Delete the markers
# 5. Save

# Example conflict in postcss.config.js:
# <<<<<<< HEAD
# export default {
#   plugins: {
#     '@tailwindcss/postcss': {},  // Your version (CORRECT!)
#     autoprefixer: {},
#   },
# }
# =======
# export default {
#   plugins: {
#     tailwindcss: {},  // GitHub version (WRONG!)
#     autoprefixer: {},
#   },
# }
# >>>>>>> origin/main
#
# KEEP YOUR VERSION (the one with @tailwindcss/postcss)

# After fixing all conflicts:
git add .
git commit -m "merge: Resolved merge conflicts"
git push origin main
```

---

## 🚨 Emergency Commands

### Reset to GitHub Version (Discard Local Changes)

**⚠️ WARNING: This will DELETE all your local changes!**

```bash
# Fetch latest from GitHub
git fetch origin

# Reset to GitHub version
git reset --hard origin/main

# Then reinstall
npm install
```

---

### Force Push Local to GitHub (Overwrite GitHub)

**⚠️ WARNING: This will DELETE changes on GitHub!**

```bash
# Force push
git push -f origin main
```

Only use this if you're SURE your local version is correct!

---

### Undo Last Commit (Keep Changes)

```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Edit files as needed
git add .
git commit -m "New commit message"
git push origin main
```

---

### Undo Last Commit (Discard Changes)

```bash
# Undo last commit and discard changes
git reset --hard HEAD~1

# Force push to update GitHub
git push -f origin main
```

---

## 📋 Pre-Push Checklist

Before pushing to GitHub, verify:

- [ ] `.\check-config.ps1` passes all checks
- [ ] `npm install` completed without errors
- [ ] `npm run dev` works and shows styled website
- [ ] `npm run build` completes successfully
- [ ] `npm run type-check` has no TypeScript errors
- [ ] `npm run lint` has no linting errors
- [ ] `.env` is in `.gitignore` (NOT pushed to GitHub!)
- [ ] All sensitive data is excluded
- [ ] Commit message is descriptive
- [ ] You've tested the changes locally

---

## 🔐 Security Checklist

**NEVER commit these to GitHub:**

- [ ] `.env` file (contains secrets!)
- [ ] Any file with API keys
- [ ] Passwords or credentials
- [ ] `node_modules/` directory
- [ ] Build outputs (`dist/`)
- [ ] Personal data or PII

**Verify `.gitignore` includes:**
```
.env
.env.local
.env.*.local
node_modules
dist
.vite
```

---

## 🎯 Post-Push Actions

After pushing to GitHub:

### 1. Verify Deployment (if using Vercel)

If connected to Vercel:
- Vercel will auto-detect push
- Check Vercel dashboard for deployment status
- Monitor build logs for errors

### 2. Test Production Build

```bash
npm run build
npm run preview
```

Open `http://localhost:4173` and verify.

### 3. Update Team/Collaborators

If working with a team:
- Notify them of changes
- Share commit message
- Tell them to pull latest: `git pull origin main`

---

## 📚 Git Command Reference

### Basic Commands

```bash
# Check status
git status

# Check differences
git diff

# Add all changes
git add .

# Commit
git commit -m "message"

# Push
git push origin main

# Pull
git pull origin main

# Check commit history
git log --oneline

# Check remote URL
git remote -v
```

### Branch Commands

```bash
# Create new branch
git checkout -b feature-name

# Switch branch
git checkout main

# List branches
git branch

# Delete branch
git branch -d feature-name
```

### Advanced Commands

```bash
# Fetch without merging
git fetch origin

# See difference with remote
git diff main origin/main

# Stash changes (temporary save)
git stash
git stash pop

# Amend last commit
git commit --amend -m "new message"

# Show commit details
git show <commit-hash>
```

---

## 🆘 Troubleshooting

### "Permission denied (publickey)" Error

**Solution:**
```bash
# Check SSH keys
ls -la ~/.ssh

# Generate new SSH key if needed
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key and add to GitHub
cat ~/.ssh/id_ed25519.pub
# Go to GitHub → Settings → SSH Keys → Add Key
```

Or use HTTPS instead:
```bash
git remote set-url origin https://github.com/diptaz/website-lescatur.git
```

---

### "fatal: not a git repository" Error

**Solution:**
```bash
# Initialize git
git init

# Add remote
git remote add origin https://github.com/diptaz/website-lescatur.git

# Pull
git pull origin main

# Set upstream
git branch --set-upstream-to=origin/main main
```

---

### "refusing to merge unrelated histories" Error

**Solution:**
```bash
git pull origin main --allow-unrelated-histories
```

---

### "Your branch is behind" Warning

**Solution:**
```bash
# Pull latest changes
git pull origin main

# Or if you want to overwrite:
git pull origin main --rebase
```

---

### "Your branch is ahead" Warning

**Solution:**
```bash
# Push your changes
git push origin main
```

---

## ✅ Success Indicators

You've successfully synced when:

1. ✅ `git status` shows "nothing to commit, working tree clean"
2. ✅ GitHub repository shows your latest commit
3. ✅ All new files are visible on GitHub
4. ✅ `.env` is NOT on GitHub
5. ✅ Team members can pull and run successfully
6. ✅ Vercel deployment succeeds (if connected)

---

## 📞 Need Help?

### Check Documentation
- `CSS_FIX_GUIDE.md` - CSS issues
- `DEPLOYMENT_GUIDE.md` - Deployment issues
- `DOCUMENTATION_INDEX.md` - All docs

### Check Configuration
```bash
.\check-config.ps1  # Windows
./check-config.sh   # Mac/Linux
```

### Common Issues
- CSS not loading → Run `fix-css.ps1` / `fix-css.sh`
- Git conflicts → See "Scenario C" above
- Permission errors → Check SSH keys section
- Build errors → Run `npm run type-check`

---

**Repository:** https://github.com/diptaz/website-lescatur.git  
**Version:** 1.0.1  
**Last Updated:** November 7, 2024

**Happy Syncing! 🚀**
