@echo off
chcp 65001 >nul
echo ================================================
echo   اكاديمية الاجنحة الملكية للطيران - نسخ الصور
echo ================================================
echo.
echo جاري نسخ صور الموقع الى مجلد assets\images...
echo.

if not exist "assets\images" mkdir "assets\images"

copy /Y "C:\Users\LENOVO\.gemini\antigravity-ide\brain\873b6c19-1df5-41c9-a819-cb1f017baf70\.user_uploaded\media_1790599909428.jpg" "assets\images\logo.jpg" >nul
copy /Y "C:\Users\LENOVO\.gemini\antigravity-ide\brain\873b6c19-1df5-41c9-a819-cb1f017baf70\aviation_academy_hero_1790597920064.jpg" "assets\images\hero.jpg" >nul
copy /Y "C:\Users\LENOVO\.gemini\antigravity-ide\brain\873b6c19-1df5-41c9-a819-cb1f017baf70\practical_training_1790597954176.jpg" "assets\images\training.jpg" >nul
copy /Y "C:\Users\LENOVO\.gemini\antigravity-ide\brain\873b6c19-1df5-41c9-a819-cb1f017baf70\academy_logo_1790597937180.jpg" "assets\images\academy_logo.jpg" >nul

copy /Y "C:\Users\LENOVO\.gemini\antigravity-ide\brain\8d2f2313-babe-496f-8bea-429762fba0ac\.user_uploaded\media_1790837339631.jpg" "assets\images\gallery-1.jpg" >nul
copy /Y "C:\Users\LENOVO\.gemini\antigravity-ide\brain\8d2f2313-babe-496f-8bea-429762fba0ac\.user_uploaded\media_1790837339758.jpg" "assets\images\gallery-2.jpg" >nul
copy /Y "C:\Users\LENOVO\.gemini\antigravity-ide\brain\8d2f2313-babe-496f-8bea-429762fba0ac\.user_uploaded\media_1790837339816.jpg" "assets\images\gallery-3.jpg" >nul
copy /Y "C:\Users\LENOVO\.gemini\antigravity-ide\brain\8d2f2313-babe-496f-8bea-429762fba0ac\.user_uploaded\media_1790837340094.jpg" "assets\images\gallery-4.jpg" >nul
copy /Y "C:\Users\LENOVO\.gemini\antigravity-ide\brain\8d2f2313-babe-496f-8bea-429762fba0ac\.user_uploaded\media_1790837340701.jpg" "assets\images\gallery-5.jpg" >nul

echo تم نسخ جميع الصور بنجاح!
echo ================================================
