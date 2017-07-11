import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the PushPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-push',
  templateUrl: 'push.html',
})
export class PushPage {

  // request data
  /**
   * 유저아이디,
   * 캡슐이름,
   * 사진,
   * 친구,
   * 봉인할 기간,
   * 좌표
   */
  responseData: any;
  requestData = {
    "user_id": "", 
    "capsule_name": "", // ok
    "friends":"", // ok
    "expiredate": "", // ok
    "latitude": "",
    "longitude":""
  };


  public photos: any;
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera
  , private alertCtrl: AlertController, public authServiceProvider: AuthServiceProvider) {
     const data = JSON.parse(localStorage.getItem('userData'));
      this.requestData.user_id = data['user_id'];
      this.requestData.latitude = "12.5";
      this.requestData.longitude = "34.4";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PushPage');
  }


  capsulePut() {
    
    this.requestData.capsule_name = this.requestData.capsule_name.trim();
    this.requestData.friends = this.requestData.friends.trim();
    this.requestData.expiredate = this.requestData.expiredate.trim();

    this.authServiceProvider.postData(this.requestData, '/test.php').then((result)=> {
      this.responseData = result;
      console.log(this.responseData);
      // 1차 추출 데이터
      // {"user_id":"","capsule_name":"hello","friends":"fadsfa","expiredate":"2017-01-01","latitude":"","longitude":""}
      // 2차 추출 데이터
      // "user_id":"ccc23@cyh.com","capsule_name":"name","friends":"hello,cyh","expiredate":"2017-11-07","latitude":"12.5","longitude":"34.4"
      
    });

  }


  ngOnInit() {
    this.photos = [];
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    this.photos.push(this.base64Image);
    this.photos.reverse();
    }, (err) => {
    // Handle error
    });
  }

  deletePhoto(index) {
    let alert = this.alertCtrl.create({
    title: 'Sure you want to delete this picture?',
    message: '',
    buttons: [
      {
        text: 'No',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.photos.splice(index,1);
        }
      }
    ]
  });
  alert.present();
  }

}
