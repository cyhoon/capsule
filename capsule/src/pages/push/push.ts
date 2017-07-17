import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

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
    "photos": "",
    "latitude": "",
    "longitude":""
  };

  requestPhotos = {
    "base64String": ""
  };


  public photos: any;
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera
  , private alertCtrl: AlertController, public authServiceProvider: AuthServiceProvider,
    public imagePicker: ImagePicker, private base64: Base64) {
     const data = JSON.parse(localStorage.getItem('userData'));
      this.requestData.expiredate = "2017-07-20T07:20Z";
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

    this.authServiceProvider.postData(this.requestData, '/capsulePush.php').then((result)=> {
      this.responseData = result;
      console.log(this.responseData);
      // 1차 추출 데이터
      // {"user_id":"","capsule_name":"hello","friends":"fadsfa","expiredate":"2017-01-01","latitude":"","longitude":""}
      // 2차 추출 데이터
      // "user_id":"ccc23@cyh.com","capsule_name":"name","friends":"hello,cyh","expiredate":"2017-11-07","latitude":"12.5","longitude":"34.4"
      
    });

  }

  imageRequest(base64String) {
    this.requestPhotos.base64String = base64String;
    this.authServiceProvider.postData(this.requestPhotos, '/complete.php').then((result)=> {
      // this.responseData = result;
      // console.log(this.responseData);
    });
  }

 


  ngOnInit() {
    this.photos = [];
  }

  getPhoto() {
    /**
     * 
     * 따로 분리해서 보내는것이 좋을것같음.
     * 
     * 사진 전송 과정
     * 
     *  - 사용자가 사진을 선택함.
     *  - 사진을 base64로 인코딩함.
     *  - 서버로 base64로 인코딩된것을 전송함.
     *  - 서버에서는 base64인코딩을 디코딩하고 이미지 파일을 얻어서 지정된 경로에 저장한다.
     * 
     */

    // this.requestData.photos="hello" 

    let options: ImagePickerOptions = {
        // maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
        // width: 800,
        // height: 800,
        outputType: 0,
        quality: 100            // Higher is better
    };

    this.imagePicker.getPictures(options).then((results) => { // 사진 선택 및 가져오기
      for (var i=0; i<results.length; i++) {
        this.requestData.photos = results[i];
        this.getBase64ToRequest(results[i]);
      }
    }, (err) => {});

  }

  getBase64ToRequest(file_path) {
    this.base64.encodeFile(file_path).then((base64File: string) => {
      // console.log(base64File);

      this.requestData.photos = base64File;
      this.imageRequest(base64File);

    }, (err) => {
      console.log(err);
    });
  }

  takePhoto() {

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let base64Image = 'data:image/jpeg;base64,' + imageData;
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
