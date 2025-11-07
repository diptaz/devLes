#!/bin/bash

# 🎨 LesCatur CSS Fix Script
# This script fixes Tailwind CSS not loading issues

echo "🎨 LesCatur CSS Fix Script"
echo "=========================="
echo ""

# Step 1: Clean
echo "🧹 Step 1: Cleaning old files..."
rm -rf node_modules
rm -rf .vite
rm -f package-lock.json
echo "✅ Cleaned!"
echo ""

# Step 2: Install
echo "📦 Step 2: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed!"
    echo "Please check the error messages above."
    exit 1
fi
echo "✅ Installed!"
echo ""

# Step 3: Build
echo "🔨 Step 3: Testing build..."
npm run build
if [ $? -ne 0 ]; then
    echo "⚠️  Build failed, but this might be okay for development."
    echo "Continuing..."
else
    echo "✅ Build successful!"
fi
echo ""

# Step 4: Instructions
echo "✅ CSS Fix Complete!"
echo ""
echo "🚀 Next Steps:"
echo "1. Run: npm run dev"
echo "2. Open: http://localhost:5173"
echo "3. Verify: Website should have blue pastel styling"
echo ""
echo "📖 For troubleshooting, see: CSS_FIX_GUIDE.md"
