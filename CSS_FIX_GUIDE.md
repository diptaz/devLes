# 🎨 CSS Not Loading? Fix Guide

## Problem
CSS/Tailwind tidak ter-load, tampilan website berantakan (plain HTML).

## Root Cause
**Tailwind v4** memerlukan `@tailwindcss/postcss` plugin, bukan `tailwindcss: {}` biasa di `postcss.config.js`.

---

## ✅ Solutions Applied

### 1. Updated `postcss.config.js`
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // ← CHANGED from 'tailwindcss: {}'
    autoprefixer: {},
  },
}
```

### 2. Updated `package.json`
Added `@tailwindcss/postcss` to devDependencies:
```json
"@tailwindcss/postcss": "^4.0.0"
```

### 3. Updated `styles/globals.css`
Ensure first line is:
```css
@import "tailwindcss";
```

---

## 🚀 Steps to Fix

### Step 1: Clean Everything
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .vite -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Mac/Linux
rm -rf node_modules .vite package-lock.json
```

### Step 2: Install Dependencies
```bash
npm install
```

**Expected output:**
```
added XXX packages, and audited XXX packages in XXs
```

### Step 3: Start Dev Server
```bash
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### Step 4: Verify
Open `http://localhost:5173` in browser.

**You should see:**
- ✅ Blue pastel background color
- ✅ Styled navigation bar
- ✅ Beautiful cards and buttons
- ✅ Proper spacing and colors

**NOT:**
- ❌ Plain white background
- ❌ Times New Roman font
- ❌ Unstyled buttons and links
- ❌ No colors or spacing

---

## 🔍 Debugging

### Check 1: Browser Console
Press **F12** → Console tab

**Should NOT see:**
- `Failed to load module`
- `404 Not Found` for CSS files
- Tailwind-related errors

### Check 2: Network Tab
Press **F12** → Network tab → Reload page (Ctrl+R)

**Look for:**
- `globals.css` - should return **200** status
- File size should be **> 0 KB** (not empty)

### Check 3: Computed Styles
In Console, run:
```javascript
getComputedStyle(document.body).backgroundColor
```

**Should return:** `"rgb(191, 219, 254)"` (blue pastel)
**NOT:** `"rgb(255, 255, 255)"` (white)

### Check 4: Verify Files

#### `postcss.config.js`:
```bash
cat postcss.config.js
```
**Must contain:** `'@tailwindcss/postcss': {}`

#### `styles/globals.css`:
```bash
head -n 1 styles/globals.css
```
**Must be:** `@import "tailwindcss";`

#### `package.json`:
```bash
grep "@tailwindcss/postcss" package.json
```
**Must contain:** `"@tailwindcss/postcss": "^4.0.0"`

---

## 🐛 Common Issues

### Issue 1: "Cannot find module '@tailwindcss/postcss'"
**Solution:**
```bash
npm install @tailwindcss/postcss@4.0.0 --save-dev
```

### Issue 2: CSS still not loading after npm install
**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Hard refresh browser
# Chrome/Edge: Ctrl + Shift + R
# Firefox: Ctrl + F5
```

### Issue 3: Build fails with Tailwind errors
**Solution:**
```bash
# Check Tailwind version
npm list tailwindcss

# Should be v4.x.x
# If not, update:
npm install tailwindcss@4.0.0 --save-dev
```

### Issue 4: Works locally but not on Vercel/Netlify
**Solution:**

1. **Push updated files to Git:**
```bash
git add postcss.config.js package.json
git commit -m "fix: Update Tailwind v4 configuration"
git push
```

2. **Redeploy on Vercel:**
   - Go to Vercel Dashboard
   - Find your project
   - Click "Redeploy" or wait for auto-deploy
   - Check build logs for errors

3. **Environment Variables (if needed):**
   - Vercel Dashboard → Settings → Environment Variables
   - Add: `NODE_VERSION` = `18.x` or `20.x`

---

## 📦 Required Packages for Tailwind v4

Make sure these are in `package.json`:

```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.17",
    "vite": "^5.1.0"
  }
}
```

---

## ✅ Verification Checklist

Before deploying:

- [ ] `postcss.config.js` uses `@tailwindcss/postcss`
- [ ] `package.json` has `@tailwindcss/postcss` in devDependencies
- [ ] `styles/globals.css` starts with `@import "tailwindcss";`
- [ ] `npm install` completed without errors
- [ ] `npm run dev` shows website with proper styling
- [ ] `npm run build` completes successfully
- [ ] Browser console has no CSS-related errors

---

## 🆘 Still Not Working?

### Last Resort: Reset Everything

```bash
# 1. Delete everything
rm -rf node_modules package-lock.json .vite dist

# 2. Reinstall
npm install

# 3. Clear browser cache
# Chrome: Ctrl + Shift + Delete → Clear data

# 4. Restart dev server
npm run dev
```

### Contact Support

If none of the above works:

1. Check browser console errors (F12)
2. Check terminal errors
3. Share error messages
4. Check Node.js version: `node -v` (should be >= 18.0.0)
5. Check npm version: `npm -v` (should be >= 9.0.0)

---

## 📚 References

- [Tailwind CSS v4 Beta Docs](https://tailwindcss.com/docs/v4-beta)
- [Vite + Tailwind Setup](https://vitejs.dev/guide/)
- [PostCSS Configuration](https://postcss.org/)
