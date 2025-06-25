@echo off
title JSON Editor - MTE USK
color 0A

echo.
echo ========================================
echo    JSON Editor - Data Publikasi MTE USK
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python tidak ditemukan!
    echo [INFO] Silakan install Python terlebih dahulu
    echo [INFO] Download dari: https://python.org
    pause
    exit /b 1
)

echo [INFO] Python ditemukan, memulai server...
echo.

REM Start the server
python server.py

pause
