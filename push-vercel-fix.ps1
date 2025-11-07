# ============================================
# Push Vercel Build Fix to GitHub
# ============================================

Write-Host ""
Write-Host "[FIX] Pushing Vercel Build Fix to GitHub..." -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Add the fixed files
Write-Host "[1/3] Adding fixed files..." -ForegroundColor Yellow
git add vercel.json VERCEL_BUILD_FIX.md

Write-Host "[OK] Files staged" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "[2/3] Committing fix..." -ForegroundColor Yellow
git commit -m "fix: Vercel build - use npx to fix permission issues"

if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Nothing to commit or commit failed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Possible reasons:" -ForegroundColor Cyan
    Write-Host "1. Files already committed" -ForegroundColor White
    Write-Host "2. No changes detected" -ForegroundColor White
    Write-Host ""
    Write-Host "Trying to push anyway..." -ForegroundColor Yellow
}

Write-Host "[OK] Commit created" -ForegroundColor Green
Write-Host ""

# Push
Write-Host "[3/3] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[SUCCESS] Fix pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "[INFO] Vercel will auto-deploy in ~2-3 minutes" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Check deployment status:" -ForegroundColor Yellow
    Write-Host "https://vercel.com/diptaz/dev-les" -ForegroundColor White
    Write-Host ""
    Write-Host "GitHub repo:" -ForegroundColor Yellow
    Write-Host "https://github.com/diptaz/devLes" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "[ERROR] Push failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try manual push:" -ForegroundColor Yellow
    Write-Host "git push origin main" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""
