# Use a base image with Node.js installed
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the frontend application
RUN npm run build

# Use a lightweight Nginx image for serving static content
FROM nginx:alpine

# Copy the built frontend assets to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx to serve the built frontend
CMD ["nginx", "-g", "daemon off;"]
