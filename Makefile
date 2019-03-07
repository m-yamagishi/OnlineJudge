init:
	pip install --upgrade pip
	pip install -r requirements.txt
	cd coderunner && npm install

mkbuild:
	cd docs && mkdocs build

mkserve:
	cd docs && mkdocs serve

mkdeploy:
	cd docs && mkdocs gh-deploy

crserve:
	cd coderunner && node app.js