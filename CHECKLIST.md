# Cursor AI Project Checklist

## Porovnanie Implementácií

### 1. Setup Project Directory
✅ **Vzor**: `mkdir ~/YOURDIRECTORY`
✅ **Naša impl.**: `mkdir C:\Users\Peter\project`
- Rovnaký princíp, len Windows cesta

### 2. Node.js a React Setup
❗ **Vzor**: 
- Create React App (`npx create-react-app .`)
- React 18

✨ **Naša impl.**: 
- Vite (`npm create vite@latest .`)
- React 19 + TypeScript + SWC
- **Výhody našej impl.:**
  - Rýchlejší development server
  - Modernejší build systém
  - TypeScript pre lepšiu typovú kontrolu
  - SWC namiesto Babel = rýchlejšia kompilácia

### 3. GitHub Pripojenie
✅ **Vzor**: 
- Personal Access Token
- Manual README creation

✨ **Naša impl.**: 
- Browser-based auth
- GitHub CLI
- **Jednoduchšie a bezpečnejšie**

## Zostávajúce Úlohy

### 4. React Aplikácia
- [ ] Spustený vývojový server
- [ ] Overená funkčnosť na localhost (port 5173 namiesto 3000)
- [ ] Základná štruktúra aplikácie

### 5. Firebase Setup
- [ ] Nainštalovaný Firebase
- [ ] Vytvorený Firebase projekt
- [ ] Pridaná web aplikácia do Firebase
- [ ] Vytvorený firebase.js konfiguračný súbor
- [ ] Nakonfigurovaný Firebase v projekte

### 6. Firebase Hosting
- [ ] Nainštalovaný Firebase CLI
- [ ] Prihlásenie do Firebase
- [ ] Inicializovaný Firebase v projekte
- [ ] Build aplikácie
- [ ] Nasadenie na Firebase Hosting

### 7. Finálne Overenie
- [ ] Overená funkčnosť na produkčnej URL
- [ ] Skontrolovaná Firebase konfigurácia
- [ ] Otestované všetky funkcionality 