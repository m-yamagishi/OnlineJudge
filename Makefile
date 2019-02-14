init:
	pip install --upgrade pip
	pip install -r requirements.txt

mkbuild:
	cd docs && mkdocs build

mkserve:
	cd docs && mkdocs serve

mkdeploy:
	cd docs && mkdocs gh-deploy