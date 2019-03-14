import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	title = 'Online Judge Site';
	heroes = 'Heroes';
	exercise = '問題一覧';
	regi_exe = '問題登録';
	user_list = 'ユーザ一覧';
	login = 'ログイン';
  
	constructor() { }

	ngOnInit() {
	}

}
