# Use a lightweight base image
FROM nginx:alpine

# Set the working directory within the container
WORKDIR /usr/share/nginx/html

# Copy the compiled Solid.js files (e.g., from the dist or build directory)
COPY ./dist/ .

# Expose the default HTTP port
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
