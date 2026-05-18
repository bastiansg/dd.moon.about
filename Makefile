PDF = portfolio.pdf
HTML = index.html

.PHONY: html-to-pdf pdf

html-to-pdf:
	@sed -e 's|{{HTML}}|$(HTML)|g' -e 's|{{PDF}}|$(PDF)|g' banners/html-to-pdf.txt
	chromium --headless --no-pdf-header-footer --print-to-pdf=$(PDF) $(HTML)

pdf: html-to-pdf
