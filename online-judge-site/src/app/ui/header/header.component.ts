import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	title = 'Online Judge Site';
	exercise = '問題一覧';
	regi_exe = '問題登録';
	result = '成績確認';
	user_list = 'ユーザ一覧';
	login = 'ログイン';
  
	constructor() { }

	ngOnInit() {
	}

}
