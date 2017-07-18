import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopPage } from './pop';

@NgModule({
  declarations: [
    PopPage,
  ],
  imports: [
    IonicPageModule.forChild(PopPage),
  ],
  exports: [
    PopPage
  ]
})
export class PopPageModule {}
