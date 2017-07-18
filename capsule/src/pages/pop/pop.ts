import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pop',
  templateUrl: 'pop.html',
})
export class PopPage {

  capsule_pk: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.capsule_pk = navParams.data; // 파라미터 데이터는 캡슐에 pk 데이터임
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopPage');
  }

}
