# # Use an official Node.js runtime as the base image
# FROM node:14

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install application dependencies
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Build the TypeScript code
# RUN npm run build

# # Copy the get_ip.sh script to the container
# COPY get_ip.sh /usr/local/bin/

# # Make the script executable within the container
# RUN chmod +x /usr/local/bin/get_ip.sh

# # Expose the port your application will run on
# EXPOSE 8000

# # Define the command to run your application
# CMD ["get_ip.sh", "npm", "start"]

# -----------------

# # Use a lightweight base image
# FROM nginx:alpine

# # Copy your custom Nginx configuration file into the container
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Set the working directory within the container
# WORKDIR /usr/share/nginx/html

# # Copy the compiled Solid.js files (e.g., from the dist or build directory)
# COPY ./dist/ ./

# # Expose the default HTTP port
# EXPOSE 8000

# # Start the Nginx web server
# CMD ["nginx", "-g", "daemon off;"]

# -----------------

## this is the stage one , also know as the build step

FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs

FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./dist /usr/src/app/dist
EXPOSE 8000
CMD npm run start