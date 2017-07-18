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
  friendList: any; // 요청받은 친구 배열

  userDetails = {
    "user_id" : "",
    "user_name" : ""
  };

  capsuleData = { // 응답받은 캡슐 기본정보
    "capsule_name" : "",
    "capsule_date" : "",
    "capsule_expire" : "",
    "capsule_latitude" : "",
    "capsule_longitude" : "",
    "capsule_media" : ""
  };

  capsuleMedia = {
    "media_path" : ""
  };

  
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails.user_id = data['user_id'];
    this.userDetails.user_name = data['user_name'];
    
    this.friendList = [

    ];

    this.requestPk.capsule_pk = navParams.data; // 파라미터 데이터는 캡슐에 pk 데이터임
    this.capsuleLoad();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopPage');
  }

  capsuleLoad () {

    this.authServiceProvider.postData(this.requestPk, '/capsulePop.php').then((result) => {
      
      this.responseData = result;

      console.log("캡슐 정보 : " + this.responseData);

      /**
       *  
       *  capsuleDate
          :
          "2017-07-17 19:54:24"
          capsuleExpire
          :
          "2017-07-18 11:20:00"
          capsuleName
          :
          "최영훈님에 추억"
          capsule_latitude
          :
          "35.6624164"
          capsule_longitude
          :
          "128.4135811"

          mediaPath
          :
          [{media0: "uploads/2017071712070724241.jpeg"}]
          0
          :
          {media0: "uploads/2017071712070724241.jpeg"}
          media0
          :
          "uploads/2017071712070724241.jpeg"
       * 
       */
      var capsule_name = this.responseData[0]['capsuleName'];
      var capsuleDate = this.responseData[0]['capsuleDate'];
      var capsuleExpire = this.responseData[0]['capsuleExpire'];
      var capsule_latitude = this.responseData[0]['capsule_latitude'];
      var capsule_longitude = this.responseData[0]['capsule_longitude'];
      var media_path = this.responseData[0]['mediaPath'][0]['media0'];
      var friends = this.responseData[0]['friends'];
      

      for(var i=0; i<friends.length; i++) {
        var temp = [{name: friends[i]['friend'+i]}];
        this.friendList.push(temp);
      }

      this.capsuleData.capsule_name = capsule_name;
      this.capsuleData.capsule_date = capsuleDate;
      this.capsuleData.capsule_expire = capsuleExpire;
      this.capsuleData.capsule_latitude = capsule_latitude;
      this.capsuleData.capsule_longitude = capsule_longitude;

      this.capsuleMedia.media_path = media_path;

      console.log("capsuleMedia data : " + this.capsuleMedia.media_path);


    });

  }

}
