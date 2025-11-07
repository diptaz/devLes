# Changelog

All notable changes to LesCatur project will be documented in this file.

## [1.0.2] - 2024-11-07 (Latest)

### 🐛 Fixed
- **Port Configuration Issue**: Fixed port mismatch in documentation
  - Changed dev server port from 5173 to 3000 to match user's setup
  - Changed preview server port from 4173 to 3001
  - Updated all 13 documentation files to reference port 3000

### ✨ Added
- Created `PORT_CONFIGURATION.md` - Complete port setup guide
- Created `PORT_FIX_SUMMARY.md` - Summary of port changes
- Created `update-port-docs.ps1` - Script to update port references (Windows)
- Created `update-port-docs.sh` - Script to update port references (Mac/Linux)

### 📝 Changed
- Updated `vite.config.ts` server port from 5173 to 3000
- Updated all documentation mentioning localhost:5173 to localhost:3000
- Updated `DOCUMENTATION_INDEX.md` to include port configuration section

---

## [1.0.1] - 2024-11-07

### 🐛 Fixed
- **CSS Not Loading Issue**: Fixed Tailwind CSS v4 configuration
  - Updated `postcss.config.js` to use `@tailwindcss/postcss` plugin
  - Added `@tailwindcss/postcss` to package.json devDependencies
  - Ensured `styles/globals.css` starts with `@import "tailwindcss";`
- **Environment Variables Setup**: Added complete .env setup
  - Created `.env` file with placeholders
  - Created `.env.example` template
  - Created `.gitignore` to protect secrets
  
### ✨ Added
- Created `ENV_SETUP_GUIDE.md` - Complete environment setup guide
- Created `ENV_QUICK_REFERENCE.md` - Quick .env reference card
- Created `WHATS_NEW.md` - Summary of new features
- Created `SETUP_CHECKLIST.md` - Complete setup checklist
- Created `CSS_FIX_GUIDE.md` - Comprehensive CSS troubleshooting guide
- Created `QUICK_FIX.md` - Quick reference for CSS fixes
- Created `fix-css.sh` - Bash script to automatically fix CSS issues (Mac/Linux)
- Created `fix-css.ps1` - PowerShell script to automatically fix CSS issues (Windows)
- Created `.npmrc` - NPM configuration for better package management
- Created `.gitignore` - Proper Git ignore rules with comprehensive protection

### 📝 Changed
- Updated `README.md` with CSS troubleshooting and environment setup sections
- Updated `ACTION_REQUIRED.md` with Step 0 for environment setup
- Updated `DOCUMENTATION_INDEX.md` to include new environment docs
- Updated documentation to reflect Tailwind v4 requirements

### 🔧 Technical Details

**Root Cause:**
Tailwind CSS v4 requires `@tailwindcss/postcss` plugin instead of the old `tailwindcss: {}` configuration in PostCSS config.

**Impact:**
Without proper PostCSS configuration, Tailwind CSS does not process styles, causing the website to display as plain HTML without any styling.

**Solution:**
```diff
// postcss.config.js
export default {
  plugins: {
-   tailwindcss: {},
+   '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

---

## [1.0.0] - 2024-11-06

### 🎉 Initial Release

#### Features
- ✅ Complete authentication system with Supabase
- ✅ Video courses and e-books marketplace
- ✅ Virtual one-on-one classes with interactive chessboard
- ✅ AI Trainer for chess practice
- ✅ Shopping cart with free trial system
- ✅ My Library for purchased content
- ✅ Booking system for professional trainers
- ✅ Chess puzzles and quizzes
- ✅ Mobile responsive design
- ✅ Rupiah currency (IDR) pricing
- ✅ Blue pastel UI theme (child-friendly)

#### Tech Stack
- React 18.3.1
- TypeScript 5.3.3
- Tailwind CSS 4.0.0
- Vite 5.1.0
- Supabase 2.39.0
- Radix UI components
- shadcn/ui components

#### Backend Integration
- 19 Supabase API endpoints
- Database schema for users, courses, bookings, subscriptions
- Row Level Security (RLS) policies
- Real-time updates
- File storage for course materials

#### Documentation
- ARCHITECTURE_OVERVIEW.md
- BACKEND_API_DOCUMENTATION.md
- DEPLOYMENT_GUIDE.md
- MOBILE_RESPONSIVE_GUIDE.md
- QUICKSTART.md
- And 15+ other documentation files

---

## Version History

- **v1.0.1** (Nov 7, 2024) - CSS Configuration Fix
- **v1.0.0** (Nov 6, 2024) - Initial Release

---

## Upgrade Guide

### From v1.0.0 to v1.0.1

If you're experiencing CSS not loading issues:

1. **Pull latest changes:**
   \`\`\`bash
   git pull origin main
   \`\`\`

2. **Run fix script:**
   \`\`\`bash
   # Windows
   .\fix-css.ps1
   
   # Mac/Linux
   chmod +x fix-css.sh
   ./fix-css.sh
   \`\`\`

3. **Verify:**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   Open http://localhost:5173 and check for blue pastel styling.

4. **Deploy:**
   \`\`\`bash
   git add .
   git commit -m "chore: Update to v1.0.1 - CSS fix"
   git push origin main
   \`\`\`

---

## Roadmap

### v1.1.0 (Planned)
- [ ] Real payment gateway integration (Midtrans/Xendit)
- [ ] Email notifications
- [ ] User profile customization
- [ ] Course progress tracking
- [ ] Certificate generation
- [ ] Advanced analytics dashboard

### v1.2.0 (Planned)
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Offline mode for courses
- [ ] Social features (friends, leaderboards)
- [ ] Tournament system

---

**Maintained by:** LesCatur Team
**Last Updated:** November 7, 2024
