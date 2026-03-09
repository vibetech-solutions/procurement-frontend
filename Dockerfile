FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/ \
 && npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm config set fetch-timeout 300000 \
 && npm config set audit false \
 && npm config set fund false

RUN npm ci --legacy-peer-deps --no-audit --no-fund --progress=false

COPY . .

RUN npm run build

CMD ["sh", "-c", "cp -r out/* /app/out-volume && tail -f /dev/null"]