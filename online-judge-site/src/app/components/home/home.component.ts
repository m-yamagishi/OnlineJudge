import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'OnLine Judge System Beta';
	md = ""
		+ "\n"
		+ "- [Java問題に解答する](/contests)\n"
    + "- [Java問題を作成する](/addcontest)\n"
    + "- 解答状況を確認する\n"
		+ "";

  constructor() { }

  ngOnInit() {
  }
}
