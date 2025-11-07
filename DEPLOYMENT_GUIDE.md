# 🚀 Panduan Deployment LesCatur ke Vercel

Panduan lengkap untuk deploy aplikasi LesCatur ke Vercel.

## 📋 Prerequisites

Sebelum deploy, pastikan Anda memiliki:

1. ✅ Akun GitHub
2. ✅ Akun Vercel (gratis di [vercel.com](https://vercel.com))
3. ✅ Project Supabase yang sudah dikonfigurasi
4. ✅ Kode project sudah di-push ke GitHub repository

## 🔧 Persiapan Project

### 1. File Konfigurasi yang Dibutuhkan

Pastikan file-file berikut sudah ada di root project:

- ✅ `package.json` - Dependencies dan scripts
- ✅ `vite.config.ts` - Konfigurasi Vite
- ✅ `vercel.json` - Konfigurasi Vercel
- ✅ `tsconfig.json` - Konfigurasi TypeScript
- ✅ `index.html` - HTML entry point
- ✅ `main.tsx` - React entry point

### 2. Environment Variables yang Dibutuhkan

Siapkan nilai untuk environment variables berikut dari Supabase Dashboard:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Cara mendapatkannya:
1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Go to: Settings → API
4. Copy "Project URL" untuk `VITE_SUPABASE_URL`
5. Copy "anon public" key untuk `VITE_SUPABASE_ANON_KEY`

## 🌐 Deploy via Vercel Dashboard (Recommended)

### Step 1: Push ke GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Import Project ke Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik tombol **"Add New..."** → **"Project"**
3. **Import Git Repository**:
   - Pilih GitHub sebagai Git provider
   - Authorize Vercel untuk mengakses GitHub Anda
   - Pilih repository `lescatur`

### Step 3: Configure Project

Vercel akan otomatis mendeteksi settings:

- **Framework Preset**: Vite ✅ (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` ✅ (auto-detected)
- **Output Directory**: `dist` ✅ (auto-detected)

### Step 4: Add Environment Variables

Di section **Environment Variables**:

1. Klik **"Add"** untuk menambah variable baru
2. Tambahkan variable pertama:
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://your-project.supabase.co`
   - Environment: Production, Preview, Development (centang semua)

3. Tambahkan variable kedua:
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `your-anon-key-here`
   - Environment: Production, Preview, Development (centang semua)

### Step 5: Deploy!

1. Klik tombol **"Deploy"**
2. Tunggu proses build (sekitar 2-3 menit)
3. ✨ Selesai! Aplikasi Anda live di `https://your-app.vercel.app`

## 💻 Deploy via Vercel CLI (Alternative)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

Pilih metode login (GitHub, Email, dll.)

### Step 3: Deploy

Dari root directory project:

```bash
vercel
```

Ikuti prompts:
- Set up and deploy? **Y**
- Which scope? Pilih akun Anda
- Link to existing project? **N** (untuk deploy pertama kali)
- What's your project's name? **lescatur**
- In which directory is your code located? **./**

### Step 4: Add Environment Variables via CLI

```bash
vercel env add VITE_SUPABASE_URL
```
Paste value, lalu pilih environment (production, preview, development)

```bash
vercel env add VITE_SUPABASE_ANON_KEY
```
Paste value, lalu pilih environment

### Step 5: Deploy to Production

```bash
vercel --prod
```

## 🔄 Automatic Deployments

Setelah setup awal, setiap push ke GitHub akan otomatis trigger deployment:

- **Push ke `main` branch** → Deploy ke Production
- **Push ke branch lain** → Deploy ke Preview URL
- **Pull Request** → Deploy Preview dengan comment di PR

## ⚙️ Konfigurasi Vercel

File `vercel.json` sudah dikonfigurasi dengan:

### Rewrites untuk SPA

```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

Ini memastikan routing React bekerja dengan baik.

### Cache Headers

```json
"headers": [
  {
    "source": "/assets/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }
    ]
  }
]
```

Optimasi performa dengan caching static assets.

## 🔍 Troubleshooting

### Build Error: Missing Dependencies

**Problem**: Error seperti "Cannot find module 'react'"

**Solution**:
1. Pastikan semua dependencies ada di `package.json`
2. Di Vercel Dashboard → Settings → General
3. Set Node.js Version ke `18.x` atau lebih tinggi

### Environment Variables Tidak Terdeteksi

**Problem**: Supabase URL/Key undefined

**Solution**:
1. Pastikan variable diawali dengan `VITE_`
2. Redeploy setelah menambah variables:
   ```bash
   vercel --prod
   ```

### 404 Error pada Routes

**Problem**: Refresh page menampilkan 404

**Solution**: Pastikan `vercel.json` memiliki rewrites configuration (sudah ada di file konfigurasi)

### Build Timeout

**Problem**: Build melebihi time limit

**Solution**: 
1. Optimasi bundle size di `vite.config.ts`
2. Upgrade ke Vercel Pro jika perlu (build time lebih panjang)

### TypeScript Errors di Build

**Problem**: Build gagal karena TypeScript errors

**Solution**:
1. Run lokal: `npm run build`
2. Fix semua TypeScript errors
3. Push changes ke GitHub

## 📊 Monitoring & Analytics

### Vercel Analytics (Optional)

1. Di Vercel Dashboard → Analytics
2. Enable Vercel Analytics
3. Install package (jika belum):
   ```bash
   npm install @vercel/analytics
   ```
4. Update `main.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';
   
   // Di dalam render:
   <>
     <App />
     <Analytics />
   </>
   ```

## 🎯 Custom Domain (Optional)

### Tambah Custom Domain

1. Di Vercel Dashboard → Settings → Domains
2. Klik **"Add"**
3. Masukkan domain Anda (contoh: `lescatur.com`)
4. Ikuti instruksi untuk setup DNS:

**Untuk Domain Root:**
- Type: A
- Name: @
- Value: `76.76.21.21`

**Untuk WWW:**
- Type: CNAME
- Name: www
- Value: `cname.vercel-dns.com`

5. Tunggu DNS propagation (5-48 jam)

## 🔐 Security Best Practices

### Environment Variables

- ✅ Jangan commit `.env` ke GitHub
- ✅ Gunakan `.env.example` untuk template
- ✅ Gunakan Vercel Environment Variables untuk secrets
- ✅ Rotate keys secara berkala

### Supabase Security

1. Enable Row Level Security (RLS) di semua tables
2. Set up proper access policies
3. Gunakan Service Role Key hanya di server-side

## 📈 Performance Optimization

File `vite.config.ts` sudah dikonfigurasi dengan:

### Code Splitting

```typescript
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'chess-vendor': ['chess.js', 'react-chessboard'],
  'ui-vendor': ['lucide-react', 'sonner', 'recharts'],
}
```

### Optimized Dependencies

```typescript
optimizeDeps: {
  include: [
    'react',
    'react-dom',
    'chess.js',
    'react-chessboard',
    // ... dll
  ],
}
```

## ✅ Deployment Checklist

Sebelum deploy:

- [ ] Semua fitur sudah ditest lokal
- [ ] TypeScript errors sudah resolved
- [ ] Environment variables sudah disiapkan
- [ ] Supabase project sudah dikonfigurasi
- [ ] `.env` tidak ter-commit di Git
- [ ] README.md sudah update
- [ ] Package.json scripts sudah benar

Setelah deploy:

- [ ] Website accessible di production URL
- [ ] Semua fitur berfungsi normal
- [ ] Authentication Supabase berjalan
- [ ] Cart & payment flow tested
- [ ] Mobile responsive checked
- [ ] Console tidak ada errors

## 🆘 Support

Jika mengalami masalah:

1. **Vercel Status**: [status.vercel.com](https://status.vercel.com)
2. **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
3. **Documentation**: [vercel.com/docs](https://vercel.com/docs)

## 🎉 Done!

Selamat! Aplikasi LesCatur Anda sekarang sudah live di Vercel! 🚀

Share URL production Anda:
```
https://lescatur.vercel.app
```

Atau custom domain:
```
https://lescatur.com
```
