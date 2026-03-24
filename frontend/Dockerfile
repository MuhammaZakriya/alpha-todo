# Use official Node image
FROM node:20-alpine

# Set work directory
WORKDIR /app

# Copy package files and install
COPY package.json package-lock.json* ./
RUN npm install

# Copy all source code
COPY ./ ./

# Build frontend
RUN npm run build

# Use Nginx to serve production build
FROM nginx:stable-alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]