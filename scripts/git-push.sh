#!/bin/bash

# Farby pre lepšiu čitateľnosť
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Získaj aktuálny branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

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
git add .

# 4. Vytvor commit
echo -e "${YELLOW}✨ Vytváram commit...${NC}"
git commit -m "$commit_message"

# 5. Pull najnovšie zmeny
echo -e "${YELLOW}⬇️ Sťahujem najnovšie zmeny...${NC}"
git pull origin $BRANCH

# 6. Push zmien
echo -e "${YELLOW}⬆️ Posielam zmeny na GitHub...${NC}"
git push origin $BRANCH

# 7. Hotovo
echo -e "${GREEN}✅ Hotovo! Zmeny boli úspešne pushnuté na GitHub${NC}" 