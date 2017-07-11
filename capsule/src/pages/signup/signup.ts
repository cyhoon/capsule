import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular'; // alert included
import { ToastController } from 'ionic-angular'; // toast included
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData: any;
  userData = {"user_name": "", "user_id": "", "user_pw": ""};

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, 
    public alerCtrl: AlertController) {
  }

  doAlert(title,content) {
    let alert = this.alerCtrl.create({
      title: title,
      message: content,
      buttons: ['Ok']
    });
    alert.present()
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    this.userData.user_id = this.userData.user_id.trim(); // userid 공백 처리
    
    this.authServiceProvider.postData(this.userData, '/memberJoin.php').then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      var code = this.responseData[0]['code'];
      var message = this.responseData[0]['message'];
      
      if( code == "reg_success" ) { // 회원가입 성공
        
        this.doAlert("가입을 축하드립니다", message);
        this.navCtrl.push(LoginPage);

      } else {
        this.doAlert("가입에 실패했습니다.",message);
      }

    }, (err) => {
      // Conection failed message
    });
  }

}
