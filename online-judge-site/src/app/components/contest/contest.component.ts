import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { CodeService } from '../../services/code.service';
import { ContestService } from '../../services/contest.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {
  options = { theme: 'vs-dark', language: 'java' }
  spinner = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  titleLabel = 'タイトル';
  title: string;
  questionLabel = '問題文';
  question: string;
  answerCodeLabel = '解答コード';
  answerCodeDescription = '問題の答えを標準出力するプログラムを下記に記載してください.Mainクラスの定義,mainメソッドのシグネチャは変更しないでください.';
  answerCode: string = 'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Your answer!");\n\t}\n}';
  answerCodeMd: string;
  answerCodeCompleted = false;
  stdInputLabel = '標準入力';
  stdInput: string;
  stdOutputLabel = '標準出力';
  stdOutput: string;
  stdErrorLabel = '標準エラー';
  stdError: string;
  exeTimeLabel = '実行時間';
  exeTime: string;
  exitCodeLabel = '終了コード';
  exitCode: string;
  testCode: string;
  allCompleted = false;
  exeLabel = '実行する';
  fixLabel = '修正する';
  submitLabel = '提出する';
  conformLabel = '提出してよろしいですか？';
  yesLabel = 'はい';
  noLabel = 'いいえ';
  doneMessage = '提出しました';

  constructor(
    private route: ActivatedRoute,
    private codeService: CodeService,
    private contestService: ContestService,
    private overlay: Overlay,
    private modalService: NgbModal) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    this.getContest(id);
  }

  getContest(id: string): void{
    this.contestService.getContest(id).subscribe(
      (data) => {
        this.title = data['titlie'];
        this.question = data['question'];
        this.testCode = data['testCode'];
      },
      (error) => {
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
        this.spinner.detach();
      },
      (error) => {
        console.log(error);
        this.spinner.detach();
      }
    )
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
    this.allCompleted = true;
    this.answerCodeMd = ""
    + "\`\`\`java\n"
    + this.answerCode
    + "\n\`\`\`\n";
    this.modalService.dismissAll();
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
