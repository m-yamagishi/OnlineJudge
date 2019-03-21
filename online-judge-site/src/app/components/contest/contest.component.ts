import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { CookieService } from 'ngx-cookie-service';

import { CodeService } from '../../services/code.service';
import { ContestService } from '../../services/contest.service';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {
  options = {
    theme: 'vs-dark',
    language: 'java',
    fontSize: 16,
    // renderWhitespace: 'all'
    tabCompletion: true,
    scrollBeyondLastLine: false,
  }
  spinner = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  contestId: string;
  titleLabel = 'タイトル';
  title: string;
  questionLabel = '問題文';
  question: string;
  answerCodeLabel = '解答コード';
  answerCodeDescription = '問題の答えを標準出力するプログラムを下記に記載してください.Mainクラスの定義,mainメソッドのシグネチャは変更しないでください.System.exit()などJVMを終了させるコードを実行するとテストが正常に実行されない場合があります.';
  answerCode: string = 'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Your answer!");\n\t}\n}';
  answerCodeMd: string;
  answerCodeCompleted = false;
  stdInputLabel = 'mainメソッドの引数';
  stdInput: string;
  stdOutputLabel = '標準出力';
  stdOutput: string;
  stdErrorLabel = '標準エラー';
  stdError: string;
  exeTimeLabel = '実行時間';
  exeTime: string;
  exitCodeLabel = '終了コード';
  exitCode: string;
  canSubmit = false;
  testCode: string;
  testStdOutput: string;
  testStdError: string;
  testExitCode: string;
  allCompleted = false;
  answerCnt: number;
  exeLabel = '実行する';
  fixLabel = '修正する';
  submitLabel = '提出する';
  conformLabel = '提出してよろしいですか？';
  yesLabel = 'はい';
  noLabel = 'いいえ';
  doneMessage = '提出しました';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private codeService: CodeService,
    private contestService: ContestService,
    private overlay: Overlay,
    private modalService: NgbModal,
    private resultService: ResultService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.contestId = this.route.snapshot.paramMap.get('id');
    this.getContest(this.contestId);
  }

  getContest(id: string): void{
    this.contestService.getContest(id).subscribe(
      (data) => {
        this.title = data['title'];
        this.question = data['question'];
        this.testCode = data['testCode'];
        this.answerCnt = data['answer_count'] || 0;
      },
      (error) => {
        console.log('error')
        console.log(error)
      });
  }

  exec() {
    this.spinner.attach(new ComponentPortal(MatSpinner));

    var body = {
      language: 'java',
      source_code: this.answerCode,
      input: this.stdInput || ''
    };
    this.codeService.run(body).subscribe(
      (data) => {
        this.stdOutput = data['stdout'];
        this.stdError = data['stderr']
        this.exeTime = data['time'];
        this.exitCode = data['exit_code'];
        this.canSubmit = this.exitCode == '0';
        this.answerCodeMd = ''
        + "\`\`\`java\n"
        + this.answerCode
        + "\n\`\`\`\n";
        this.spinner.detach();
      },
      (error) => {
        console.log(error);
        this.spinner.detach();
      }
    )
  }

  fixAns() {
    this.canSubmit = false;
  }

  submit(confirm) {
    this.modalService.open(confirm, {centered:true, ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`)
      });
  }

  submitYes() {
    this.modalService.dismissAll();

    this.spinner.attach(new ComponentPortal(MatSpinner));
    var body = {
      source_code: this.answerCode,
      test_code: this.testCode
    };
    this.codeService.junit(body).subscribe(
      (data) => {
        console.info(data)
        this.testStdOutput = data['stdout'];
        this.testStdError = data['stderr'];
        this.testExitCode = data['exit_code'];

        var body = {
          contest_id: this.contestId,
          contest_name: this.title || null,
          question: this.question,
          answerer: this.cookieService.get('online-judge-site-user'),
          date_time: new Date(),
          answer_code: this.answerCode,
          answer_stdout: this.stdOutput || null,
          answer_stderr: this.stdError || null,
          ansewr_exit_code: this.exitCode || null,
          exe_time: this.exeTime,
          test_code: this.testCode,
          test_stdout: this.testStdOutput,
          test_stderr: this.testStdError,
          test_exit_code: this.testExitCode,
        }
        this.resultService.postResult(body).subscribe(
          (data) => {
            console.info(data)
            this.allCompleted = true;
            this.errorMessage = '';
            this.spinner.detach();

            var body = {
              answer_count: this.answerCnt + 1
            };
            this.contestService.putContest(this.contestId, body).subscribe(
              (data) => {
                console.info(data)
              },
              (error) => {
                console.log('error')
                console.log(error)
              }
            );
          },
          (error) => {
            this.errorCallback(error)
          }
        )
      },
      (error) => {
        this.errorCallback(error)
      }
    )
  }

  private errorCallback (error) {
    this.errorMessage = 'エラーが発生しています.管理者に問い合わせてください';
    console.log('error')
    console.log(error)
    this.spinner.detach();
  }

  submitNo() {
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
