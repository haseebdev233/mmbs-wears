#!/bin/bash
# Cleanup and setup script for MMB's Wears frontend

echo "🧹 Cleaning up temporary files..."

cd "d:/Desktop/Mmb's Wears/src"

# Remove temporary app files
rm -f App-new.jsx AppNew.jsx 2>/dev/null

# Replace corrupted App.jsx with clean version
if [ -f "AppClean.jsx" ]; then
  mv AppClean.jsx App.jsx
  echo "✓ App.jsx restored"
fi

# Remove backup
rm -f App.jsx.backup 2>/dev/null

echo "✅ Cleanup complete!"
echo ""
echo "📦 Ready to build. Run: npm run dev"
