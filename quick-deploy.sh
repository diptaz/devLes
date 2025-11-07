#!/bin/bash

# ============================================
# LesCatur - Quick Deploy Script
# ============================================
# Everything in one script!

echo ""
echo "🚀 LesCatur - Quick Deploy to GitHub & Vercel"
echo "=============================================="
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed!"
    exit 1
fi

echo "✅ Dependencies installed!"
echo ""

# Step 2: Git setup
echo "📝 Step 2: Setting up Git..."

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Add all files
git add .

# Verify .env is not in staging
if git diff --cached --name-only | grep -q "^\.env$"; then
    echo "⚠️  WARNING: .env is staged! Removing..."
    git reset HEAD .env
    git rm --cached .env 2>/dev/null
fi

echo ""
echo "📋 Files to be committed:"
git status --short
echo ""

# Commit
echo "💾 Committing changes..."
git commit -m "feat: Initial commit - LesCatur platform with Supabase integration"

if [ $? -ne 0 ]; then
    echo "⚠️  Nothing to commit or commit failed"
fi

# Set branch
git branch -M main
echo "✅ Branch set to main"

# Add remote (skip if already exists)
if ! git remote | grep -q "origin"; then
    git remote add origin https://github.com/diptaz/devLes.git
    echo "✅ Remote added"
else
    echo "✅ Remote already exists"
fi

echo ""
echo "🚀 Step 3: Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Code pushed to GitHub!"
    echo ""
    echo "📍 Your repo: https://github.com/diptaz/devLes"
    echo ""
else
    echo "❌ Push failed! Check the error above."
    echo ""
    echo "Possible fixes:"
    echo "1. Check internet connection"
    echo "2. Verify GitHub credentials"
    echo "3. Make sure repo exists: https://github.com/diptaz/devLes"
    echo ""
    exit 1
fi

# Step 4: Vercel deployment info
echo "=============================================="
echo ""
echo "🎉 Git setup complete!"
echo ""
echo "📋 Next: Deploy to Vercel"
echo ""
echo "Option 1: Vercel CLI"
echo "  vercel --prod"
echo ""
echo "Option 2: Vercel Dashboard (Recommended)"
echo "  1. Go to: https://vercel.com/new"
echo "  2. Import: https://github.com/diptaz/devLes"
echo "  3. Add environment variables:"
echo "     VITE_SUPABASE_URL=https://hicojkfoytwflqrvvvbq.supabase.co"
echo "     VITE_SUPABASE_ANON_KEY=sb_publishable_gdcLMwahLpzR-2jrqO2UKw_ixoUMHdP"
echo "     VITE_APP_ENV=production"
echo "  4. Click Deploy!"
echo ""
echo "📖 Full guide: Read VERCEL_DEPLOY_STEPS.md"
echo ""
echo "=============================================="
echo ""
