@echo off
setlocal EnableDelayedExpansion

:: Farby pre Windows konzolu
set "GREEN=[32m"
set "YELLOW=[33m"
set "RED=[31m"
set "NC=[0m"

:: Pridáme pauzu na začiatku pre debug
echo %YELLOW%Spúšťam git-push script...%NC%
timeout /t 2 /nobreak >nul

:: Kontrola či je git nainštalovaný
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo %RED%❌ Git nie je nainštalovaný alebo nie je v PATH%NC%
    pause
    exit /b 1
)

:: Kontrola či sme v git repozitári
git rev-parse --git-dir >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo %RED%❌ Nie ste v git repozitári%NC%
    pause
    exit /b 1
)

:: Získaj aktuálny branch
for /f "tokens=*" %%a in ('git rev-parse --abbrev-ref HEAD 2^>nul') do (
    set "BRANCH=%%a"
)

:: Kontrola či sa podarilo získať branch
if "!BRANCH!"=="" (
    echo %RED%❌ Nepodarilo sa získať aktuálny branch%NC%
    pause
    exit /b 1
)

echo %YELLOW%📂 Aktuálny branch: !BRANCH!%NC%

:: 1. Kontrola zmien
echo %YELLOW%📥 Kontrolujem zmeny...%NC%
git status
git diff --quiet
if %ERRORLEVEL% equ 0 (
    git diff --cached --quiet
    if %ERRORLEVEL% equ 0 (
        echo %YELLOW%⚠️ Žiadne zmeny na commit%NC%
        pause
        exit /b 0
    )
)

:: 2. Spýtaj sa na commit message
set /p "commit_message=%YELLOW%📝 Zadaj commit message (alebo stlač Enter pre 'update'):%NC% "
if "!commit_message!"=="" set "commit_message=update"

:: 3. Pridaj všetky zmeny
echo %YELLOW%➕ Pridávam zmeny...%NC%
git add .
if %ERRORLEVEL% neq 0 (
    echo %RED%❌ Chyba: Nepodarilo sa pridať zmeny%NC%
    pause
    exit /b 1
)

:: 4. Vytvor commit
echo %YELLOW%✨ Vytváram commit...%NC%
git commit -m "!commit_message!"
if %ERRORLEVEL% neq 0 (
    echo %RED%❌ Chyba: Nepodarilo sa vytvoriť commit%NC%
    pause
    exit /b 1
)

:: 5. Pull najnovšie zmeny
echo %YELLOW%⬇️ Sťahujem najnovšie zmeny...%NC%
git pull origin !BRANCH!
if %ERRORLEVEL% neq 0 (
    echo %RED%❌ Chyba: Nepodarilo sa stiahnuť zmeny%NC%
    pause
    exit /b 1
)

:: 6. Push zmien
echo %YELLOW%⬆️ Posielam zmeny na GitHub...%NC%
git push origin !BRANCH! 2>push_error.txt
set PUSH_ERROR=%ERRORLEVEL%

:: Kontrola či push prebehol úspešne
if !PUSH_ERROR! neq 0 (
    echo %RED%❌ Chyba pri pushovaní zmien:%NC%
    type push_error.txt
    del push_error.txt
    pause
    exit /b 1
) else (
    echo %GREEN%✅ Push úspešný! Zmeny boli nahrané na GitHub%NC%
    if exist push_error.txt del push_error.txt
)

:: 7. Kontrola či sú zmeny na GitHub
echo %YELLOW%🔍 Kontrolujem či sú zmeny na GitHub...%NC%
git ls-remote --heads origin !BRANCH! >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo %RED%❌ Zmeny nie sú viditeľné na GitHub%NC%
    pause
    exit /b 1
)

:: 8. Spusti deploy ak sme na main/master branchi
if /I "!BRANCH!"=="main" (
    echo %YELLOW%🚀 Spúšťam deployment...%NC%
    call deploy.bat
) else if /I "!BRANCH!"=="master" (
    echo %YELLOW%🚀 Spúšťam deployment...%NC%
    call deploy.bat
)

echo %GREEN%✅ Všetko hotovo!%NC%
echo.
echo %YELLOW%Stlač ľubovoľný kláves pre ukončenie...%NC%
pause >nul

endlocal 