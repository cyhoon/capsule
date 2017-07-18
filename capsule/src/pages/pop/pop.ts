import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

declare var google;

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

  
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider) {
    
    this.friendList = [

    ];

    this.requestPk.capsule_pk = navParams.data; // 파라미터 데이터는 캡슐에 pk 데이터임
    this.capsuleLoad();
    // this.loadMap();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopPage');
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails.user_id = data['user_id'];
    this.userDetails.user_name = data['user_name'];

    /**
     * 
     * 오류나는 실행 순서
     *  -> capsuleLoad() -> loadMap()
     * 
     *  위에 순서로하면 loadMap에서 nativeElement가 선언되지 않았다고 오류가 난다.
     * 
     *  그래서 나는 목록에서 클릭이 될때 latitude, longitude를 서버에서 가져와서
     *  localStorage에 저장한 후 액티비티가 넘어간 후에 
     *  저장한 localStorage에서 latitude, longitude를 가져와서 지도에 넣어준다...
     * 
     */
    const capsuleData = JSON.parse(localStorage.getItem('capsuleData'));
    this.capsuleData.capsule_latitude = capsuleData['capsule_latitude'];
    this.capsuleData.capsule_longitude = capsuleData['capsule_longitude'];
    this.requestPk = capsuleData['capsule_pk'];

    this.loadMap();
  }


  loadMap(){
    
    
    console.log("latitude : " + this.capsuleData.capsule_latitude);

    let latLng = new google.maps.LatLng(this.capsuleData.capsule_latitude, this.capsuleData.capsule_longitude);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.addMarker();
 
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";
    
    // this.addInfoWindow(marker, content);

  }

  // addInfoWindow(marker, content) {
  //   let infoWindow = new google.maps.Infowindow({
  //     content: content
  //   });

  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //   });
  // }

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
