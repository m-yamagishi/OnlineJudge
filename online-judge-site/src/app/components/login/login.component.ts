import { Component, OnInit } from '@angular/core';

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

  constructor(private userService: UserService) { }

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
          if(data['password'] == this.password) {
              this.loginCompleted = true;
              this.userNameError = this.passwordError = false;
          } else {
            this.passwordError = true;
            this.passwordErrorMessage = 'パスワードが違います';
          }
        } else {
          this.userNameError = true;
          this.userNameErrorMessage = 'ユーザが登録されていません';
        }
      },
      (error) => {
        console.log('error')
        console.log(error)
      }
    )
  }

  signin() {
    this.check();
    if (this.userNameError || this.passwordError) return;
    this.userService.getUser(this.userName).subscribe(
      (data) => {
        this.userNameError = data != null;
        if (data != null) {
          this.userNameErrorMessage = 'ユーザがすでに登録されています';
        } else {
          var body = {
            name: this.userName,
            password: this.password
          };
          this.userService.postUser(body).subscribe(
            (data) => {
              // console.info(data);
              this.loginCompleted = true;
            },
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
