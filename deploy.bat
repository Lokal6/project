@echo off
setlocal EnableDelayedExpansion

:: Farby pre Windows konzolu
set "GREEN=[32m"
set "YELLOW=[33m"
set "RED=[31m"
set "NC=[0m"

:: Nastavenie NODE_OPTIONS pre odstránenie deprecation varovaní
set NODE_OPTIONS=--no-deprecation

:deploy_loop
cls
echo %YELLOW%Spúšťam automatický deployment...%NC%

:: Kontrola zmien v git
git fetch origin main
git diff HEAD origin/main --quiet
if %ERRORLEVEL% equ 0 (
    echo %YELLOW%Žiadne nové zmeny na GitHub...%NC%
) else (
    echo %YELLOW%Nové zmeny detekované, sťahujem...%NC%
    git pull origin main
)

:: Build projektu
echo %YELLOW%Building project...%NC%
call npm run build
if %ERRORLEVEL% neq 0 (
    echo %RED%Build failed!%NC%
    timeout /t 5 /nobreak
    goto deploy_loop
)

:: Kontrola dist priečinka
echo %YELLOW%Checking dist directory...%NC%
if not exist "dist" (
    echo %RED%dist directory not found!%NC%
    timeout /t 5 /nobreak
    goto deploy_loop
)

:: Deploy na Firebase
echo %YELLOW%Deploying to Firebase...%NC%
call firebase deploy
if %ERRORLEVEL% neq 0 (
    echo %RED%Deploy failed!%NC%
    timeout /t 5 /nobreak
    goto deploy_loop
)

echo %GREEN%Successfully deployed%NC%

echo %YELLOW%Your site is live at:%NC%
echo https://projekt-9ef39.web.app/

:: Čakanie pred ďalším cyklom
echo.
echo %YELLOW%Čakám 30 sekúnd pred ďalšou kontrolou...%NC%
timeout /t 30 /nobreak >nul

:: Pokračovanie v slučke
goto deploy_loop

endlocal 