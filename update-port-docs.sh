#!/bin/bash

# ============================================
# Update Port References in Documentation
# From 5173 → 3000
# ============================================

echo "🔄 Updating port references in documentation..."
echo ""

# Files to update
files=(
    "README.md"
    "CSS_FIX_GUIDE.md"
    "QUICK_FIX.md"
    "CHANGELOG.md"
    "CSS_FIX_SUMMARY.md"
    "FILES_TO_SYNC.md"
    "GITHUB_SYNC_GUIDE.md"
    "START_HERE.md"
    "ACTION_REQUIRED.md"
    "ENV_SETUP_GUIDE.md"
    "ENV_QUICK_REFERENCE.md"
    "WHATS_NEW.md"
    "SETUP_CHECKLIST.md"
)

total_updated=0

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "📝 Updating: $file"
        
        # Create backup
        cp "$file" "$file.bak"
        
        # Replace port references
        sed -i.tmp 's/localhost:5173/localhost:3000/g' "$file"
        sed -i.tmp 's/port 5173/port 3000/g' "$file"
        sed -i.tmp 's/Port 5173/Port 3000/g' "$file"
        sed -i.tmp 's/:5173/:3000/g' "$file"
        sed -i.tmp 's/4173/3001/g' "$file"
        
        # Remove temp file
        rm -f "$file.tmp"
        
        # Check if file changed
        if ! cmp -s "$file" "$file.bak"; then
            echo "   ✅ Updated!"
            rm "$file.bak"
            ((total_updated++))
        else
            echo "   ⏭️  No changes needed"
            mv "$file.bak" "$file"
        fi
    else
        echo "   ⚠️  File not found: $file"
    fi
done

echo ""
echo "✅ Complete! Updated $total_updated files"
echo ""
echo "📋 Summary:"
echo "   - Port 5173 → 3000 (dev server)"
echo "   - Port 4173 → 3001 (preview server)"
echo ""
echo "🚀 Next steps:"
echo "   1. Verify changes: git diff"
echo "   2. Test: npm run dev"
echo "   3. Check: http://localhost:3000"
echo ""
