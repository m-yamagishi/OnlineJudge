import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	title = 'Online Judge Site';
	home = 'ホーム';
	exercise = '問題一覧';
	regi_exe = '問題登録';
	result = '成績確認';
	user_list = 'ユーザ一覧';
	login = 'ログイン';
  
	constructor(private router: Router) { }

	ngOnInit() {
	}

	go(page) {
		this.router.navigateByUrl(page);
	}
}
