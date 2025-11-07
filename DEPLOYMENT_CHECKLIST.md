# ✅ Deployment Checklist - LesCatur

Gunakan checklist ini sebelum dan sesudah deployment untuk memastikan semuanya berjalan dengan baik.

## 📋 Pre-Deployment Checklist

### Code Quality

- [ ] **Build berhasil lokal**
  ```bash
  npm run build
  ```
  Tidak ada errors

- [ ] **TypeScript check pass**
  ```bash
  npm run type-check
  ```
  Tidak ada type errors

- [ ] **Linting pass**
  ```bash
  npm run lint
  ```
  Tidak ada warnings/errors

- [ ] **Test semua fitur utama lokal**
  - [ ] Login/Register
  - [ ] Browse courses
  - [ ] Add to cart
  - [ ] Checkout
  - [ ] My Library
  - [ ] AI Trainer
  - [ ] Virtual Class booking
  - [ ] Mobile responsive

### Environment & Configuration

- [ ] **Environment variables siap**
  - [ ] `VITE_SUPABASE_URL` tersedia
  - [ ] `VITE_SUPABASE_ANON_KEY` tersedia
  - [ ] File `.env` tidak ter-commit ke Git

- [ ] **Git repository ready**
  - [ ] Kode sudah di-commit
  - [ ] Push ke remote repository (GitHub/GitLab)
  - [ ] `.gitignore` configured
  - [ ] Tidak ada sensitive data di repository

- [ ] **Konfigurasi files complete**
  - [ ] `package.json` ✓
  - [ ] `vite.config.ts` ✓
  - [ ] `vercel.json` ✓
  - [ ] `tsconfig.json` ✓
  - [ ] `index.html` ✓
  - [ ] `main.tsx` ✓

### Supabase Setup

- [ ] **Supabase project configured**
  - [ ] Database tables created
  - [ ] Row Level Security (RLS) enabled
  - [ ] Storage buckets configured
  - [ ] Auth providers enabled
  - [ ] API keys copied

- [ ] **Test Supabase connection**
  - [ ] Auth works lokal
  - [ ] Database queries work
  - [ ] Storage uploads work

### Content Review

- [ ] **Data populasi**
  - [ ] Courses data complete
  - [ ] Trainers info accurate
  - [ ] Pricing correct (Rp 100.000 - 150.000)
  - [ ] Images uploaded/accessible

- [ ] **Copy/Text check**
  - [ ] No placeholder text ("Lorem ipsum")
  - [ ] Bahasa Indonesia correct
  - [ ] No typos

## 🚀 Deployment Steps

### Vercel Deployment

- [ ] **1. Login ke Vercel**
  - Go to [vercel.com](https://vercel.com)
  - Sign in dengan GitHub

- [ ] **2. Import project**
  - Click "Add New Project"
  - Select repository
  - Import

- [ ] **3. Configure settings**
  - Framework: Vite (auto-detected)
  - Root Directory: `./`
  - Build Command: `npm run build`
  - Output Directory: `dist`

- [ ] **4. Add environment variables**
  - `VITE_SUPABASE_URL` = [your-value]
  - `VITE_SUPABASE_ANON_KEY` = [your-value]
  - Environment: All (Production, Preview, Development)

- [ ] **5. Deploy**
  - Click "Deploy"
  - Wait for build completion (2-3 minutes)

- [ ] **6. Get deployment URL**
  - Copy production URL
  - Test the URL

## ✅ Post-Deployment Checklist

### Functional Testing

- [ ] **Homepage loads**
  - No console errors
  - UI renders correctly
  - Images load

- [ ] **Authentication works**
  - [ ] Sign up new user
  - [ ] Login existing user
  - [ ] Logout
  - [ ] Password reset (if implemented)

- [ ] **Core Features**
  - [ ] **Browse Courses**
    - Video courses visible
    - E-books visible
    - Filtering works
    - Search works (if implemented)
  
  - [ ] **Shopping Cart**
    - Add items to cart
    - Remove items
    - Cart badge updates
    - Total calculation correct
    - Free trial items show Rp 0
  
  - [ ] **Checkout**
    - Checkout flow works
    - Payment info clear
    - Confirmation received
  
  - [ ] **My Library**
    - Purchased items appear
    - Can access content
    - Video player works
    - E-book reader works
  
  - [ ] **AI Trainer**
    - Accessible after purchase/trial
    - Chess board interactive
    - AI moves work
  
  - [ ] **Virtual Classes**
    - Trainer booking works
    - Calendar selection works
    - Booking confirmation
  
  - [ ] **Trainer Booking**
    - List of trainers visible
    - Correct names match About Us
    - Experience years correct (Daniel: 3 tahun, others: 1 tahun)
    - Add to cart works

- [ ] **User Interface**
  - [ ] Navigation works
  - [ ] All buttons clickable
  - [ ] Modals open/close correctly
  - [ ] Toasts show for actions
  - [ ] Loading states visible

### Responsive Testing

- [ ] **Desktop (1920x1080)**
  - Layout correct
  - No overflow
  - All features accessible

- [ ] **Tablet (768x1024)**
  - Layout adapts
  - Navigation usable
  - Content readable

- [ ] **Mobile (375x667)**
  - [ ] Mobile menu works
  - [ ] Touch targets adequate
  - [ ] Text readable
  - [ ] Forms usable
  - [ ] Chess board playable

### Performance Check

- [ ] **Lighthouse scores** (Chrome DevTools)
  - Performance: > 80
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90

- [ ] **Load times**
  - Initial load < 3 seconds
  - Page transitions smooth
  - Images optimized

- [ ] **Console check**
  - No JavaScript errors
  - No 404s for assets
  - No CORS errors
  - No Supabase connection errors

### SEO & Meta

- [ ] **Meta tags**
  - Title correct
  - Description present
  - Favicon loads
  - og:image set (if implemented)

- [ ] **Social sharing**
  - Preview looks good
  - Links work

### Security

- [ ] **Environment variables**
  - Not exposed in client bundle
  - Only VITE_ prefixed vars accessible
  - Anon key (not service role) used

- [ ] **Supabase security**
  - RLS enabled on tables
  - Public access restricted
  - Auth required for protected routes

- [ ] **HTTPS**
  - Site loads on https://
  - No mixed content warnings

### Integration Testing

- [ ] **Supabase integration**
  - [ ] User auth persists
  - [ ] Database queries work
  - [ ] Real-time updates work (if implemented)
  - [ ] File uploads work (if implemented)

- [ ] **Payment flow** (if implemented)
  - Test mode works
  - Webhooks configured
  - Confirmations send

### Browser Compatibility

Test on multiple browsers:

- [ ] **Chrome** (latest)
  - All features work

- [ ] **Firefox** (latest)
  - All features work

- [ ] **Safari** (latest)
  - All features work

- [ ] **Edge** (latest)
  - All features work

- [ ] **Mobile Safari** (iOS)
  - All features work

- [ ] **Mobile Chrome** (Android)
  - All features work

## 📊 Monitoring Setup

- [ ] **Vercel Analytics** (optional)
  - Enabled in dashboard
  - Package installed
  - Component added

- [ ] **Error tracking** (optional)
  - Sentry configured
  - Error reports working

- [ ] **Uptime monitoring** (optional)
  - UptimeRobot or similar
  - Alerts configured

## 🔄 Post-Launch Tasks

### Immediate (Day 1)

- [ ] Share production URL with team
- [ ] Monitor for errors in Vercel dashboard
- [ ] Check user feedback
- [ ] Document any issues

### Short-term (Week 1)

- [ ] Review analytics data
- [ ] Optimize slow pages
- [ ] Fix reported bugs
- [ ] Add to documentation

### Medium-term (Month 1)

- [ ] Set up custom domain (if needed)
- [ ] Configure CDN (if needed)
- [ ] Performance optimization
- [ ] SEO improvements

## 🆘 Rollback Plan

If something goes wrong:

### Quick Rollback

1. **Via Vercel Dashboard:**
   - Go to Deployments
   - Find last working deployment
   - Click "..." → "Promote to Production"

2. **Via CLI:**
   ```bash
   vercel rollback [deployment-url]
   ```

### Debug Issues

1. **Check Vercel logs:**
   - Deployment tab → Build Logs
   - Runtime Logs

2. **Check browser console:**
   - F12 → Console tab
   - Look for errors

3. **Verify environment variables:**
   - Settings → Environment Variables
   - Ensure all set correctly

## 📝 Notes

**Deployment Date:** _________________

**Deployment URL:** _________________

**Vercel Project:** _________________

**Team Members Notified:** _________________

**Issues Found:** _________________

**Resolution:** _________________

---

## ✨ Deployment Complete!

Selamat! LesCatur sudah live di production! 🎉

**Next steps:**
1. Share URL dengan users
2. Monitor performa
3. Collect feedback
4. Plan iterasi berikutnya

**Production URL:**
```
https://_________________.vercel.app
```

**Dashboard:**
- Vercel: https://vercel.com/dashboard
- Supabase: https://app.supabase.com

---

*Checklist ini dapat di-print atau di-copy untuk setiap deployment.*
