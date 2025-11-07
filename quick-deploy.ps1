# ============================================
# LesCatur - Quick Deploy Script (PowerShell)
# ============================================
# Everything in one script!

Write-Host ""
Write-Host "[DEPLOY] LesCatur - Quick Deploy to GitHub & Vercel" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install dependencies
Write-Host "[1/3] Step 1: Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] npm install failed!" -ForegroundColor Red
    exit 1
}

Write-Host "[OK] Dependencies installed!" -ForegroundColor Green
Write-Host ""

# Step 2: Git setup
Write-Host "[2/3] Step 2: Setting up Git..." -ForegroundColor Yellow

# Initialize git if not already
if (-not (Test-Path ".git")) {
    git init
    Write-Host "[OK] Git initialized" -ForegroundColor Green
} else {
    Write-Host "[OK] Git already initialized" -ForegroundColor Green
}

# Add all files
git add .

# Verify .env is not in staging
$stagedFiles = git diff --cached --name-only
if ($stagedFiles -match "^\.env$") {
    Write-Host "[WARNING] .env is staged! Removing..." -ForegroundColor Yellow
    git reset HEAD .env
    git rm --cached .env 2>$null
}

Write-Host ""
Write-Host "[INFO] Files to be committed:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Commit
Write-Host "[COMMIT] Committing changes..." -ForegroundColor Yellow
git commit -m "feat: Initial commit - LesCatur platform with Supabase integration"

if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Nothing to commit or commit failed" -ForegroundColor Yellow
}

# Set branch
git branch -M main
Write-Host "[OK] Branch set to main" -ForegroundColor Green

# Add remote (skip if already exists)
$remotes = git remote
if ($remotes -notcontains "origin") {
    git remote add origin https://github.com/diptaz/devLes.git
    Write-Host "[OK] Remote added" -ForegroundColor Green
} else {
    Write-Host "[OK] Remote already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "[3/3] Step 3: Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[SUCCESS] Code pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "[REPO] Your repo: https://github.com/diptaz/devLes" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host "[ERROR] Push failed! Check the error above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible fixes:" -ForegroundColor Yellow
    Write-Host "1. Check internet connection" -ForegroundColor White
    Write-Host "2. Verify GitHub credentials" -ForegroundColor White
    Write-Host "3. Make sure repo exists: https://github.com/diptaz/devLes" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Step 4: Vercel deployment info
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "[DONE] Git setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "[NEXT] Deploy to Vercel" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: Vercel CLI" -ForegroundColor Yellow
Write-Host "  vercel --prod" -ForegroundColor White
Write-Host ""
Write-Host "Option 2: Vercel Dashboard (Recommended)" -ForegroundColor Yellow
Write-Host "  1. Go to: https://vercel.com/new" -ForegroundColor White
Write-Host "  2. Import: https://github.com/diptaz/devLes" -ForegroundColor White
Write-Host "  3. Add environment variables:" -ForegroundColor White
Write-Host "     VITE_SUPABASE_URL=https://hicojkfoytwflqrvvvbq.supabase.co" -ForegroundColor Gray
Write-Host "     VITE_SUPABASE_ANON_KEY=sb_publishable_gdcLMwahLpzR-2jrqO2UKw_ixoUMHdP" -ForegroundColor Gray
Write-Host "     VITE_APP_ENV=production" -ForegroundColor Gray
Write-Host "  4. Click Deploy!" -ForegroundColor White
Write-Host ""
Write-Host "[GUIDE] Full guide: Read VERCEL_DEPLOY_STEPS.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""
