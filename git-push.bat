@echo off
setlocal EnableDelayedExpansion

:: Získaj aktuálny branch
for /f "tokens=*" %%a in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%a

:: 1. Kontrola zmien
echo [33m📥 Kontrolujem zmeny...[0m
git status

:: 2. Spýtaj sa na commit message
set /p commit_message=[33m📝 Zadaj commit message (alebo stlač Enter pre 'update'):[0m 
if "!commit_message!"=="" set commit_message=update

:: 3. Pridaj všetky zmeny
echo [33m➕ Pridávam zmeny...[0m
git add .

:: 4. Vytvor commit
echo [33m✨ Vytváram commit...[0m
git commit -m "!commit_message!"

:: 5. Pull najnovšie zmeny
echo [33m⬇️ Sťahujem najnovšie zmeny...[0m
git pull origin !BRANCH!

:: 6. Push zmien
echo [33m⬆️ Posielam zmeny na GitHub...[0m
git push origin !BRANCH!

:: 7. Hotovo
echo [32m✅ Hotovo! Zmeny boli úspešne pushnuté na GitHub[0m

endlocal 