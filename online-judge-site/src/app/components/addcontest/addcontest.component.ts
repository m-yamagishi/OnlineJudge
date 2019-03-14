import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addcontest',
  templateUrl: './addcontest.component.html',
  styleUrls: ['./addcontest.component.scss']
})
export class AddcontestComponent implements OnInit {
  options = { theme: 'vs-dark', language: 'java' }

  packageNameTitle = 'タイトル';
  packageNameDescription = 'タイトルはJavaのパッケージ名にも使用します.英字のアッパーキャメルケースで記載してください.';
  packageName: string;
  questionTitle = '問題文';
  question: string;
  answerCodeTitle = '解答コード';
  answerCodeDescription = '問題の答えを標準出力するプログラムを下記に記載してください.Mainクラスの定義mainメソッドのシグネチャは変更しないでください.';
  answerCode: string = 'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("your answer");\n\t}\n}';
  standardInputLabel = '標準入力';
  ansStandardInput: string;
  standardOutputLabel = '標準出力';
  ansStandardOutput: string;
  standardErrorLabel = '標準エラー';
  ansStandardError: string;
  exeTimeLabel = '実行時間';
  ansExeTime: string;
  exitCodeLabel = '終了コード';
  ansExitCode: string;
  testCodeTitle = 'Junit4テストコード';
  testCodeDescription = '上記解答コードの標準出力に対してのテストコードを下記に記載してください.テストケースは多いほど望ましいです.';
  testCode: string = 'import static org.hamcrest.CoreMatchers.*;\n' +
    'import static org.junit.Assert.*;\n' +
    'import java.io.ByteArrayOutputStream;\n' +
    'import java.io.PrintStream;\n' +
    'import org.junit.Test;\n\n' +
    'public class MainTest {\n\n' +
    '\t@Test\n' +
    '\tpublic void test() {\n' +
    '\t\tByteArrayOutputStream out = new ByteArrayOutputStream();\n' +
    '\t\tSystem.setOut(new PrintStream(out));\n\n' +
    '\t\tString[] s = {};\n' +
    '\t\tMain.main(s);\n\n' +
    '\t\tassertThat(out.toString(), is("your answer" + System.lineSeparator()));\n' +
    '\t}\n' +
    '}';
  testStandardOutput: string;
  testStandardError: string;
  testExeTime: string;
  testExitCode: string;
  exeLabel = '実行する';
  fixLabel = '修正する';
  registerLabel = '問題を登録する';
  removeLabel = '問題を取り消す';

  constructor() { }

  ngOnInit() {
  }

  runAns() {
    console.info('run answer code')
  }

  fixAns() {
    console.info('fix answer code')
  }

  runTest() {
    console.info('run test code');
  }

  fixTest() {
    console.info('fix test code')
  }

  addContest() {
    console.info('add contest')
  }

  rmContest() {
    console.info('remove contest')
  }

}
