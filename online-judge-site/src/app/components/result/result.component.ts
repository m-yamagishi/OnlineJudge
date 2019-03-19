import { Component, OnInit } from '@angular/core';
import { ActivateRoute } from '@angualr/router';

import { ResultService } from '../../services/result.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  contestNameLabel = '問題';
  contestName: string;
  answererLabel = '解答者';
  answerer: string;
  dateTimeLabel = '提出日時';
  dateTime;
  questionLabel = '問題内容';
  question: string;
  answerCodeLabel = '提出コード';
  answerCodeMd: string;
  exeTimeLabel = '実行時間';
  exeTime: string;
  testStdOutLabel= 'テスト標準出力';
  testStdOut: string;
  testStdErrLabel='テスト標準エラー'
  testStdErr: string;
  testExitCodeLabel = 'テスト終了コード';
  testExitCode: string;

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService) { }

  ngOnInit() {
    this.getResult(this.route.snapshot.paramMap.get('id'));
  }

  getResult(id: string): void {
    this.resultService.getResult(id).subscribe(
      (data) => {
        console.info(data)
        this.contestName = data['contest_name'];
        this.question = data['question'];
        this.answerer = data['answerer'];
        this.dateTime = data['date_time'];
        this.answerCodeMd = ''
        + "\`\`\`java\n"
        + data['answer_code']
        + "\n\`\`\`\n";
        this.exeTime = data['exe_time'];
        this.testStdOut = data['test_stdout'];
        this.testStdErr = data['test_stderr'];
        this.testExitCode = data['test_exit_code'];
      },
      (error) => {
        console.log('error')
        console.log(error)
      }
    )
  }

}
