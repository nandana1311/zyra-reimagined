FROM node:22-bullseye-slim

WORKDIR /app

# Copy package manifests first to leverage Docker cache for dependency installs
COPY package*.json ./

# Install dependencies in the image (cached layer)
RUN npm ci --production=false

# Copy project files
COPY . .

# Entrypoint will ensure node_modules in the mounted volume are populated
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENV NODE_ENV=development
EXPOSE 5173

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "run", "dev", "--", "--host"]
