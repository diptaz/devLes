#!/bin/bash

# 🔍 LesCatur Configuration Checker
# Checks if all important configuration files are correct

echo "🔍 LesCatur Configuration Checker"
echo "=================================="
echo ""

ERRORS=0
WARNINGS=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: postcss.config.js
echo "📝 Checking postcss.config.js..."
if [ -f "postcss.config.js" ]; then
    if grep -q "@tailwindcss/postcss" postcss.config.js; then
        echo -e "${GREEN}✅ postcss.config.js is correct${NC}"
    else
        echo -e "${RED}❌ postcss.config.js is WRONG! Should use @tailwindcss/postcss${NC}"
        ERRORS=$((ERRORS+1))
    fi
else
    echo -e "${RED}❌ postcss.config.js NOT FOUND!${NC}"
    ERRORS=$((ERRORS+1))
fi
echo ""

# Check 2: package.json
echo "📦 Checking package.json..."
if [ -f "package.json" ]; then
    if grep -q "@tailwindcss/postcss" package.json; then
        echo -e "${GREEN}✅ package.json has @tailwindcss/postcss dependency${NC}"
    else
        echo -e "${RED}❌ package.json MISSING @tailwindcss/postcss dependency!${NC}"
        ERRORS=$((ERRORS+1))
    fi
else
    echo -e "${RED}❌ package.json NOT FOUND!${NC}"
    ERRORS=$((ERRORS+1))
fi
echo ""

# Check 3: styles/globals.css
echo "🎨 Checking styles/globals.css..."
if [ -f "styles/globals.css" ]; then
    FIRST_LINE=$(head -n 1 styles/globals.css)
    if [[ "$FIRST_LINE" == '@import "tailwindcss";' ]]; then
        echo -e "${GREEN}✅ globals.css imports Tailwind correctly${NC}"
    else
        echo -e "${RED}❌ globals.css first line is WRONG!${NC}"
        echo "   Expected: @import \"tailwindcss\";"
        echo "   Got: $FIRST_LINE"
        ERRORS=$((ERRORS+1))
    fi
else
    echo -e "${RED}❌ styles/globals.css NOT FOUND!${NC}"
    ERRORS=$((ERRORS+1))
fi
echo ""

# Check 4: .env file
echo "🔐 Checking environment files..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file exists${NC}"
    if grep -q "VITE_SUPABASE_URL" .env && grep -q "VITE_SUPABASE_ANON_KEY" .env; then
        echo -e "${GREEN}✅ .env has Supabase credentials${NC}"
    else
        echo -e "${YELLOW}⚠️  .env might be missing Supabase credentials${NC}"
        WARNINGS=$((WARNINGS+1))
    fi
else
    echo -e "${YELLOW}⚠️  .env file not found (you need to create it from .env.example)${NC}"
    WARNINGS=$((WARNINGS+1))
fi

if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ .env.example exists${NC}"
else
    echo -e "${YELLOW}⚠️  .env.example not found${NC}"
    WARNINGS=$((WARNINGS+1))
fi
echo ""

# Check 5: .gitignore
echo "🚫 Checking .gitignore..."
if [ -f ".gitignore" ]; then
    echo -e "${GREEN}✅ .gitignore exists${NC}"
    if grep -q "node_modules" .gitignore; then
        echo -e "${GREEN}✅ .gitignore has node_modules${NC}"
    else
        echo -e "${YELLOW}⚠️  .gitignore missing node_modules${NC}"
        WARNINGS=$((WARNINGS+1))
    fi
    if grep -q "\.env" .gitignore; then
        echo -e "${GREEN}✅ .gitignore has .env${NC}"
    else
        echo -e "${RED}❌ .gitignore MISSING .env (SECURITY RISK!)${NC}"
        ERRORS=$((ERRORS+1))
    fi
else
    echo -e "${RED}❌ .gitignore NOT FOUND!${NC}"
    ERRORS=$((ERRORS+1))
fi
echo ""

# Check 6: node_modules
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules exists${NC}"
    if [ -d "node_modules/@tailwindcss/postcss" ]; then
        echo -e "${GREEN}✅ @tailwindcss/postcss is installed${NC}"
    else
        echo -e "${RED}❌ @tailwindcss/postcss NOT installed!${NC}"
        echo "   Run: npm install"
        ERRORS=$((ERRORS+1))
    fi
else
    echo -e "${YELLOW}⚠️  node_modules not found. Run: npm install${NC}"
    WARNINGS=$((WARNINGS+1))
fi
echo ""

# Check 7: Git status
echo "📊 Checking Git status..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Git repository initialized${NC}"
    
    # Check remote
    if git remote -v | grep -q "origin"; then
        echo -e "${GREEN}✅ Git remote 'origin' configured${NC}"
        git remote -v | grep "origin"
    else
        echo -e "${YELLOW}⚠️  No git remote configured${NC}"
        WARNINGS=$((WARNINGS+1))
    fi
    
    # Check uncommitted changes
    if [ -z "$(git status --porcelain)" ]; then
        echo -e "${GREEN}✅ No uncommitted changes${NC}"
    else
        echo -e "${YELLOW}⚠️  You have uncommitted changes:${NC}"
        git status --short
        WARNINGS=$((WARNINGS+1))
    fi
else
    echo -e "${YELLOW}⚠️  Not a git repository${NC}"
    WARNINGS=$((WARNINGS+1))
fi
echo ""

# Summary
echo "=================================="
echo "📊 Summary:"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Configuration is correct.${NC}"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Run: npm install (if not done)"
    echo "2. Run: npm run dev"
    echo "3. Open: http://localhost:5173"
    echo "4. Push to GitHub: git push origin main"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Configuration OK with $WARNINGS warning(s)${NC}"
    echo ""
    echo "You can proceed, but check warnings above."
else
    echo -e "${RED}❌ Found $ERRORS error(s) and $WARNINGS warning(s)${NC}"
    echo ""
    echo "🔧 Fix required! Please:"
    echo "1. Read CSS_FIX_GUIDE.md"
    echo "2. Run fix script: ./fix-css.sh"
    echo "3. Or manually fix errors shown above"
    exit 1
fi
