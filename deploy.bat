@echo off
setlocal EnableDelayedExpansion

:: Farby
set "GREEN=[32m"
set "YELLOW=[33m"
set "RED=[31m"
set "NC=[0m"

:: 1. Build
echo %YELLOW%🔨 Building project...%NC%
npm run build || (
    echo %RED%❌ Build failed%NC%
    exit /b 1
)

:: 2. Deploy
echo %YELLOW%🚀 Deploying to Firebase...%NC%
firebase deploy || (
    echo %RED%❌ Deploy failed%NC%
    exit /b 1
)

:: 3. Hotovo
echo %GREEN%✅ Successfully deployed to Firebase!%NC% 