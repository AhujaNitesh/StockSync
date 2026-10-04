@echo off
title StockSync - Stop Services
color 0E

echo.
echo ======================================================================
echo    Stopping StockSync Servers on Ports 5000 and 5173...
echo ======================================================================
echo.

powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 5000, 5173 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue; Write-Host ('[OK] Stopped PID ' + $_.OwningProcess + ' on port ' + $_.LocalPort) }"

echo.
echo [OK] All StockSync ports freed and services stopped.
ping -n 3 127.0.0.1 >nul
