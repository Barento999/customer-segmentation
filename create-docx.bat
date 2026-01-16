@echo off
echo ========================================
echo Backend Documentation DOCX Converter
echo ========================================
echo.

echo Checking for python-docx library...
pip show python-docx >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing python-docx...
    pip install python-docx
    echo.
)

echo Converting Markdown to DOCX...
python convert_to_docx.py

if exist BACKEND_DOCUMENTATION.docx (
    echo.
    echo ========================================
    echo SUCCESS! DOCX file created.
    echo ========================================
    echo.
    echo Opening the file...
    start BACKEND_DOCUMENTATION.docx
) else (
    echo.
    echo ========================================
    echo Conversion failed. Alternative methods:
    echo ========================================
    echo.
    echo 1. Open BACKEND_DOCUMENTATION.md in Microsoft Word
    echo 2. File ^> Save As ^> Choose "Word Document (.docx)"
    echo.
    echo OR
    echo.
    echo 3. Use online converter: https://www.markdowntodocx.com/
    echo.
)

pause
