import { Component } from '@angular/core';

/**
 * Generated class for the MainComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'main',
  templateUrl: 'main.html'
})
export class MainComponent {

  text: string;

  constructor() {
    console.log('Hello MainComponent Component');
    this.text = 'Hello World';
  }

}
