# ============================================
# LesCatur - Ready to Push Verification
# ============================================
# This script verifies everything is correct before pushing to Git

Write-Host ""
Write-Host "🚀 LesCatur - Ready to Push Verification" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true
$warnings = @()

# ===========================================
# 1. Check Critical Files Exist
# ===========================================
Write-Host "📁 Checking critical files..." -ForegroundColor Yellow

$criticalFiles = @(
    "package.json",
    "vite.config.ts",
    "postcss.config.js",
    "styles/globals.css",
    ".gitignore",
    ".npmrc",
    ".env.example",
    "App.tsx",
    "main.tsx",
    "index.html"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file MISSING!" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""

# ===========================================
# 2. Verify CSS Configuration
# ===========================================
Write-Host "🎨 Checking CSS configuration..." -ForegroundColor Yellow

# Check postcss.config.js
$postcssContent = Get-Content "postcss.config.js" -Raw
if ($postcssContent -match '@tailwindcss/postcss') {
    Write-Host "   ✅ postcss.config.js has @tailwindcss/postcss" -ForegroundColor Green
} else {
    Write-Host "   ❌ postcss.config.js missing @tailwindcss/postcss!" -ForegroundColor Red
    $allGood = $false
}

# Check globals.css
$cssContent = Get-Content "styles/globals.css" -First 1
if ($cssContent -match '@import.*tailwindcss') {
    Write-Host "   ✅ globals.css starts with @import 'tailwindcss'" -ForegroundColor Green
} else {
    Write-Host "   ❌ globals.css missing Tailwind import!" -ForegroundColor Red
    $allGood = $false
}

# Check package.json
$packageContent = Get-Content "package.json" -Raw
if ($packageContent -match '@tailwindcss/postcss') {
    Write-Host "   ✅ package.json has @tailwindcss/postcss" -ForegroundColor Green
} else {
    Write-Host "   ❌ package.json missing @tailwindcss/postcss!" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# ===========================================
# 3. Check Port Configuration
# ===========================================
Write-Host "🔌 Checking port configuration..." -ForegroundColor Yellow

$viteContent = Get-Content "vite.config.ts" -Raw
if ($viteContent -match 'port:\s*3000') {
    Write-Host "   ✅ Dev server port is 3000" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Dev server port is NOT 3000" -ForegroundColor Yellow
    $warnings += "Port might not be 3000"
}

Write-Host ""

# ===========================================
# 4. Verify .env Protection
# ===========================================
Write-Host "🔐 Checking environment security..." -ForegroundColor Yellow

# Check .gitignore has .env
$gitignoreContent = Get-Content ".gitignore" -Raw
if ($gitignoreContent -match '\.env') {
    Write-Host "   ✅ .gitignore protects .env files" -ForegroundColor Green
} else {
    Write-Host "   ❌ .gitignore does NOT protect .env!" -ForegroundColor Red
    $allGood = $false
}

# Check if .env exists
if (Test-Path ".env") {
    Write-Host "   ✅ .env file exists" -ForegroundColor Green
    
    # Check if .env has placeholders
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match 'your-project-id' -or $envContent -match 'your-anon-key-here') {
        Write-Host "   ⚠️  .env still has placeholder values!" -ForegroundColor Yellow
        $warnings += ".env needs real Supabase credentials"
    } else {
        Write-Host "   ✅ .env appears to have real values" -ForegroundColor Green
    }
} else {
    Write-Host "   ⚠️  .env file not found (will use .env.example)" -ForegroundColor Yellow
    $warnings += "Create .env file and add Supabase credentials"
}

# Check .env.example exists
if (Test-Path ".env.example") {
    Write-Host "   ✅ .env.example exists (template)" -ForegroundColor Green
} else {
    Write-Host "   ❌ .env.example MISSING!" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# ===========================================
# 5. Check Git Status
# ===========================================
Write-Host "📦 Checking Git status..." -ForegroundColor Yellow

# Check if .env is tracked by Git
$gitFiles = git ls-files 2>$null
if ($gitFiles -match '^\.env$') {
    Write-Host "   ❌ DANGER: .env is tracked by Git!" -ForegroundColor Red
    Write-Host "   Run: git rm --cached .env" -ForegroundColor Red
    $allGood = $false
} else {
    Write-Host "   ✅ .env is NOT tracked by Git (good!)" -ForegroundColor Green
}

# Check if .env.example is tracked
if ($gitFiles -match '\.env\.example') {
    Write-Host "   ✅ .env.example IS tracked (good!)" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  .env.example not tracked yet" -ForegroundColor Yellow
}

# Check if .gitignore is tracked
if ($gitFiles -match '\.gitignore') {
    Write-Host "   ✅ .gitignore IS tracked (good!)" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  .gitignore not tracked yet" -ForegroundColor Yellow
}

Write-Host ""

# ===========================================
# 6. Check Dependencies
# ===========================================
Write-Host "📚 Checking dependencies..." -ForegroundColor Yellow

if (Test-Path "node_modules/@tailwindcss/postcss") {
    Write-Host "   ✅ @tailwindcss/postcss installed" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  @tailwindcss/postcss not installed" -ForegroundColor Yellow
    Write-Host "   Run: npm install" -ForegroundColor Yellow
    $warnings += "Run npm install before testing"
}

if (Test-Path "node_modules") {
    Write-Host "   ✅ node_modules exists" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  node_modules not found" -ForegroundColor Yellow
    Write-Host "   Run: npm install" -ForegroundColor Yellow
    $warnings += "Run npm install"
}

Write-Host ""

# ===========================================
# Summary
# ===========================================
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

if ($allGood -and $warnings.Count -eq 0) {
    Write-Host "✅ ALL CHECKS PASSED! Ready to push!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Next steps:" -ForegroundColor Cyan
    Write-Host "   1. npm install (if not done)" -ForegroundColor White
    Write-Host "   2. npm run dev (test locally)" -ForegroundColor White
    Write-Host "   3. git add ." -ForegroundColor White
    Write-Host "   4. git status (verify .env NOT listed)" -ForegroundColor White
    Write-Host "   5. git commit -m 'feat: Complete setup'" -ForegroundColor White
    Write-Host "   6. git push origin main" -ForegroundColor White
    Write-Host ""
    
} elseif ($allGood -and $warnings.Count -gt 0) {
    Write-Host "⚠️  WARNINGS (not critical):" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "   - $warning" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "✅ You can still push, but consider fixing warnings" -ForegroundColor Green
    Write-Host ""
    
} else {
    Write-Host "❌ CRITICAL ISSUES FOUND!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Fix the issues above before pushing!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Need help? Read:" -ForegroundColor Yellow
    Write-Host "   - CSS_FIX_GUIDE.md" -ForegroundColor White
    Write-Host "   - ENV_SETUP_GUIDE.md" -ForegroundColor White
    Write-Host "   - START_HERE.md" -ForegroundColor White
    Write-Host ""
}

# ===========================================
# Quick Commands
# ===========================================
Write-Host "📋 Quick Commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Install dependencies:" -ForegroundColor Yellow
Write-Host "   npm install" -ForegroundColor White
Write-Host ""
Write-Host "Test locally:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor White
Write-Host "   Open: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Push to GitHub:" -ForegroundColor Yellow
Write-Host "   git add ." -ForegroundColor White
Write-Host "   git commit -m 'feat: Complete configuration'" -ForegroundColor White
Write-Host "   git push origin main" -ForegroundColor White
Write-Host ""
Write-Host "Remove .env from Git (if tracked):" -ForegroundColor Yellow
Write-Host "   git rm --cached .env" -ForegroundColor White
Write-Host "   git commit -m 'chore: Remove .env from tracking'" -ForegroundColor White
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
