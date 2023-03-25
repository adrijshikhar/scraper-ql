FROM node:18.7.0-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN yarn install --production

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV PORT 3000

# Build app
RUN yarn build

# Run app.js when the container launches
CMD ["yarn", "start"]