import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { MainPage } from '../pages/main/main';
import { MainComponent } from '../components/main/main';
import { PushPage } from '../pages/push/push';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage,
    LoginPage,
    SignupPage,
    MainPage,
    MainComponent,
    PushPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage,
    LoginPage,
    SignupPage,
    MainPage,
    PushPage
  ],
  providers: [
    StatusBar,
    SplashScreen,AuthServiceProvider, Camera, ImagePicker, Base64,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
