@echo off
:: Open localhost in the default browser after 3 seconds
start /b cmd /c "timeout /t 3 >nul && start http://localhost:4000"

:: Run Jekyll server
jekyll serve
