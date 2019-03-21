import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	title = 'Online Judge Site';
	homeLabel = 'ホーム';
	contestsLabel = '問題一覧';
	addContestLabel = '問題登録';
	resultLabel = '成績一覧';
	usersLabel = 'ユーザ一覧';
	user: string;
	role: string;
	loginLabel = 'ログイン';
	logoutLabel = 'ログアウト';
  
	constructor(
		private router: Router,
		private cookieService: CookieService) {}

	ngOnInit() {
		this.user = this.cookieService.get('online-judge-site-user');
		var roleCd = this.cookieService.get('online-judge-site-role');

		if(roleCd == 'Answerer') this.role = '解答者';
		else if(roleCd == 'Questioner') this.role = '出題者';
		else if(roleCd == 'Administrator') this.role = '管理者';
		else this.role = 'その他';
	}

	go(page) {
		this.router.navigateByUrl(page);
	}

	logout() {
		this.cookieService.deleteAll();
		// location.reload();
		this.router.navigateByUrl('home');
	}
}
