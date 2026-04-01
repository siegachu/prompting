@echo off
set BAT=C:\Users\siega\.claude\projects\prompting\website\scripts\post_daily.bat
schtasks /Delete /TN "AskAIRight_Morning" /F 2>nul
schtasks /Delete /TN "AskAIRight_Evening" /F 2>nul
schtasks /Create /TN "AskAIRight_Morning" /TR "%BAT%" /SC DAILY /ST 09:00 /F
schtasks /Create /TN "AskAIRight_Evening" /TR "%BAT%" /SC DAILY /ST 18:00 /F
echo 2 tasks created (9 AM, 6 PM).
pause
