Write-Host "Compilation started..."
if (Test-Path ".\WebClient\dist") {
	Remove-Item -path ".\WebClient\dist\*" -recurse -force
	Write-Host "Old items were deleted from WebClient\dist folder."
} else {
	New-Item -ItemType Directory -Path ".\WebClient\dist"
	Write-Host "\WebClient\dist folder was created."
}
Set-Location "..\AngularClient"
Write-Host "Project build started..."
ng build --prod
Write-Host "Project build Finished."
Copy-Item ".\dist\*" -Destination "..\WebApi\WebClient\dist" -Recurse -Force
Write-Host "Project items were copied to WebClient\dist folder."
Write-Host "Compilation finished!"
