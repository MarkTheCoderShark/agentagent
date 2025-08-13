#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting build process..."

# Clear any existing Prisma cache
echo "🧹 Clearing Prisma cache..."
rm -rf node_modules/.prisma

# Install dependencies fresh
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!" 