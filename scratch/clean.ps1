$rawPath = "C:\Users\Mayur\.gemini\antigravity\brain\fd638e3a-bb0d-44f3-b509-8e7adbaabf94\.system_generated\steps\2392\content.md"
$outputPath = "scratch/clean_content.txt"

if (Test-Path $rawPath) {
    $text = Get-Content -Path $rawPath -Raw
    # Remove HTML tags
    $clean = $text -replace '<[^>]+>', ''
    # Split into lines
    $lines = $clean -split "`r?`n"
    # Find matching lines
    $matches = $lines | Where-Object { $_ -match 'cost|price|outsourcing|rate|model|partner|workflow' } | Select-Object -First 200
    Set-Content -Path $outputPath -Value $matches
    Write-Host "Success! Cleaned content written to $outputPath"
} else {
    Write-Host "Error: Raw path not found"
}
