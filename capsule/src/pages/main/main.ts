import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PushPage } from '../push/push';
/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})


export class MainPage {

  userDetails = {
    "user_id": "",
    "user_name": ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public app: App, menu: MenuController) {
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails.user_id = data['user_id'];
      this.userDetails.user_name = data['user_name'];
      console.log("data : " + this.userDetails.user_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  push() {
    this.navCtrl.push(PushPage);
  }

  logout() {
    localStorage.clear();
  }

}