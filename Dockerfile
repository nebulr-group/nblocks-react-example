# syntax=docker/dockerfile:1

# Supports ARM + x86-64
# 'as base' allows us to refer to this build stage in other build stages
FROM node:20-buster
SHELL ["/bin/bash", "-c"]

# Set the root working dir inside container
# Use relative paths based on the working dir
WORKDIR "/app"

# Set layer caching for faster builds
# Runs only on package.json and package-lock.js change
COPY ["package.json", "./"]
# Installing prod and dev dependencies
RUN npm install
# Copy rest of the projects source code to container env
COPY . .
# Run build with installed dep
RUN npm run build