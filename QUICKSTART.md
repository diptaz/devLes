# ⚡ Quick Start Guide - LesCatur

Panduan cepat untuk setup dan deploy LesCatur dalam 10 menit!

## 🚀 Setup Lokal (5 menit)

### 1. Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd lescatur

# Install dependencies
npm install
```

### 2. Setup Environment Variables

```bash
# Copy .env example
cp .env.example .env
```

Edit `.env` dan isi dengan kredensial Supabase:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Cara mendapatkan kredensial Supabase:**
1. Buka [app.supabase.com](https://app.supabase.com)
2. Pilih project Anda (atau buat baru)
3. Settings → API
4. Copy "Project URL" dan "anon public key"

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka browser: `http://localhost:3000` ✅

## 🌐 Deploy ke Vercel (5 menit)

### 1. Push ke GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy ke Vercel

**Option A - Via Dashboard (Mudah):**

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik "Add New Project"
3. Import repository GitHub Anda
4. Add Environment Variables:
   - `VITE_SUPABASE_URL` = URL Supabase Anda
   - `VITE_SUPABASE_ANON_KEY` = Anon key Supabase Anda
5. Klik "Deploy" dan tunggu 2-3 menit
6. ✨ Done! Website live!

**Option B - Via CLI (Cepat):**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Tambah env variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

## ✅ Verification Checklist

Setelah deploy, test fitur-fitur ini:

- [ ] Homepage loading dengan baik
- [ ] Login/Register berfungsi
- [ ] Browse courses
- [ ] Add to cart
- [ ] Checkout process
- [ ] View My Library
- [ ] Book trainer session
- [ ] AI Trainer accessible
- [ ] Mobile responsive

## 🎯 Next Steps

1. **Customize Content**: Update courses, trainers, dan pricing
2. **Setup Supabase Tables**: Ikuti `BACKEND_SETUP_GUIDE.md`
3. **Configure Domain**: Tambah custom domain di Vercel
4. **Setup Analytics**: Enable Vercel Analytics
5. **Test Payment**: Integrate real payment gateway

## 📚 Documentation

- **Full Deployment**: `DEPLOYMENT_GUIDE.md`
- **Backend Setup**: `BACKEND_SETUP_GUIDE.md`
- **API Documentation**: `BACKEND_API_DOCUMENTATION.md`
- **Mobile Guide**: `MOBILE_RESPONSIVE_GUIDE.md`

## 🆘 Troubleshooting

### Build Error?
```bash
# Clear cache dan rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Supabase Connection Error?
- Check environment variables spelling (harus `VITE_` prefix)
- Verify Supabase URL dan key benar
- Check Supabase project status

### Vercel Deploy Failed?
- Check build logs di Vercel dashboard
- Ensure all dependencies di `package.json`
- Try deploy ulang

## 💬 Support

Butuh bantuan? Check:
- `README.md` untuk overview lengkap
- `DEPLOYMENT_GUIDE.md` untuk troubleshooting detail
- GitHub Issues untuk report bugs

---

**Happy Coding! ♟️🚀**

Build dengan ❤️ untuk LesCatur
