@ECHO OFF
mkdocs build -f mkdocs_pake.yml
call pake --name epwg --icon docs\img\favicon.ico --use-local-file site\index.html
msiexec /a epwg.msi /qb targetdir="C:\temp"
move C:\temp\PFiles\epwg\epwg.exe .
del epwg.msi
