import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IntroPage } from '../intro/intro';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  intro() {
    this.navCtrl.push(IntroPage);
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  main() {
    this.navCtrl.push(MainPage);
  }

}
