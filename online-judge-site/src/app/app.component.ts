import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Online Judge Site';
  heroes = 'Heroes';
  exercise = '問題一覧';
  regi_exe = '問題登録';
  user_list = 'ユーザ一覧';
  login = 'ログイン';
}
