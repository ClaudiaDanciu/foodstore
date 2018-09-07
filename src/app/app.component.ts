import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCsqKF6IqqYbI_4TQ3Kqzj-XB7H-iElKt0",
      authDomain: "foodstore-59d31.firebaseapp.com",
    });
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
