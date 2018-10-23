import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit(): void {

    const config = {
      apiKey: 'AIzaSyAa6JnasFjmSncZv3w-WhrFcDkaibJg33A',
      authDomain: 'insta-clone-6c425.firebaseapp.com',
      databaseURL: 'https://insta-clone-6c425.firebaseio.com',
      projectId: 'insta-clone-6c425',
      storageBucket: 'insta-clone-6c425.appspot.com',
      messagingSenderId: '413997524546'
    };

    firebase.initializeApp(config);
  }
}
