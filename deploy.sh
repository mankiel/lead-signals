#!/bin/bash
cd "/Users/mandiadams/Documents/Documents - Mandi's MacBook Pro/SaaSMVP/lead-signals"
git pull origin main
git add .
git commit -m "Add Defense funding analytics components"
git push origin main
echo "Deployment complete!"
