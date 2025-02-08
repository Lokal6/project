@echo off
echo [33mČistenie projektu...[0m

:: Vymaž build a cache priečinky
rmdir /s /q dist
rmdir /s /q node_modules
del /f /q package-lock.json

:: Vymaž Firebase cache
rmdir /s /q .firebase
del /f /q .firebaserc
del /f /q firebase-debug.log

echo [32mHotovo![0m
echo [33mTeraz môžeš spustiť: npm install[0m
pause 