# Overview
- mkdocs
	- https://qiita.com/mebiusbox2/items/a61d42878266af969e3c
- Makefile
- リポジトリ構造
	- https://python-guideja.readthedocs.io/ja/latest/writing/structure.html
- Git,Gthub
- Junit 4.12
	- 環境設定とコマンドラインでの実行手順 https://github.com/junit-team/junit4/wiki/Getting-started
		- `javac Hello/Main.java`
		- `javac -cp .:junit-4.12.jar:hamcrest-core-1.3.jar Hello/MainTest.java`
		- `java -cp .:junit-4.12.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore Hello.MainTest`
- Docker
- ubuntu
- curl
- vscode(javaの実行環境)
- mongoDB
- WSL;Windows SUbsystem for Linux
	- シス管系女子 https://system-admin-girl.com/comic/begins/sp-wsl/
	- https://qiita.com/tettsu__/items/85c96850d187e4386c24
	- 海外サーバリポジトリから日本サーバへの切り替え https://qiita.com/Aruneko/items/c79810b0b015bebf30bb
	- 起動時エラー -> Winwdows Update https://va2577.github.io/post/175/
- Angular
	- tutorial https://angular.jp/tutorial/toh-pt0

## システム構成

*オンラインジャッジサイトはスクリプトでDockerコマンドを実行するためにLinuxカーネル上でサーブする必要がある*

![](../image/Architecture.svg)

## 要件一覧
- Windowsのdockerコンテナでubuntuを起動して,ubunutのdockerコンテナでMongoDB,オンラインジャッジを起動する
- オンラインジャッジサイトがAngularで構成できる
- DBでユーザを管理できる
	- パスワード
	- ロール
	- 提出状況
	- 出題状況
- ユーザにロールが設定できる
	- 管理者
	- コンテスト参加者
	- 問題作成者
- [x] Javaコードが実行できて,標準出力の結果を表示できる
- 問題作成者がブラウザ上でテストコードを検証し,送信(サーバ側に保存)できる
- Javaコードの標準出力に対してテストが実行できる
- コンテスト(問題)を選択できる
- ソースコードを提出しテストした結果を参照できる
- ユーザの提出したコンテストを一覧で参照できる
- 社内のプログラミングテストで利用できる