import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ExpoProvider } from '../../providers/expo/expo';

@Component({
  selector: 'page-expo',
  templateUrl: 'expo.html'
})
export class ExpoPage {

  data: any = {};

  constructor(public expoData: ExpoProvider, public navCtrl: NavController) {
    expoData.get().subscribe((data: any) => {
      this.data = data;
      console.log(data);
    });
  }

}
