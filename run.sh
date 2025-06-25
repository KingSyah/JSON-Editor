#!/bin/bash

# JSON Editor Startup Script
# For Linux/Mac systems

echo "========================================"
echo "  JSON Editor - Data Publikasi MTE USK"
echo "========================================"
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    if ! command -v python &> /dev/null; then
        echo "❌ Python tidak ditemukan!"
        echo "💡 Silakan install Python terlebih dahulu"
        echo "🔗 Download dari: https://python.org"
        exit 1
    else
        PYTHON_CMD="python"
    fi
else
    PYTHON_CMD="python3"
fi

echo "✅ Python ditemukan, memulai server..."
echo

# Make the script executable
chmod +x "$0"

# Start the server
$PYTHON_CMD server.py
