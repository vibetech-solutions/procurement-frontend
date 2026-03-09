FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

ARG NEXT_PUBLIC_BACKEND_API_URL
ARG NEXT_PUBLIC_FRONTEND_URL
ENV NEXT_PUBLIC_BACKEND_API_URL=$NEXT_PUBLIC_BACKEND_API_URL
ENV NEXT_PUBLIC_FRONTEND_URL=$NEXT_PUBLIC_FRONTEND_URL

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "server.js"]