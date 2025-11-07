# LesCatur - Platform Kursus Catur Indonesia

Platform kursus catur komprehensif dengan fitur lengkap untuk pembelajaran catur dari pemula hingga mahir.

---

## 🚨 QUICK LINKS - START HERE!

### **⚡ MANUAL COMMANDS (No Emoji - PowerShell Friendly!)** ⭐⭐⭐⭐
👉 **BACA INI:** [**MANUAL_COMMANDS.md**](MANUAL_COMMANDS.md)  
**Copy-paste commands tanpa emoji! Fixed PowerShell encoding issues!**

### **🚀 SIAP PUSH & DEPLOY?** (NEW!)
👉 **BACA INI:** [**SIAP_PUSH.md**](SIAP_PUSH.md) ⭐⭐⭐  
**Credentials sudah dikonfigurasi! Tinggal `npm install` dan `git push`!**

### **📦 Deploy ke Vercel?**
👉 **Guide:** [**VERCEL_DEPLOY_STEPS.md**](VERCEL_DEPLOY_STEPS.md)  
**Step-by-step deployment ke Vercel**

### **🎯 Tinggal Push Git?**
👉 Baca: [TINGGAL_PUSH.md](TINGGAL_PUSH.md) - CSS sudah diperbaiki

### **📖 First Time Setup?**  
👉 Baca: [START_HERE.md](START_HERE.md)

### **🎨 CSS Not Loading?**  
👉 Run: `fix-css.ps1` (Windows) or `fix-css.sh` (Mac/Linux)  
👉 Read: [QUICK_FIX.md](QUICK_FIX.md)

### **🔐 Environment Setup?**  
👉 Baca: [ENV_QUICK_REFERENCE.md](ENV_QUICK_REFERENCE.md)

### **🔌 Port Issues?**  
👉 Baca: [PORT_CONFIGURATION.md](PORT_CONFIGURATION.md)

---

**Repository:** https://github.com/diptaz/website-lescatur.git

---

## 🚀 Fitur Utama

- **Video Courses & E-books**: Koleksi lengkap materi pembelajaran catur
- **Virtual Classes**: Kelas catur virtual one-on-one dengan papan catur interaktif dan video conferencing
- **AI Trainer**: Latihan catur dengan AI untuk meningkatkan skill
- **Chess Puzzles & Quizzes**: Puzzle dan kuis interaktif untuk mengasah kemampuan
- **Cart & Payment System**: Sistem pembayaran terintegrasi dengan free trial
- **My Library**: Perpustakaan pribadi untuk kursus yang telah dibeli
- **Booking System**: Sistem pemesanan pelatih profesional

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Chess Engine**: chess.js + react-chessboard
- **Backend**: Supabase (Auth + Database + Storage)
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Charts**: Recharts

## 📦 Installation

### Quick Start

1. Clone repository:
\`\`\`bash
git clone <repository-url>
cd lescatur
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Setup environment variables:

**File `.env` sudah ada!** Anda hanya perlu mengisi credentials Supabase:

a. **Create FREE Supabase account:** https://supabase.com (no credit card!)
b. **Get credentials:** Settings → API → Copy URL & anon key  
c. **Update `.env` file:**
   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

📖 **Detailed guide:** Read [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md) or [ENV_QUICK_REFERENCE.md](ENV_QUICK_REFERENCE.md)

4. Jalankan development server:
\`\`\`bash
npm run dev
\`\`\`

Aplikasi akan berjalan di `http://localhost:3000`

### 🎨 CSS Not Loading? (Tampilan Berantakan)

Jika website tampil tanpa styling (plain HTML), jalankan fix script:

**Windows PowerShell:**
\`\`\`powershell
.\fix-css.ps1
\`\`\`

**Mac/Linux:**
\`\`\`bash
chmod +x fix-css.sh
./fix-css.sh
\`\`\`

**Manual:**
\`\`\`bash
rm -rf node_modules .vite package-lock.json
npm install
npm run dev
\`\`\`

📖 **Lihat [QUICK_FIX.md](QUICK_FIX.md) atau [CSS_FIX_GUIDE.md](CSS_FIX_GUIDE.md) untuk detail lengkap.**

## 🏗️ Build untuk Production

Build aplikasi:
\`\`\`bash
npm run build
\`\`\`

Preview build:
\`\`\`bash
npm run preview
\`\`\`

## 🚀 Deploy ke Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push kode ke GitHub repository
2. Buka [Vercel Dashboard](https://vercel.com)
3. Klik "Add New Project"
4. Import repository GitHub Anda
5. Vercel akan otomatis mendeteksi konfigurasi Vite
6. Tambahkan environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Klik "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Login ke Vercel:
\`\`\`bash
vercel login
\`\`\`

3. Deploy:
\`\`\`bash
vercel
\`\`\`

Untuk production deployment:
\`\`\`bash
vercel --prod
\`\`\`

### Konfigurasi Environment Variables di Vercel

Setelah deploy, tambahkan environment variables:

1. Buka project di Vercel Dashboard
2. Go to Settings → Environment Variables
3. Tambahkan:
   - `VITE_SUPABASE_URL` = URL Supabase project Anda
   - `VITE_SUPABASE_ANON_KEY` = Anon key dari Supabase
4. Redeploy untuk menerapkan perubahan

## 📚 Backend Documentation

Dokumentasi lengkap backend API tersedia di:
- `BACKEND_API_DOCUMENTATION.md` - Dokumentasi API endpoints
- `BACKEND_README.md` - Panduan backend setup
- `BACKEND_SETUP_GUIDE.md` - Panduan instalasi backend

## 🔧 Project Structure

\`\`\`
lescatur/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── data/            # Data files
│   └── figma/           # Figma import components
├── styles/              # Global styles
├── utils/               # Utility functions
│   └── supabase/        # Supabase client
├── supabase/            # Supabase functions
│   └── functions/       # Edge functions
├── App.tsx              # Main application
├── main.tsx             # Entry point
└── index.html           # HTML template
\`\`\`

## 🎨 Design System

Website menggunakan warna biru pastel dengan UI yang interaktif dan ramah anak:
- Primary: Blue Pastel (#bfdbfe)
- Accent: Indigo & Purple
- Responsive untuk desktop & mobile

## 💰 Pricing

- **Video Courses**: Rp 100.000 - Rp 150.000
- **E-books**: Rp 100.000 - Rp 120.000
- **AI Trainer**: Rp 150.000/bulan (dengan free trial)
- **Virtual Classes**: Rp 100.000 - Rp 150.000 per sesi (dengan free trial)

## 👥 Team

Tim pengajar berpengalaman:
- **Daniel** (Founder & Head Coach) - 3 tahun pengalaman
- **Sarah**, **Mike**, **Priya** - 1 tahun pengalaman masing-masing

## 📝 License

Copyright © 2025 LesCatur. All rights reserved.

## 🤝 Contributing

Untuk kontribusi, silakan buat pull request atau hubungi tim development.

## 📧 Support

Untuk pertanyaan atau dukungan, hubungi: support@lescatur.id
