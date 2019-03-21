import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userNameLabel = 'ユーザ';
  userName = '';
  userNameError = false;
  userNameErrorMessage = '';
  passwordLabel = 'パスワード';
  password = '';
  passwordError = false;
  passwordErrorMessage = 'パスワードを入力してください';
  loginLabel = 'Login';
  signinLabel = 'Sign In';
  loginCompleted = false;
  doneMessage = 'ログインしました';

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
  }

  changeUserName() {
    this.checkUserName();
  }

  changePassword() {
    this.checkPassWord();
  }

  login() {
    this.check();
    if (this.userNameError || this.passwordError) return;
    this.userService.getUser(this.userName).subscribe(
      (data) => {
        if(data != null) {
          if(data['password'] == this.password) this.loginSucceed(data['role']);
          else this.wrongPassword();
        }
        else this.notRegisteredUser();
      },
      (error) => {
        console.log('error')
        console.log(error)
      }
    )
  }

  private loginSucceed = function (role: string) {
    this.loginCompleted = true;
    this.userNameError = this.passwordError = false;
    this.cookieService.set('online-judge-site-user', this.userName);
    this.cookieService.set('online-judge-site-role', role);
    this.router.navigateByUrl('contests');
  };

  private wrongPassword = function () {
    this.passwordError = true;
    this.passwordErrorMessage = 'パスワードが違います';
  };

  private notRegisteredUser = function () {
    this.userNameError = true;
    this.userNameErrorMessage = 'ユーザが登録されていません';
  };

  private registeredUser = function () {
    this.userNameErrorMessage = 'ユーザがすでに登録されています';
  };

  signin() {
    this.check();
    if (this.userNameError || this.passwordError) return;
    this.userService.getUser(this.userName).subscribe(
      (data) => {
        this.userNameError = data != null;
        if (data != null) this.registeredUser();
        else {
          this.userService.postUser({ name: this.userName, password: this.password }).subscribe(
            (data) => { this.loginSucceed('Answerer') },
            (error) => {
              console.log('error')
              console.log(error)
            }
          )
        }
      },
      (error) => {
        console.log('error')
        console.log(error)
      }
    )
  }

  private checkUserName() {
    if(this.userName.length < 1) {
      this.userNameError = true;
      this.userNameErrorMessage = 'ユーザを入力してください';  
    } else {
      this.userNameError = false;
      this.userNameErrorMessage = '';  
    }
  }

  private checkPassWord() {
    this.passwordError = this.password.length < 1;
  }

  private check() {
    this.checkUserName();
    this.checkPassWord();
  }

}
