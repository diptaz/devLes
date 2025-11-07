#!/bin/bash

# ============================================
# LesCatur - Ready to Push Verification
# ============================================
# This script verifies everything is correct before pushing to Git

echo ""
echo "🚀 LesCatur - Ready to Push Verification"
echo "========================================="
echo ""

all_good=true
warnings=()

# ===========================================
# 1. Check Critical Files Exist
# ===========================================
echo "📁 Checking critical files..."

critical_files=(
    "package.json"
    "vite.config.ts"
    "postcss.config.js"
    "styles/globals.css"
    ".gitignore"
    ".npmrc"
    ".env.example"
    "App.tsx"
    "main.tsx"
    "index.html"
)

for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file MISSING!"
        all_good=false
    fi
done

echo ""

# ===========================================
# 2. Verify CSS Configuration
# ===========================================
echo "🎨 Checking CSS configuration..."

# Check postcss.config.js
if grep -q "@tailwindcss/postcss" postcss.config.js 2>/dev/null; then
    echo "   ✅ postcss.config.js has @tailwindcss/postcss"
else
    echo "   ❌ postcss.config.js missing @tailwindcss/postcss!"
    all_good=false
fi

# Check globals.css
if head -n 1 styles/globals.css 2>/dev/null | grep -q "@import.*tailwindcss"; then
    echo "   ✅ globals.css starts with @import 'tailwindcss'"
else
    echo "   ❌ globals.css missing Tailwind import!"
    all_good=false
fi

# Check package.json
if grep -q "@tailwindcss/postcss" package.json 2>/dev/null; then
    echo "   ✅ package.json has @tailwindcss/postcss"
else
    echo "   ❌ package.json missing @tailwindcss/postcss!"
    all_good=false
fi

echo ""

# ===========================================
# 3. Check Port Configuration
# ===========================================
echo "🔌 Checking port configuration..."

if grep -q "port:.*3000" vite.config.ts 2>/dev/null; then
    echo "   ✅ Dev server port is 3000"
else
    echo "   ⚠️  Dev server port is NOT 3000"
    warnings+=("Port might not be 3000")
fi

echo ""

# ===========================================
# 4. Verify .env Protection
# ===========================================
echo "🔐 Checking environment security..."

# Check .gitignore has .env
if grep -q "\.env" .gitignore 2>/dev/null; then
    echo "   ✅ .gitignore protects .env files"
else
    echo "   ❌ .gitignore does NOT protect .env!"
    all_good=false
fi

# Check if .env exists
if [ -f ".env" ]; then
    echo "   ✅ .env file exists"
    
    # Check if .env has placeholders
    if grep -q "your-project-id\|your-anon-key-here" .env 2>/dev/null; then
        echo "   ⚠️  .env still has placeholder values!"
        warnings+=(".env needs real Supabase credentials")
    else
        echo "   ✅ .env appears to have real values"
    fi
else
    echo "   ⚠️  .env file not found (will use .env.example)"
    warnings+=("Create .env file and add Supabase credentials")
fi

# Check .env.example exists
if [ -f ".env.example" ]; then
    echo "   ✅ .env.example exists (template)"
else
    echo "   ❌ .env.example MISSING!"
    all_good=false
fi

echo ""

# ===========================================
# 5. Check Git Status
# ===========================================
echo "📦 Checking Git status..."

# Check if .env is tracked by Git
if git ls-files 2>/dev/null | grep -q "^\.env$"; then
    echo "   ❌ DANGER: .env is tracked by Git!"
    echo "   Run: git rm --cached .env"
    all_good=false
else
    echo "   ✅ .env is NOT tracked by Git (good!)"
fi

# Check if .env.example is tracked
if git ls-files 2>/dev/null | grep -q "\.env\.example"; then
    echo "   ✅ .env.example IS tracked (good!)"
else
    echo "   ⚠️  .env.example not tracked yet"
fi

# Check if .gitignore is tracked
if git ls-files 2>/dev/null | grep -q "\.gitignore"; then
    echo "   ✅ .gitignore IS tracked (good!)"
else
    echo "   ⚠️  .gitignore not tracked yet"
fi

echo ""

# ===========================================
# 6. Check Dependencies
# ===========================================
echo "📚 Checking dependencies..."

if [ -d "node_modules/@tailwindcss/postcss" ]; then
    echo "   ✅ @tailwindcss/postcss installed"
else
    echo "   ⚠️  @tailwindcss/postcss not installed"
    echo "   Run: npm install"
    warnings+=("Run npm install before testing")
fi

if [ -d "node_modules" ]; then
    echo "   ✅ node_modules exists"
else
    echo "   ⚠️  node_modules not found"
    echo "   Run: npm install"
    warnings+=("Run npm install")
fi

echo ""

# ===========================================
# Summary
# ===========================================
echo "========================================="
echo ""

if [ "$all_good" = true ] && [ ${#warnings[@]} -eq 0 ]; then
    echo "✅ ALL CHECKS PASSED! Ready to push!"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. npm install (if not done)"
    echo "   2. npm run dev (test locally)"
    echo "   3. git add ."
    echo "   4. git status (verify .env NOT listed)"
    echo "   5. git commit -m 'feat: Complete setup'"
    echo "   6. git push origin main"
    echo ""
    
elif [ "$all_good" = true ] && [ ${#warnings[@]} -gt 0 ]; then
    echo "⚠️  WARNINGS (not critical):"
    for warning in "${warnings[@]}"; do
        echo "   - $warning"
    done
    echo ""
    echo "✅ You can still push, but consider fixing warnings"
    echo ""
    
else
    echo "❌ CRITICAL ISSUES FOUND!"
    echo ""
    echo "Fix the issues above before pushing!"
    echo ""
    echo "Need help? Read:"
    echo "   - CSS_FIX_GUIDE.md"
    echo "   - ENV_SETUP_GUIDE.md"
    echo "   - START_HERE.md"
    echo ""
fi

# ===========================================
# Quick Commands
# ===========================================
echo "📋 Quick Commands:"
echo ""
echo "Install dependencies:"
echo "   npm install"
echo ""
echo "Test locally:"
echo "   npm run dev"
echo "   Open: http://localhost:3000"
echo ""
echo "Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'feat: Complete configuration'"
echo "   git push origin main"
echo ""
echo "Remove .env from Git (if tracked):"
echo "   git rm --cached .env"
echo "   git commit -m 'chore: Remove .env from tracking'"
echo ""

echo "========================================="
echo ""
