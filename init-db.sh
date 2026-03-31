#!/bin/bash

# Initialize local D1 database for development
echo "🔧 Initializing local D1 database..."

# Apply schema to local database
npx wrangler d1 execute survey-db --local --file=schema.sql

echo "✅ Database initialized successfully!"
echo ""
echo "You can now run: npx wrangler pages dev dist --d1=DB"
