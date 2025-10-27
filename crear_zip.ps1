# Script para crear ZIP del Corazón Solar Romántico
# Ejecutar en PowerShell desde la carpeta del proyecto

Write-Host "🌟 Creando Corazón Solar Romántico ZIP..." -ForegroundColor Magenta

# Crear ZIP con todos los archivos
Compress-Archive -Path * -DestinationPath CorazonSolarRomantico.zip -Force

Write-Host "✅ ZIP creado exitosamente!" -ForegroundColor Green
Write-Host "📁 Archivo: CorazonSolarRomantico.zip" -ForegroundColor Cyan

# Mostrar información del archivo
$zipInfo = Get-Item CorazonSolarRomantico.zip
Write-Host "📊 Tamaño: $($zipInfo.Length / 1MB) MB" -ForegroundColor Yellow

Write-Host "`n🚀 Listo para compartir!" -ForegroundColor Green
Write-Host "📱 Compatible con: Android, iPhone, PC, Mac, Tablets" -ForegroundColor Cyan
Write-Host "💖 Funciona sin internet" -ForegroundColor Cyan

Write-Host "`n📝 Instrucciones para enviar:" -ForegroundColor Yellow
Write-Host "1. Envía el ZIP por WhatsApp/Email/Drive" -ForegroundColor White
Write-Host "2. La persona extrae y abre index-solar.html" -ForegroundColor White
Write-Host "3. ¡Disfruta el corazón solar romántico!" -ForegroundColor White

Write-Host "`n💕 Tu universo del amor está listo para conquistar corazones!" -ForegroundColor Magenta
