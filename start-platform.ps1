# CyberLearn Hub Platform Launcher
$DesktopPath = "C:\Users\manikandan\OneDrive\Desktop\cyberlearn-hub-main"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Starting CyberLearn Hub Platform..." -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Kill any existing process locking port 8000 or 3000 if needed
Write-Host "[1/3] Checking and clearing port conflicts..." -ForegroundColor Yellow
$ports = @(8000, 3000)
foreach ($port in $ports) {
    $conns = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($conns) {
        foreach ($conn in $conns) {
            Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
        }
    }
}

# 2. Launch FastAPI Backend
Write-Host "[2/3] Launching FastAPI Backend on http://localhost:8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$DesktopPath\backend'; Write-Host '--- FastAPI RAG Backend ---' -ForegroundColor Cyan; python -m uvicorn app.main:app --host 0.0.0.0 --port 8000"

# 3. Launch Next.js Frontend
Write-Host "[3/3] Launching Next.js 15 Frontend on http://localhost:3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$DesktopPath\frontend'; Write-Host '--- Next.js 15 Cyber UI ---' -ForegroundColor Cyan; npx next dev -H 0.0.0.0 -p 3000"

Write-Host ""
Write-Host "✅ Platform servers launched in new windows!" -ForegroundColor Green
Write-Host "  • Backend API & Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host "  • Frontend Web App:   http://localhost:3000" -ForegroundColor White
