.PHONY: setup repro

setup:
	npm install

repro:
	pulumi preview --import-file import.json
	cat import.json
	@echo "\n\n---------------------------------------------------"
	@echo "Look at the nameTable, it contains only one parent."
	@echo "---------------------------------------------------"
