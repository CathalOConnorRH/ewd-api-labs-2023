# ==== CONFIGURE =====
# Use a Node 18 base image
FROM node:18-alpine

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 

# Expose port
EXPOSE 8080

# Start node app
CMD [ "npm", "start" ]
