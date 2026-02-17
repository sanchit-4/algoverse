FROM node:22-alpine

# 1. Install Docker CLI (Critical for RCE)
RUN apk add --no-cache docker-cli

WORKDIR /app

# 2. Install dependencies
COPY package*.json ./
RUN npm install

# 3. Copy source code
COPY . .

# 4. Generate Prisma Client
RUN npx prisma generate

# 5. Start the worker
CMD ["npx", "ts-node", "index.ts"]