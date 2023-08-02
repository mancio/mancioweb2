#!/bin/bash

# Change directory to the upper directory
cd ..

# Run React build
echo "Building React app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "React build completed successfully."
else
  echo "React build failed. Exiting script."
  exit 1
fi

# Execute Firebase deploy
echo "Deploying to Firebase..."
firebase deploy

# Check if deploy was successful
if [ $? -eq 0 ]; then
  echo "Firebase deploy completed successfully."
else
  echo "Firebase deploy failed."
fi