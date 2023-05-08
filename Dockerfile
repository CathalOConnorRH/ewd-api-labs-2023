# ==== CONFIGURE =====
# Use a Node 16 base imag
FROM node:18-alpine
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
#RUN npm config set legacy-peer-deps true
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
#COPY . .
# Build the app
#RUN npm run build
# ==== RUN =======
# Bundle static assets with nginx
#FROM nginx:1.21.0 as production
#ENV NODE_ENV production
# Copy built assets from `builder` image
#COPY --from=builder /app/build /usr/share/nginx/html
#COPY build /usr/share/nginx/html
# Add your nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 8080
# Start nginx
CMD [ "npm", "start" ]
