#!/bin/bash

echo "🏗️  Building React app..."
npm run build

echo ""
echo "🔧 Initializing database..."
npx wrangler d1 execute survey-db --local --file=schema.sql

echo ""
echo "🚀 Starting development server..."
npx wrangler pages dev dist --d1=DB
