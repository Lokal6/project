# 🚀 Workflow Guide - PROJECT

## 1️⃣ Lokálny vývoj

### Spustenie vývojového prostredia
```bash
# Spustenie dev servera
npm run dev

# Otvorí sa v prehliadači
# http://localhost:3000
```

### Čistý štart
```bash
# 1. Vyčistenie projektu
cleanup.bat

# 2. Inštalácia závislostí 
npm install

# 3. Spustenie dev servera
npm run dev
```

## 2️⃣ Úprava súborov

### Hlavné súbory na úpravu
```
/src
├── components/     # React komponenty
│   ├── Auth/      # Autentifikácia
│   └── ...
├── pages/         # Stránky
│   ├── Home.tsx   
│   └── Dashboard.tsx
├── App.tsx        # Hlavná aplikácia
└── App.css        # Hlavné štýly
```

### Postup úprav
1. Upravte súbory v `/src`
2. Zmeny sa automaticky prejavia v prehliadači
3. Otestujte funkcionalitu
4. Uložte zmeny

## 3️⃣ Build a Deploy

### Lokálne testovanie
```bash
# Build projektu
npm run build

# Test buildu
npm run preview
```

### Deploy na Firebase
```bash
# 1. Build
npm run build

# 2. Deploy
npm run deploy

# Alebo priamo
deploy.bat
```

### Kontrola nasadenia
- Lokálne: http://localhost:3000
- Produkcia: https://projekt-9ef39.web.app/

## 4️⃣ Git workflow

### Uloženie zmien
```bash
# Automatický commit a push
git-push.bat
```

## 5️⃣ Checklist

### Pred deployom
- [ ] Lokálne otestované
- [ ] Build úspešný
- [ ] Commited do Gitu
- [ ] Firebase deploy úspešný

### Po deployi
- [ ] Stránka funguje na produkcii
- [ ] Autentifikácia funguje
- [ ] Responzívny dizajn OK
- [ ] Konzola bez chýb

## 6️⃣ Riešenie problémov

### Cache problémy
```bash
# Vyčistenie
cleanup.bat
npm install
```

### Build problémy
```bash
# Debug build
npm run build --debug

# Debug deploy
firebase deploy --debug
```

### Firebase problémy
```bash
# Reauth
firebase logout
firebase login
```

## 📁 Dôležité súbory

- `vite.config.ts` - Build konfigurácia
- `firebase.json` - Firebase nastavenia
- `package.json` - NPM konfigurácia
- `.firebaserc` - Firebase projekt ID

## 🔗 Užitočné linky

- Firebase Console: https://console.firebase.google.com/project/projekt-9ef39/overview
- GitHub repo: https://github.com/Lokal6/project
- Dokumentácia: PROJECT_DOCUMENTATION.md 