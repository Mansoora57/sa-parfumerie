@echo off
color 0a
title Connect Shahzein.A Parfumerie with GitHub Auto-Deploy
echo ===================================================================
echo        SHAHZEIN.A PARFUMERIE - CONNECT GITHUB AUTO-DEPLOY
echo ===================================================================
echo.
echo Firebase is now connecting with your GitHub repository:
echo Repository: Mansoora57/sa-parfumerie
echo.
call firebase init hosting:github
echo.
echo ===================================================================
echo  All done! Now every change will automatically deploy to your site!
echo ===================================================================
pause
