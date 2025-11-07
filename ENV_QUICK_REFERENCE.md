# 🔐 .env Quick Reference Card

## ⚡ Super Quick Setup (5 Minutes)

### 1. Create Supabase Account
- Go to: https://supabase.com
- Sign up (FREE, no credit card!)
- Create new project

### 2. Get Credentials
```
Supabase Dashboard → Settings → API
```

Copy these 2 values:
- **Project URL** → `VITE_SUPABASE_URL`
- **anon key** → `VITE_SUPABASE_ANON_KEY`

### 3. Update .env
Open `.env` file and paste your credentials:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Test
```bash
npm install
npm run dev
```

Open http://localhost:3000 - should work!

---

## 📋 Files We Created

| File | Purpose | Commit to GitHub? |
|------|---------|-------------------|
| `.env.example` | Template | ✅ YES |
| `.env` | Your credentials | ❌ NO! |
| `.gitignore` | Protects .env | ✅ YES |

---

## ✅ Security Checklist

- [ ] `.env` has real credentials (not placeholders)
- [ ] `.env` is in `.gitignore`
- [ ] `git ls-files | grep .env` returns nothing
- [ ] Only `.env.example` is on GitHub

---

## 🆘 Common Issues

### Issue: Variables not loading
```bash
# Restart dev server
# Ctrl+C then:
npm run dev
```

### Issue: .env committed to GitHub
```bash
git rm --cached .env
git commit -m "chore: Remove .env"
git push origin main

# Then rotate keys in Supabase!
```

### Issue: Connection fails
- Check project is active on Supabase (not paused)
- Check URL has `https://`
- Check key is complete (very long)

---

## 📖 Full Guide

Read `ENV_SETUP_GUIDE.md` for:
- Detailed setup instructions
- Troubleshooting
- Production deployment
- Security best practices

---

## 🔑 Where to Find Credentials

```
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click: Settings (⚙️) → API
4. Copy:
   - Project URL → VITE_SUPABASE_URL
   - anon/public → VITE_SUPABASE_ANON_KEY
```

---

## 🚨 NEVER DO THIS

❌ Commit `.env` to GitHub
❌ Share `.env` publicly
❌ Use production keys in development
❌ Hardcode secrets in code
❌ Use `service_role` key in frontend

---

## ✅ ALWAYS DO THIS

✅ Keep `.env` in `.gitignore`
✅ Use `.env.example` as template
✅ Use different keys for dev/prod
✅ Rotate keys regularly
✅ Enable RLS in Supabase

---

**Need help?** Read `ENV_SETUP_GUIDE.md`

**Status:** ✅ Ready to use
