# 🔍 LesCatur Configuration Checker (PowerShell)
# Checks if all important configuration files are correct

Write-Host "🔍 LesCatur Configuration Checker" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$ERRORS = 0
$WARNINGS = 0

# Check 1: postcss.config.js
Write-Host "📝 Checking postcss.config.js..." -ForegroundColor Yellow
if (Test-Path "postcss.config.js") {
    $content = Get-Content "postcss.config.js" -Raw
    if ($content -match "@tailwindcss/postcss") {
        Write-Host "✅ postcss.config.js is correct" -ForegroundColor Green
    } else {
        Write-Host "❌ postcss.config.js is WRONG! Should use @tailwindcss/postcss" -ForegroundColor Red
        $ERRORS++
    }
} else {
    Write-Host "❌ postcss.config.js NOT FOUND!" -ForegroundColor Red
    $ERRORS++
}
Write-Host ""

# Check 2: package.json
Write-Host "📦 Checking package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $content = Get-Content "package.json" -Raw
    if ($content -match "@tailwindcss/postcss") {
        Write-Host "✅ package.json has @tailwindcss/postcss dependency" -ForegroundColor Green
    } else {
        Write-Host "❌ package.json MISSING @tailwindcss/postcss dependency!" -ForegroundColor Red
        $ERRORS++
    }
} else {
    Write-Host "❌ package.json NOT FOUND!" -ForegroundColor Red
    $ERRORS++
}
Write-Host ""

# Check 3: styles/globals.css
Write-Host "🎨 Checking styles/globals.css..." -ForegroundColor Yellow
if (Test-Path "styles/globals.css") {
    $firstLine = Get-Content "styles/globals.css" -First 1
    if ($firstLine -eq '@import "tailwindcss";') {
        Write-Host "✅ globals.css imports Tailwind correctly" -ForegroundColor Green
    } else {
        Write-Host "❌ globals.css first line is WRONG!" -ForegroundColor Red
        Write-Host "   Expected: @import `"tailwindcss`";" -ForegroundColor Gray
        Write-Host "   Got: $firstLine" -ForegroundColor Gray
        $ERRORS++
    }
} else {
    Write-Host "❌ styles/globals.css NOT FOUND!" -ForegroundColor Red
    $ERRORS++
}
Write-Host ""

# Check 4: .env file
Write-Host "🔐 Checking environment files..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✅ .env file exists" -ForegroundColor Green
    $content = Get-Content ".env" -Raw
    if ($content -match "VITE_SUPABASE_URL" -and $content -match "VITE_SUPABASE_ANON_KEY") {
        Write-Host "✅ .env has Supabase credentials" -ForegroundColor Green
    } else {
        Write-Host "⚠️  .env might be missing Supabase credentials" -ForegroundColor Yellow
        $WARNINGS++
    }
} else {
    Write-Host "⚠️  .env file not found (you need to create it from .env.example)" -ForegroundColor Yellow
    $WARNINGS++
}

if (Test-Path ".env.example") {
    Write-Host "✅ .env.example exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env.example not found" -ForegroundColor Yellow
    $WARNINGS++
}
Write-Host ""

# Check 5: .gitignore
Write-Host "🚫 Checking .gitignore..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    Write-Host "✅ .gitignore exists" -ForegroundColor Green
    $content = Get-Content ".gitignore" -Raw
    if ($content -match "node_modules") {
        Write-Host "✅ .gitignore has node_modules" -ForegroundColor Green
    } else {
        Write-Host "⚠️  .gitignore missing node_modules" -ForegroundColor Yellow
        $WARNINGS++
    }
    if ($content -match "\.env") {
        Write-Host "✅ .gitignore has .env" -ForegroundColor Green
    } else {
        Write-Host "❌ .gitignore MISSING .env (SECURITY RISK!)" -ForegroundColor Red
        $ERRORS++
    }
} else {
    Write-Host "❌ .gitignore NOT FOUND!" -ForegroundColor Red
    $ERRORS++
}
Write-Host ""

# Check 6: node_modules
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules exists" -ForegroundColor Green
    if (Test-Path "node_modules/@tailwindcss/postcss") {
        Write-Host "✅ @tailwindcss/postcss is installed" -ForegroundColor Green
    } else {
        Write-Host "❌ @tailwindcss/postcss NOT installed!" -ForegroundColor Red
        Write-Host "   Run: npm install" -ForegroundColor Gray
        $ERRORS++
    }
} else {
    Write-Host "⚠️  node_modules not found. Run: npm install" -ForegroundColor Yellow
    $WARNINGS++
}
Write-Host ""

# Check 7: Git status
Write-Host "📊 Checking Git status..." -ForegroundColor Yellow
try {
    git rev-parse --git-dir 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Git repository initialized" -ForegroundColor Green
        
        # Check remote
        $remotes = git remote -v 2>$null
        if ($remotes -match "origin") {
            Write-Host "✅ Git remote 'origin' configured" -ForegroundColor Green
            git remote -v | Select-String "origin"
        } else {
            Write-Host "⚠️  No git remote configured" -ForegroundColor Yellow
            $WARNINGS++
        }
        
        # Check uncommitted changes
        $status = git status --porcelain 2>$null
        if ([string]::IsNullOrEmpty($status)) {
            Write-Host "✅ No uncommitted changes" -ForegroundColor Green
        } else {
            Write-Host "⚠️  You have uncommitted changes:" -ForegroundColor Yellow
            git status --short
            $WARNINGS++
        }
    }
} catch {
    Write-Host "⚠️  Not a git repository" -ForegroundColor Yellow
    $WARNINGS++
}
Write-Host ""

# Summary
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host ""

if ($ERRORS -eq 0 -and $WARNINGS -eq 0) {
    Write-Host "✅ All checks passed! Configuration is correct." -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: npm install (if not done)" -ForegroundColor White
    Write-Host "2. Run: npm run dev" -ForegroundColor White
    Write-Host "3. Open: http://localhost:5173" -ForegroundColor White
    Write-Host "4. Push to GitHub: git push origin main" -ForegroundColor White
} elseif ($ERRORS -eq 0) {
    Write-Host "⚠️  Configuration OK with $WARNINGS warning(s)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You can proceed, but check warnings above." -ForegroundColor Gray
} else {
    Write-Host "❌ Found $ERRORS error(s) and $WARNINGS warning(s)" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Fix required! Please:" -ForegroundColor Yellow
    Write-Host "1. Read CSS_FIX_GUIDE.md" -ForegroundColor White
    Write-Host "2. Run fix script: .\fix-css.ps1" -ForegroundColor White
    Write-Host "3. Or manually fix errors shown above" -ForegroundColor White
    exit 1
}
