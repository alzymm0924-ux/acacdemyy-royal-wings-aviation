$src1 = "C:\Users\LENOVO\.gemini\antigravity-ide\brain\873b6c19-1df5-41c9-a819-cb1f017baf70"
$src2 = "C:\Users\LENOVO\.gemini\antigravity-ide\brain\8d2f2313-babe-496f-8bea-429762fba0ac\.user_uploaded"
$dest = "d:\مشروع موقع الاجنحه\assets\images"

if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
}

Copy-Item -LiteralPath "$src1\.user_uploaded\media_1790599909428.jpg" -Destination "$dest\logo.jpg" -Force
Copy-Item -LiteralPath "$src1\aviation_academy_hero_1790597920064.jpg" -Destination "$dest\hero.jpg" -Force
Copy-Item -LiteralPath "$src1\practical_training_1790597954176.jpg" -Destination "$dest\training.jpg" -Force
Copy-Item -LiteralPath "$src1\academy_logo_1790597937180.jpg" -Destination "$dest\academy_logo.jpg" -Force

Copy-Item -LiteralPath "$src2\media_1790837339631.jpg" -Destination "$dest\gallery-1.jpg" -Force
Copy-Item -LiteralPath "$src2\media_1790837339758.jpg" -Destination "$dest\gallery-2.jpg" -Force
Copy-Item -LiteralPath "$src2\media_1790837339816.jpg" -Destination "$dest\gallery-3.jpg" -Force
Copy-Item -LiteralPath "$src2\media_1790837340094.jpg" -Destination "$dest\gallery-4.jpg" -Force
Copy-Item -LiteralPath "$src2\media_1790837340701.jpg" -Destination "$dest\gallery-5.jpg" -Force

Write-Output "ALL_IMAGES_COPIED_SUCCESSFULLY"
