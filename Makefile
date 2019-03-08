init:
	pip install --upgrade pip
	pip install -r requirements.txt
	cd coderunner && npm install
	curl -o source/junit-4.12.jar -OL https://github.com/junit-team/junit4/releases/download/r4.12/junit-4.12-sources.jar
	curl -o source/hamcrest-core-1.3.jar -OL http://search.maven.org/remotecontent?filepath=org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar

mkbuild:
	cd docs && mkdocs build

mkserve:
	cd docs && mkdocs serve

mkdeploy:
	cd docs && mkdocs gh-deploy

crserve:
	cd coderunner && node app.js

dockerbuild:
	cd image-ubuntu-dev && docker build -t ubuntu-dev .

dockertest:
	docker run -i -t ubuntu-dev ruby --version
	docker run -i -t ubuntu-dev java -version
	curl -X POST -d 'language=ruby&source_code=puts+111&input=' \
	http://localhost:3000/api/run

ARG = foo
junit:
ifeq ($(shell ls source | grep ${ARG}), ${ARG})
	javac source/${ARG}/Main.java
	cd source && javac -cp .:junit-4.12.jar:hamcrest-core-1.3.jar ${ARG}/MainTest.java
	cd source && java -cp .:junit-4.12.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore ${ARG}.MainTest
else
	echo '${ARG} not found'
endif

hellotest:
	make junit ARG=Hello