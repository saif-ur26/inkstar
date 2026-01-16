# GitHub Connection Script for INK Star Project
# Run this script to connect your local repository to GitHub

Write-Host "=== INK Star GitHub Connection ===" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"

# Get repository name
$repoName = Read-Host "Enter your repository name (e.g., ink-star-ecommerce)"

# Construct repository URL
$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "Repository URL: $repoUrl" -ForegroundColor Yellow
Write-Host ""

# Confirm
$confirm = Read-Host "Is this correct? (y/n)"

if ($confirm -eq "y" -or $confirm -eq "Y") {
    Write-Host ""
    Write-Host "Connecting to GitHub..." -ForegroundColor Green
    
    # Check if remote already exists
    $remoteExists = git remote get-url origin 2>$null
    
    if ($remoteExists) {
        Write-Host "Remote 'origin' already exists. Removing..." -ForegroundColor Yellow
        git remote remove origin
    }
    
    # Add remote
    git remote add origin $repoUrl
    
    # Rename branch to main
    git branch -M main
    
    Write-Host ""
    Write-Host "✓ Remote repository connected!" -ForegroundColor Green
    Write-Host ""
    Write-Host "To push your code, run:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor White
    Write-Host ""
    Write-Host "Note: You'll be prompted to authenticate with GitHub" -ForegroundColor Yellow
    
} else {
    Write-Host "Connection cancelled." -ForegroundColor Red
}
