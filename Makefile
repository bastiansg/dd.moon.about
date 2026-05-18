HTML = index.html
PDF = dd.moon.pdf

.PHONY: install-dependencies html-to-pdf

install-dependencies:
	sudo apt update
	sudo apt install make chromium libproxy1v5

html-to-pdf:
	@sed -e 's|{{HTML}}|$(HTML)|g' -e 's|{{PDF}}|$(PDF)|g' banners/html-to-pdf.txt
	chromium --headless --no-pdf-header-footer --print-to-pdf=$(PDF) $(HTML)
