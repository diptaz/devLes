# ============================================
# Update Port References in Documentation
# From 5173 → 3000
# ============================================

Write-Host "🔄 Updating port references in documentation..." -ForegroundColor Cyan
Write-Host ""

# Files to update
$files = @(
    "README.md",
    "CSS_FIX_GUIDE.md",
    "QUICK_FIX.md",
    "CHANGELOG.md",
    "CSS_FIX_SUMMARY.md",
    "FILES_TO_SYNC.md",
    "GITHUB_SYNC_GUIDE.md",
    "START_HERE.md",
    "ACTION_REQUIRED.md",
    "ENV_SETUP_GUIDE.md",
    "ENV_QUICK_REFERENCE.md",
    "WHATS_NEW.md",
    "SETUP_CHECKLIST.md"
)

$totalUpdated = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "📝 Updating: $file" -ForegroundColor Yellow
        
        $content = Get-Content $file -Raw
        $originalContent = $content
        
        # Replace port references
        $content = $content -replace 'localhost:5173', 'localhost:3000'
        $content = $content -replace 'port 5173', 'port 3000'
        $content = $content -replace 'Port 5173', 'Port 3000'
        $content = $content -replace ':5173', ':3000'
        $content = $content -replace '4173', '3001'
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file -Value $content -NoNewline
            Write-Host "   ✅ Updated!" -ForegroundColor Green
            $totalUpdated++
        } else {
            Write-Host "   ⏭️  No changes needed" -ForegroundColor Gray
        }
    } else {
        Write-Host "   ⚠️  File not found" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✅ Complete! Updated $totalUpdated files" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "   - Port 5173 → 3000 (dev server)"
Write-Host "   - Port 4173 → 3001 (preview server)"
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Verify changes: git diff"
Write-Host "   2. Test: npm run dev"
Write-Host "   3. Check: http://localhost:3000"
Write-Host ""
