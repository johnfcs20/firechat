import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {  AngularFireModule } from 'angularfire2';
import {  AngularFirestoreModule } from 'angularfire2/firestore';
import {  AngularFireAuthModule } from 'angularfire2/auth';
import {firebaseConfig} from "../../src/environments/firebase.config";

/*export const firebaseConfig={

apiKey: '',
authDomain: '',
databaseUrl: '',
storageBucket: '',
messagingSenderId: ''
};*/

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
//import { ChatComponent } from './components/chat/chat.component';

import {ChatService} from './providers/chat.service';
import { LoginComponent } from './components/login/login.component'


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    //ChatComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    HttpModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
