import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { MainPage } from '../main/main';
import { AlertController } from 'ionic-angular'; // alert included

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  responseData: any;
  userData = {"user_id": "", "user_pw": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider, public alerCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doAlert(title,content) {
    let alert = this.alerCtrl.create({
      title: title,
      message: content,
      buttons: ['Ok']
    });
    alert.present()
  }

  login() {
    
    // 공백 제거
    this.userData.user_id = this.userData.user_id.trim();
    this.userData.user_pw = this.userData.user_pw.trim();

    this.authServiceProvider.postData(this.userData, '/memberLogin.php').then((result)=> {
      this.responseData = result;
      console.log(this.responseData);
      var code = this.responseData[0]['code'];

      if( code == "login_success" ) {
        /*
          로그인에 성공했다면 메인 페이지로 이동한다.
            - 알림 없음
        */
        var user_id = this.responseData[0]['user_id'];
        var user_name = this.responseData[0]['user_name'];
        var user_data = {
          user_id,
          user_name
        };
        console.log("user data : "+user_data);
        console.log("user json data : "+ JSON.stringify(user_data));
        localStorage.setItem('userData', JSON.stringify(user_data)); // 저장
        this.navCtrl.push(MainPage);
      } else if ( code == "login_failed" ) {
        //// 로그인에 실패했다면 실패의 원인을 사용자에게 알려준다.
        var message = this.responseData[0]['message'];
        this.doAlert("로그인 실패", message);
      }

    })
  }

}
