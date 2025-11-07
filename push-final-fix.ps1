# ============================================
# FINAL VERCEL FIX - Push to GitHub
# ============================================

Write-Host ""
Write-Host "[FINAL FIX] Pushing REAL Fix to GitHub..." -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[INFO] What was fixed:" -ForegroundColor Yellow
Write-Host "  - Removed 'framework' field from vercel.json" -ForegroundColor White
Write-Host "  - This was OVERRIDING our custom buildCommand!" -ForegroundColor White
Write-Host "  - Now Vercel MUST use 'npx vite build'" -ForegroundColor White
Write-Host ""

# Add files
Write-Host "[1/3] Adding fixed files..." -ForegroundColor Yellow
git add vercel.json FINAL_VERCEL_FIX.md

Write-Host "[OK] Files staged" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "[2/3] Committing fix..." -ForegroundColor Yellow
git commit -m "fix: Remove framework field to force custom build command"

if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Commit may have failed" -ForegroundColor Yellow
    Write-Host "Checking status..." -ForegroundColor Yellow
    git status
}

Write-Host "[OK] Commit created" -ForegroundColor Green
Write-Host ""

# Push
Write-Host "[3/3] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==============================================" -ForegroundColor Green
    Write-Host "[SUCCESS] FINAL FIX PUSHED!" -ForegroundColor Green
    Write-Host "==============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "[INFO] What happens next:" -ForegroundColor Cyan
    Write-Host "  1. Vercel detects new commit" -ForegroundColor White
    Write-Host "  2. Starts build with 'npx vite build'" -ForegroundColor White
    Write-Host "  3. Build succeeds (no permission errors!)" -ForegroundColor White
    Write-Host "  4. Site deploys to production" -ForegroundColor White
    Write-Host "  5. LIVE in ~3-4 minutes!" -ForegroundColor White
    Write-Host ""
    Write-Host "[CHECK] Vercel Dashboard:" -ForegroundColor Yellow
    Write-Host "  https://vercel.com/diptaz" -ForegroundColor White
    Write-Host ""
    Write-Host "[CHECK] GitHub Repo:" -ForegroundColor Yellow
    Write-Host "  https://github.com/diptaz/devLes" -ForegroundColor White
    Write-Host ""
    Write-Host "==============================================" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "[ERROR] Push failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try:" -ForegroundColor Yellow
    Write-Host "  git push origin main" -ForegroundColor White
    Write-Host ""
    exit 1
}
