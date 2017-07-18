import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  responseData: any;
  requestUserId = { "userId": "" };
  myCapsule: any;
  tagCapsule: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider) { 
      const data = JSON.parse(localStorage.getItem('userData'));
      this.requestUserId.userId = data['user_id']; // 인증에 요청할 회원 아이디

      this.myCapsule = [
        // {"name": "Hello1", "code": 1},
        // {"name": "Hello2", "code": 2},
        // {"name": "Hello3", "code": 3},
        // {"name": "Hello4", "code": 4}
      ];

      this.tagCapsule = [
        
      ];

      this.loadMyCapsule();
      this.loadTagCapsule();

      console.log("data : " + this.requestUserId.userId);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  loadTagCapsule() {
    this.authServiceProvider.postData(this.requestUserId, '/tagCapsuleList.php').then((result) => {
      
      this.responseData = result;

      console.log("태그된 켑슐 데이터 : " +this.responseData);

      var message = this.responseData[0]['Message'];
      
      if(message == "success") { // 태그된 캡슐이 있을때

        for(var i=1; i<this.responseData.length; i++) {
          
          var capsuleDate = this.responseData[i]['capsuleDate'];
          var capsuleExpire = this.responseData[i]['capsuleExpire'];
          var capsuleName = this.responseData[i]['capsuleName'];
          var capsulePK = this.responseData[i]['capsulePK'];
          var media_path = this.responseData[i]['media_path'];

          var temp = [{name: capsuleName, expire: capsuleExpire, pk: capsulePK, image_path: media_path}];

          this.tagCapsule.push(temp);

        }

      } else { // 캡슐이 없을때

      }

    });
  }

  loadMyCapsule() {
    this.authServiceProvider.postData(this.requestUserId, '/capsuleList.php').then((result) => {
      this.responseData = result;

      console.log("전체 데이터 : "+this.responseData);

      var message = this.responseData[0]['Message'];

      if(message == "success") { // 캡슐이 있을때
        
        for(var i=1; i<this.responseData.length; i++) {

          /**
           *  capsuleDate
           *  capsuleExpire
           *  capsuleName
           *  capsulePK
           * 
           */


          // this.youngh.push(this.responseData[i]);

          var capsuleDate = this.responseData[i]['capsuleDate'];
          var capsuleExpire = this.responseData[i]['capsuleExpire'];
          var capsuleName = this.responseData[i]['capsuleName'];
          var capsulePK = this.responseData[i]['capsulePK'];
          var media_path = this.responseData[i]['media_path'];

          var temp = [{name: capsuleName, expire: capsuleExpire, pk: capsulePK, image_path: media_path}];

          this.myCapsule.push(temp);

          // console.log(this.responseData[1]);

          // console.log("response data : " + this.responseData[i]['capsulePK']);
          // console.log("response data : " + this.responseData[i]['capsuleName']);
          // console.log("response data : " + this.responseData[i]['capsuleDate']);
          // console.log("response data : " + this.responseData[i]['capsuleExpire']);

        }

        console.log( "this youngh : " + this.myCapsule);

      } else { // 캡슐이 없을때
        


      }

    });
  }

  getOpen(pk) {
    console.log(pk);
  }


}
