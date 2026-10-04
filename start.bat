@echo off
setlocal
title StockSync - Store Management Platform Launcher
color 0B

echo.
echo ======================================================================
echo    StockSync - Kirana and General Store Management Platform
echo    Sri Ganesh General Stores, Bangalore
echo ======================================================================
echo.

set "ROOT_DIR=%~dp0"
set "SERVER_DIR=%~dp0server"
set "FRONTEND_DIR=%~dp0frontend"

:: 1. Check Node.js installation
echo [*] Checking runtime dependencies...
where node >nul 2>nul
if errorlevel 1 (
    color 0C
    echo [ERROR] Node.js is not found on your system.
    echo Please download and install Node.js from https://nodejs.org/
    echo After installing, restart this script.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set "NODE_VER=%%v"
echo [OK] Node.js %NODE_VER% detected.

:: 2. Check npm installation
where npm >nul 2>nul
if errorlevel 1 (
    color 0C
    echo [ERROR] npm is not found in PATH.
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('npm -v') do set "NPM_VER=%%v"
echo [OK] npm v%NPM_VER% detected.

:: 3. Check MySQL Service
echo [*] Checking MySQL service status...
sc query MySQL80 >nul 2>nul
if not errorlevel 1 (
    sc query MySQL80 | findstr /i "RUNNING" >nul 2>nul
    if not errorlevel 1 (
        echo [OK] MySQL80 service is active and running.
    ) else (
        echo [*] MySQL80 service found but not running. Attempting to start...
        net start MySQL80 >nul 2>nul
        if not errorlevel 1 (
            echo [OK] MySQL80 service started successfully.
        ) else (
            echo [*] Could not start MySQL80 service automatically. Continuing...
        )
    )
) else (
    echo [*] MySQL80 service not found. Continuing with built-in store state...
)

:: 4. Verify Server Configuration
if not exist "%SERVER_DIR%\.env" (
    echo [*] Creating server\.env configuration from .env.example...
    copy "%SERVER_DIR%\.env.example" "%SERVER_DIR%\.env" >nul
    echo [OK] server\.env created.
)

:: 5. Install Server Dependencies if missing
if not exist "%SERVER_DIR%\node_modules" (
    echo [*] Installing backend packages via npm install...
    cd /d "%SERVER_DIR%"
    call npm install
    if errorlevel 1 (
        color 0C
        echo [ERROR] npm install encountered an error.
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully.
)

:: 6. Launching All Technologies
echo.
echo ======================================================================
echo    Starting StockSync Services:
echo      - Unified Web App:         http://localhost:5000
echo      - Dedicated Frontend:      http://localhost:5173
echo      - Backend REST API:        http://localhost:5000/api
echo ======================================================================
echo.

cd /d "%SERVER_DIR%"

echo [*] Opening live website in default web browser...
start http://localhost:5000

echo [*] Launching StockSync server runtime...
echo.
echo Press Ctrl + C at any time to stop the servers.
echo ======================================================================
echo.

node start-all.js

pause
