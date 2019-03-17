init:
	# pip install --upgrade pip
	# pip install -r requirements.txt

	sudo apt-get install nodejs
	sudo apt-get install npm
	sudo apt install docker-compose
	npm install -g @angular/cli
	npm install -g node-dev
	# cd coderunner && npm install
	# cd online-judge-site && npm install
	
	# curl -o online-judge-server/junit-4.12.jar -OL https://github.com/junit-team/junit4/releases/download/r4.12/junit-4.12.jar
	# curl -o online-judge-server/hamcrest-core-1.3.jar -OL http://search.maven.org/remotecontent?filepath=org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar

	docker pull mongo
	docker pull mongo-express

mkbuild:
	cd docs && mkdocs build

mkserve:
	cd docs && mkdocs serve

mkdeploy:
	cd docs && mkdocs gh-deploy

dockerservicestart:
	# ubuntuを管理者権限で起動していることが前提
	sudo cgroupfs-mount
	sudo usermod -aG docker $USER
	sudo service docker start

ubuntudockerbuild:
	cd image-ubuntu-dev && docker build -t ubuntu-dev .

# docker create -i --net none --ulimit nproc=10:10 --ulimit fsize=1000000 -w /workspace ubuntu-dev /bin/bash
# docker cp /tmp/workspace 1339cbe76cd2:/
# docker start -i 1339cbe76cd2
ubuntudockerrun:
	docker run -it -w /workspace ubuntu-dev bash

builddockertest:
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

sitesave:
	cd online-judge-site && npm install --save bootstrap && npm install --save jquery popper.js
	cd online-judge-site && npm install --save ag-grid ag-grid-angular ag-grid-community
	cd online-judge-site && npm install --save ngx-monaco-editor
	cd online-judge-site && npm install --save ngx-md
	cd online-judge-site && npm install --save @ng-bootstrap/ng-bootstrap
	cd online-judge-site && ng add @angular/material

siteserve:
	cd online-judge-site && ng serve --port 4649 --host 0.0.0.0

sitebuild:
	cd online-judge-site && npm rum build --prod --baseHref=/online-judge-site/

sitedockerbuild:
	# make sitebuild
	cd online-judge-site && docker build -t onlinejudge_judgesite .

sitedockerrun:
	# make sitedockerbuild
	docker run -it --rm -p 8082:80 onlinejudge_judgesite

serversave:
	cd online-judge-server && npm install --save mongodb monk jade

serverserve:
	cd online-judge-server && node-dev app.js

serverdockerbuild:
	cd online-judge-server && docker build -t onlinejudge_judgeserver .

serverdockerrun:
	docker run -it --rm -p 3001:3000 onlinejudge_judgeserver

mongodockerrun:
	docker run -it --rm \
	--name mongo \
	-p 27017:27017 \
	-v /mnt/mongodb-data:/data/db \
	-e MONGO_INITDB_ROOT_USERNAME="username" \
	-e MONGO_INITDB_ROOT_PASSWORD="password" \
	-d \
	mongo

mongoexpressdockerrun:
	docker run -it --rm \
	--name mongo-express \
	--link mongo:mongo \
	-p 8081:8081 \
	-e ME_CONFIG_MONGODB_ADMINUSERNAME="username" \
	-e ME_CONFIG_MONGODB_ADMINPASSWORD="password" \
	-e ME_CONFIG_BASICAUTH_UERNAME="username" \
	-e ME_CONFIG_BASICAUTH_PASSWORD="password" \
	-d \
	mongo-express

up:
	docker-compose up mongo mongo-express judgesite

mongologin:
	#mongo 「DB名」 -u 「ユーザー名」 -p
	mongo admin -u username -p