@echo off
setlocal EnableDelayedExpansion

:: Farby pre Windows konzolu
set "GREEN=[32m"
set "YELLOW=[33m"
set "RED=[31m"
set "NC=[0m"

:: Error handling
set "ERROR_OCCURRED="

:: Získaj aktuálny branch
for /f "tokens=*" %%a in ('git rev-parse --abbrev-ref HEAD') do (
    set BRANCH=%%a
) || (
    echo %RED%❌ Chyba: Nepodarilo sa získať aktuálny branch%NC%
    exit /b 1
)

:: 1. Kontrola zmien
echo %YELLOW%📥 Kontrolujem zmeny...%NC%
git status || (
    echo %RED%❌ Chyba: Nepodarilo sa získať status%NC%
    exit /b 1
)

:: 2. Spýtaj sa na commit message
set /p "commit_message=%YELLOW%📝 Zadaj commit message (alebo stlač Enter pre 'update'):%NC% "
if "!commit_message!"=="" set commit_message=update

:: 3. Pridaj všetky zmeny
echo %YELLOW%➕ Pridávam zmeny...%NC%
git add . || (
    echo %RED%❌ Chyba: Nepodarilo sa pridať zmeny%NC%
    exit /b 1
)

:: 4. Vytvor commit
echo %YELLOW%✨ Vytváram commit...%NC%
git commit -m "!commit_message!" || (
    echo %RED%❌ Chyba: Nepodarilo sa vytvoriť commit%NC%
    exit /b 1
)

:: 5. Pull najnovšie zmeny
echo %YELLOW%⬇️ Sťahujem najnovšie zmeny...%NC%
git pull origin !BRANCH! || (
    echo %RED%❌ Chyba: Nepodarilo sa stiahnuť zmeny%NC%
    exit /b 1
)

:: 6. Push zmien
echo %YELLOW%⬆️ Posielam zmeny na GitHub...%NC%
git push origin !BRANCH! || (
    echo %RED%❌ Chyba: Nepodarilo sa pushnúť zmeny%NC%
    exit /b 1
)

:: 7. Hotovo
echo %GREEN%✅ Hotovo! Zmeny boli úspešne pushnuté na GitHub%NC%

endlocal 