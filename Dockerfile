# Use an official Node.js runtime as a base image
FROM node:22.2.0-alpine3.19

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install
RUN npm install -g nodemon
RUN npm install --save-dev typescript@5.1.6 ts-node@10.9.1 nodemon@3.0.1

# Install development dependencies, including nodemon
RUN npm install --only=dev

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your application will run
EXPOSE 3000

# Command to run the application in development mode with hot reloading
CMD ["npm", "run", "dev"]
