import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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

  responseData: any; // 응답 데이터
  requestPk = { "capsule_pk": 0 }; // 서버에 요청할 캡슐의 기본키

  capsuleData = { // 응답받은 캡슐 기본정보
    "capsule_name" : "",
    "capsule_date" : "",
    "capsule_expire" : "",
    "capsule_latitude" : "",
    "capsule_longitude" : "",
    "capsule_media" : ""
  };

  capsuleFriends = [ // 요청받은 친구들 배열

  ];

  
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider) {

    this.requestPk.capsule_pk = navParams.data; // 파라미터 데이터는 캡슐에 pk 데이터임


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopPage');
  }

}
