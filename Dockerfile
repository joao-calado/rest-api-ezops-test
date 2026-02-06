# Baseado no requisito do README: Node 14
FROM node:14-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (para cache eficiente do Docker)
COPY package*.json ./

# Instala dependências (Passo 2 do README)
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta (precisamos verificar no código qual porta o server.js usa, 
# mas geralmente é 3000 ou 8080. Vou assumir 3000 por padrão, ajuste se necessário)
EXPOSE 3000

# Comando de inicialização (Passo 6 do README)
CMD ["node", "server/server.js"]