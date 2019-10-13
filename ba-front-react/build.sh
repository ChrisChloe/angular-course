#!/bin/sh

#Colors
GREEN='\033[1;32m'
CYAN='\033[1;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Arquivo .env a ser modificado
FILE=".env"

echo "${GREEN}Escrevendo no .env"

# Captura hash do ultimo commit
COMMIT="$(git log --pretty=format:'%h' -n 1)"

# Escreve no .env o commit atual
sed -i "/COMMIT\=.*/ s//COMMIT\="$COMMIT"/g" $FILE

echo "${GREEN}Finalizado escrita no .env"

echo "${GREEN}Iniciando build do Projeto"
npm run build:prod
echo "${GREEN}Build Concluida com sucesso"



