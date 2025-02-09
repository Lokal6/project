@echo off
echo [33mČistenie projektu...[0m

:: Vymaž build a cache priečinky
if exist "dist" rmdir /s /q dist
if exist "node_modules" (
    :: Skús najprv zabiť node procesy
    taskkill /F /IM node.exe >nul 2>&1
    :: Počkaj chvíľu
    timeout /t 2 /nobreak >nul
    rmdir /s /q node_modules
)
if exist "package-lock.json" del /f /q package-lock.json

:: Vymaž Firebase cache
if exist ".firebase" rmdir /s /q .firebase
if exist ".firebaserc" del /f /q .firebaserc
if exist "firebase-debug.log" del /f /q firebase-debug.log

echo [32mHotovo![0m
echo [33mTeraz môžeš spustiť:[0m
echo npm install
echo npm run build
echo npm run deploy
pause 