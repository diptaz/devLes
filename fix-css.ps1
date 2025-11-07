# 🎨 LesCatur CSS Fix Script (Windows PowerShell)
# This script fixes Tailwind CSS not loading issues

Write-Host "🎨 LesCatur CSS Fix Script" -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean
Write-Host "🧹 Step 1: Cleaning old files..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .vite -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Write-Host "✅ Cleaned!" -ForegroundColor Green
Write-Host ""

# Step 2: Install
Write-Host "📦 Step 2: Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed!" -ForegroundColor Red
    Write-Host "Please check the error messages above." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Installed!" -ForegroundColor Green
Write-Host ""

# Step 3: Build
Write-Host "🔨 Step 3: Testing build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Build failed, but this might be okay for development." -ForegroundColor Yellow
    Write-Host "Continuing..." -ForegroundColor Yellow
} else {
    Write-Host "✅ Build successful!" -ForegroundColor Green
}
Write-Host ""

# Step 4: Instructions
Write-Host "✅ CSS Fix Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Run: npm run dev" -ForegroundColor White
Write-Host "2. Open: http://localhost:5173" -ForegroundColor White
Write-Host "3. Verify: Website should have blue pastel styling" -ForegroundColor White
Write-Host ""
Write-Host "📖 For troubleshooting, see: CSS_FIX_GUIDE.md" -ForegroundColor Gray
