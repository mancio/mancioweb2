# Change directory to the upper directory
#Set-Location ..

# Run React build
Write-Host "Building React app..."
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
  Write-Host "React build completed successfully."
} else {
  Write-Host "React build failed. Exiting script."
  exit 1
}

# Execute Firebase deploy
Write-Host "Deploying to Firebase..."
firebase deploy

# Check if deploy was successful
if ($LASTEXITCODE -eq 0) {
  Write-Host "Firebase deploy completed successfully."
} else {
  Write-Host "Firebase deploy failed."
}