import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'OnLine Judge System Beta';
  loginLabel = 'ログインする';
  contestsLabel = 'Javaの問題に解答する'
  addcontestLabel = 'Javaの問題を作成する';
  resultsLabel = '成績を確認する';
  usersLabel = 'ユーザを確認する';

  constructor() { }

  ngOnInit() {
  }
}
