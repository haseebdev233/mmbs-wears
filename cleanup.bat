@echo off
REM Cleanup and setup script for MMB's Wears frontend

echo Cleaning up temporary files...

cd /d "d:\Desktop\Mmb's Wears\src"

REM Remove temporary app files
if exist App-new.jsx del App-new.jsx >nul 2>&1
if exist AppNew.jsx del AppNew.jsx >nul 2>&1

REM Replace corrupted App.jsx with clean version
if exist AppClean.jsx (
  del App.jsx >nul 2>&1
  ren AppClean.jsx App.jsx
  echo App.jsx restored
)

REM Remove backup
if exist App.jsx.backup del App.jsx.backup >nul 2>&1

echo.
echo Cleanup complete!
echo.
echo Ready to build. Run: npm run dev
