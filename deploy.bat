@echo off
echo [33m Building project... [0m
call npm run build
if errorlevel 1 (
    echo [31m Build failed! [0m
    pause
    exit /b 1
)

echo [33m Checking dist directory... [0m
if not exist "dist" (
    echo [31m Build directory 'dist' not found! [0m
    pause
    exit /b 1
)

echo [33m Deploying to Firebase... [0m
call firebase deploy --only hosting
if errorlevel 1 (
    echo [31m Deploy failed! [0m
    pause
    exit /b 1
)

echo [32m Successfully deployed! [0m
echo.
echo [33m Your site is live at: [0m
echo https://projekt-9ef39.web.app/
echo.
echo [33m Press any key to close... [0m
pause >nul 