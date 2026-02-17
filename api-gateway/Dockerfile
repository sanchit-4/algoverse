FROM node:22-alpine

WORKDIR /app

# 1. Install dependencies
COPY package*.json ./
RUN npm install

# 2. Copy source code
COPY . .

# 3. Generate Prisma Client
# We use the local copy of schema.prisma we just moved in Step 1
RUN npx prisma generate --schema=./schema.prisma

# 4. Expose Port
EXPOSE 3000

# 5. Start the server
# Using ts-node for simplicity (ensure ts-node is in dependencies)
CMD ["npx", "ts-node", "index.ts"]