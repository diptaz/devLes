# ⚡ Quick Fix - CSS Not Loading

## 🚨 Problem
Website shows plain HTML without styling (berantakan).

## ⚡ Quick Solution

### Windows (PowerShell):
```powershell
.\fix-css.ps1
```

### Mac/Linux:
```bash
chmod +x fix-css.sh
./fix-css.sh
```

### Manual (All Systems):
```bash
# 1. Clean
rm -rf node_modules .vite package-lock.json

# 2. Install
npm install

# 3. Start
npm run dev
```

---

## ✅ What Was Fixed

### 1. `postcss.config.js`
```diff
- tailwindcss: {},
+ '@tailwindcss/postcss': {},
```

### 2. `package.json`
Added:
```json
"@tailwindcss/postcss": "^4.0.0"
```

### 3. `styles/globals.css`
Ensure first line:
```css
@import "tailwindcss";
```

---

## 🧪 Verify It Works

After running fix script:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser:**
   ```
   http://localhost:5173
   ```

3. **Check styling:**
   - ✅ Blue pastel background
   - ✅ Styled buttons and cards
   - ✅ Proper fonts and spacing

4. **Browser console (F12):**
   ```javascript
   getComputedStyle(document.body).backgroundColor
   // Should return: "rgb(191, 219, 254)" (blue pastel)
   ```

---

## 🚀 Deploy to Vercel

After fixing locally:

```bash
# 1. Commit changes
git add .
git commit -m "fix: Tailwind v4 PostCSS configuration"

# 2. Push to GitHub
git push origin main

# 3. Vercel will auto-deploy
# Or manually: npm run deploy:vercel
```

---

## 📚 Full Guide
See `CSS_FIX_GUIDE.md` for detailed troubleshooting.

---

## 💡 Why This Happens

**Tailwind v4** changed how PostCSS plugin works:

- ❌ Old (v3): `tailwindcss: {}`
- ✅ New (v4): `'@tailwindcss/postcss': {}`

Without the correct plugin, Tailwind CSS **won't process** and your styles won't load.

---

## ⏱️ Time to Fix
- Automated script: **2-5 minutes**
- Manual steps: **3-7 minutes**

---

**Last Updated:** November 2024
**LesCatur Version:** 1.0.0
