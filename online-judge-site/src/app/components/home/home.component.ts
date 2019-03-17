import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'OnLine Judge System Beta';
  loginLabel = 'ログインする';
  answerLabel = 'Javaの問題に解答する'
  addLabel = 'Javaの問題を作成する';
  refLabel = '成績を確認する';

  constructor() { }

  ngOnInit() {
  }
}
