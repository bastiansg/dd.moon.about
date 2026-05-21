HTML = index.html
PDF = dd.moon.pdf

.PHONY: setup html-to-pdf

setup:
	sudo apt update
	sudo apt install make chromium libproxy1v5
	npm install

html-to-pdf:
	@node scripts/html-to-pdf.mjs $(HTML) $(PDF)
