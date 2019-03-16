import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {CodeService} from '../../services/code.service';
import { ContestService } from '../../services/contest.service';

@Component({
  selector: 'app-addcontest',
  templateUrl: './addcontest.component.html',
  styleUrls: ['./addcontest.component.scss']
})
export class AddcontestComponent implements OnInit {
  options = { theme: 'vs-dark', language: 'java' }
  spinner = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  packageNameLabel = 'タイトル';
  packageNameDescription = 'タイトルはJavaのパッケージ名にも使用します.英字のアッパーキャメルケースで記載してください.';
  packageName: string = '';
  questionLabel = '問題文';
  question: string = '';
  answerCodeLabel = '解答コード';
  answerCodeDescription = '問題の答えを標準出力するプログラムを下記に記載してください.Mainクラスの定義mainメソッドのシグネチャは変更しないでください.';
  answerCode: string = 'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Your answer!");\n\t}\n}';
  answerCodeMd: string;
  answerCodeCompleted = false;
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
  testCodeDescription = '上記解答コードの標準出力に対してのテストコードを下記に記載してください.テストケースは多いほど望ましいです.Mainクラス同様MainTestクラスの定義も変更しないでください.';
  testCode: string = 'import static org.hamcrest.CoreMatchers.*;\n' +
    'import static org.junit.Assert.*;\n' +
    'import java.io.ByteArrayOutputStream;\n' +
    'import java.io.PrintStream;\n' +
    'import org.junit.Test;\n' +
    'import org.junit.BeforeClass;\n\n' +
    'public class MainTest {\n' +
    '\tstatic ByteArrayOutputStream out = new ByteArrayOutputStream();\n\n' +
    '\t@BeforeClass\n' +
    '\tpublic static void exeMain() {\n' +
    '\t\tSystem.setOut(new PrintStream(out));\n' +
    '\t\tString[] args = {};\n' +
    '\t\tMain.main(args);\n' +
    '\t}\n\n' +
    '\t@Test\n' +
    '\tpublic void isYourAnswer() {\n' +
    '\t\tassertThat(out.toString(), is("Your answer!" + System.lineSeparator()));\n' +
    '\t}\n\n' +
    '\t@Test\n' +
    '\tpublic void isNotYourAnswer() {\n' +
    '\t\tassertThat(out.toString(), is(not("My answer!" + System.lineSeparator())));\n' +
    '\t}\n' +
    '}';
  testCodeMd: string;
  testCodeCompleted = false;
  testStandardOutput: string;
  testStandardError: string;
  testExitCode: string;
  exeLabel = '実行する';
  fixLabel = '修正する';
  registerLabel = '問題を登録する';
  removeLabel = '問題を取り消す';
  conformLabel = '問題を取り消してよろしいですか？';
  yesLabel = 'はい';
  noLabel = 'いいえ';
  errorMessage:string = '';
  closeLabel = '閉じる';
  allCompleted = false;
  doneMessage = '登録が完了しました。';

  constructor(
    private http: HttpClient,
    private overlay: Overlay,
    private modalService: NgbModal,
    private codeService: CodeService,
    private contestService: ContestService) { }

  ngOnInit() {
  }

  runAns() {
    this.spinner.attach(new ComponentPortal(MatSpinner));

    var body = {
      language: 'java',
      source_code: this.answerCode,
      input: this.ansStandardInput || ''
    };
    this.codeService.run(body).subscribe(
      (data) => {
        this.ansStandardOutput = data['stdout'];
        this.ansStandardError = data['stderr'];
        this.ansExeTime = data['time'];
        this.ansExitCode = data['exit_code'];
        this.answerCodeCompleted = this.ansExitCode == '0';
        this.answerCodeMd = ""
          + "\`\`\`java\n"
          + this.answerCode
          + "\n\`\`\`\n";
        this.spinner.detach();
      },
      (error) => {
        console.log(error);
        this.spinner.detach();
      })
  }

  fixAns() {
    this.answerCodeCompleted = false;
  }

  runTest(error) {
    if(!this.answerCodeCompleted) this.errorMessage = '解答コードの実行を完了させてください。\n';
    if(this.errorMessage.length > 0) {
      this.openerromodal(error);
    } else {
      this.spinner.attach(new ComponentPortal(MatSpinner));
      var body = {
        source_code: this.answerCode,
        test_code: this.testCode,
      };
      this.codeService.junit(body).subscribe(
        (data) => {
          this.testStandardOutput = data['stdout'];
          this.testStandardError = data['stderr'];
          this.testExitCode = data['exit_code'];
          this.testCodeCompleted = this.testExitCode == '0';
          this.testCodeMd = ""
          + "\`\`\`java\n"
          + this.testCode
          + "\n\`\`\`\n";
          this.spinner.detach();
        },
        (error) => {
          console.log(error);
          this.spinner.detach();
        })
      }
  }

  fixTest() {
    this.testCodeCompleted = false;
  }

  addContest(error) {
    if(this.packageName.length < 1) this.errorMessage += 'タイトルを入力してください。\n';
    if(this.question.length < 1) this.errorMessage += '問題文を入力してください。\n';
    if(!this.answerCodeCompleted) this.errorMessage += '解答コードの実行を完了させてください。\n';
    if(!this.testCodeCompleted) this.errorMessage += 'テストコードの実行を完了させてください。\n';
    if(this.errorMessage.length > 0) {
      this.openerromodal(error);
    } else {
      this.spinner.attach(new ComponentPortal(MatSpinner));
      var body = {
        title: this.packageName,
        packageName: this.packageName,
        question: this.question,
        answerCode: this.answerCode,
        testCode: this.testCode
      }
      this.contestService.postContest(body).subscribe(
        (data) => {
          this.allCompleted = true;
          this.spinner.detach();
        },
        (error) => {
          console.log(error)
          this.spinner.detach();
        })
    }
  }

  private openerromodal(error) {
    this.modalService.open(error, {centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        this.errorMessage = '';
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        this.errorMessage = '';
        console.log(`Dismissed ${this.getDismissReason(reason)}`)
      });
  }

  rmContest(confirm) {
    this.modalService.open(confirm, {centered:true, ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`)
      });
  }

  rmYes() {
    this.packageName = undefined;
    this.question = undefined;
    this.answerCode = undefined;
    this.answerCodeMd = undefined;
    this.ansStandardInput = undefined;
    this.answerCodeCompleted = false;
    this.testCode = undefined;
    this.testCodeMd = undefined;
    this.testCodeCompleted = false;
    this.modalService.dismissAll();
  }

  rmNo() {
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
