#!/bin/bash

# Farby pre lepšiu čitateľnosť
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Error handling
set -e  # Script sa zastaví pri chybe

# Funkcia pre error handling
handle_error() {
    echo -e "${RED}❌ Chyba: $1${NC}"
    exit 1
}

# Získaj aktuálny branch
BRANCH=$(git rev-parse --abbrev-ref HEAD) || handle_error "Nepodarilo sa získať aktuálny branch"

# 1. Kontrola zmien
echo -e "${YELLOW}📥 Kontrolujem zmeny...${NC}"
git status

# 2. Spýtaj sa na commit message
echo -e "${YELLOW}📝 Zadaj commit message (alebo stlač Enter pre 'update'):${NC}"
read commit_message
if [ -z "$commit_message" ]; then
    commit_message="update"
fi

# 3. Pridaj všetky zmeny
echo -e "${YELLOW}➕ Pridávam zmeny...${NC}"
git add . || handle_error "Nepodarilo sa pridať zmeny"

# 4. Vytvor commit
echo -e "${YELLOW}✨ Vytváram commit...${NC}"
git commit -m "$commit_message" || handle_error "Nepodarilo sa vytvoriť commit"

# 5. Pull najnovšie zmeny
echo -e "${YELLOW}⬇️ Sťahujem najnovšie zmeny...${NC}"
git pull origin $BRANCH || handle_error "Nepodarilo sa stiahnuť zmeny"

# 6. Push zmien
echo -e "${YELLOW}⬆️ Posielam zmeny na GitHub...${NC}"
git push origin $BRANCH || handle_error "Nepodarilo sa pushnúť zmeny"

# 7. Hotovo
echo -e "${GREEN}✅ Hotovo! Zmeny boli úspešne pushnuté na GitHub${NC}" 