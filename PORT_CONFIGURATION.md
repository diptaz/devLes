# 🔌 Port Configuration - LesCatur

**Updated:** November 7, 2024  
**Status:** ✅ Fixed to match your setup

---

## 📊 Current Configuration

### Development Server
```
Port: 3000
URL:  http://localhost:3000
```

### Preview Server (Production Build)
```
Port: 3001
URL:  http://localhost:3001
```

---

## 🔧 What Was Fixed

### Issue
You reported the app was running on `localhost:3000` but documentation mentioned `localhost:5173`.

### Root Cause
- Default Vite port is 5173
- Documentation was written for that default
- Your setup was using port 3000
- This caused confusion

### Solution
✅ Updated `vite.config.ts` to use port 3000
✅ Updated all 13 documentation files
✅ Created port update scripts for future changes

---

## 📝 Files Updated

### Configuration
- [x] `vite.config.ts` - Changed server port from 5173 → 3000

### Documentation (13 files)
- [x] `README.md`
- [x] `START_HERE.md`
- [x] `ACTION_REQUIRED.md`
- [x] `ENV_SETUP_GUIDE.md`
- [x] `ENV_QUICK_REFERENCE.md`
- [x] `SETUP_CHECKLIST.md`
- [x] `WHATS_NEW.md`
- [x] `CSS_FIX_GUIDE.md`
- [x] `QUICK_FIX.md`
- [x] `CHANGELOG.md`
- [x] `CSS_FIX_SUMMARY.md`
- [x] `FILES_TO_SYNC.md`
- [x] `GITHUB_SYNC_GUIDE.md`

### Scripts Created
- [x] `update-port-docs.ps1` - PowerShell script to update ports
- [x] `update-port-docs.sh` - Bash script to update ports

---

## ✅ Verification

### Check Port Configuration

**Windows PowerShell:**
```powershell
# Check vite.config.ts
Get-Content vite.config.ts | Select-String "port:"

# Should show:
# port: 3000,  (dev server)
# port: 3001,  (preview server)
```

**Mac/Linux:**
```bash
# Check vite.config.ts
grep "port:" vite.config.ts

# Should show:
# port: 3000,  (dev server)
# port: 3001,  (preview server)
```

---

### Test Development Server

```bash
# Start dev server
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

**Open browser:** http://localhost:3000

---

### Test Preview Server

```bash
# Build and preview
npm run build
npm run preview
```

**Expected output:**
```
➜  Local:   http://localhost:3001/
```

**Open browser:** http://localhost:3001

---

## 🔄 If Port is Already in Use

### Scenario: Port 3000 Occupied

**Symptoms:**
```
Error: Port 3000 is already in use
```

**Solution 1: Kill Existing Process**

**Windows:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9
```

**Solution 2: Change Port**

Edit `vite.config.ts`:
```ts
server: {
  port: 3001,  // or any other available port
  host: true,
},
```

Then restart dev server.

---

## 🌐 Environment Variable

You can also set port via environment variable:

**Create `.env.local` (optional):**
```bash
# Override port
VITE_PORT=3000
```

**Or use command line:**
```bash
# Run on different port
npm run dev -- --port 3002
```

---

## 🚀 Deployment Ports

### Local Development
- Dev server: `http://localhost:3000`
- Preview: `http://localhost:3001`

### Vercel/Netlify (Production)
- Automatic port assignment
- Usually port 80 (HTTP) or 443 (HTTPS)
- Custom domains work automatically

---

## 📋 Port Reference Table

| Service | Port | URL | Notes |
|---------|------|-----|-------|
| **Dev Server** | 3000 | http://localhost:3000 | Hot reload enabled |
| **Preview** | 3001 | http://localhost:3001 | Production build test |
| **Supabase Local** | 54321 | http://localhost:54321 | If using local Supabase |
| **Production** | Auto | https://your-domain.com | Managed by platform |

---

## 🛠️ Update Scripts

If you need to change ports again in the future:

### PowerShell (Windows)
```powershell
# Update all documentation to new port
.\update-port-docs.ps1
```

### Bash (Mac/Linux)
```bash
# Make executable
chmod +x update-port-docs.sh

# Run update script
./update-port-docs.sh
```

**What the scripts do:**
1. Find all port references in documentation
2. Replace old port with new port
3. Show summary of changes
4. Create backups

---

## ✅ Checklist

Before committing port changes:

- [ ] Updated `vite.config.ts`
- [ ] Tested `npm run dev` on new port
- [ ] Verified website loads correctly
- [ ] Updated documentation (or ran update script)
- [ ] Tested build: `npm run build && npm run preview`
- [ ] Verified no conflicts with other apps
- [ ] Updated `.env` if using VITE_PORT
- [ ] Committed changes to Git

---

## 🎯 Quick Commands Reference

```bash
# Start dev server (port 3000)
npm run dev

# Start on different port (one-time)
npm run dev -- --port 3005

# Build and preview (port 3001)
npm run build
npm run preview

# Check what's using port 3000 (Windows)
netstat -ano | findstr :3000

# Check what's using port 3000 (Mac/Linux)
lsof -i :3000

# Kill port 3000 process (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill port 3000 process (Mac/Linux)
lsof -ti:3000 | xargs kill -9
```

---

## 🆘 Troubleshooting

### Issue: "Port already in use"

**Cause:** Another application is using port 3000

**Solutions:**
1. Kill the other application
2. Change LesCatur's port
3. Restart your computer

---

### Issue: "Cannot access localhost:3000"

**Possible causes:**
- Dev server not running → Run `npm run dev`
- Firewall blocking port → Allow in firewall settings
- Browser cache → Clear cache or use incognito
- Wrong URL → Check terminal output for actual URL

---

### Issue: "Build works but dev doesn't"

**Cause:** Different ports configured

**Check:**
```bash
# Dev server port
grep "server:" vite.config.ts -A 3

# Preview server port  
grep "preview:" vite.config.ts -A 3
```

Both should be configured correctly.

---

## 📚 Related Documentation

- `vite.config.ts` - Main configuration file
- `START_HERE.md` - Getting started guide
- `ENV_SETUP_GUIDE.md` - Environment setup
- `DEPLOYMENT_GUIDE.md` - Production deployment

---

## 📝 Notes

- Port 3000 is commonly used for React/Node apps
- Port 3001 is the next available port
- Vite's default is 5173 (we changed this)
- Production deployments use automatic port assignment
- No need to specify port in production URLs

---

**Status:** ✅ Port configuration fixed and documented

**Your setup:**
- Development: http://localhost:3000
- Preview: http://localhost:3001
- Production: Automatic (Vercel/Netlify)

**Everything should now work correctly! 🚀**
