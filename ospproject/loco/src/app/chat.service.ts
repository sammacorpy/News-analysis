import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './interfaces/user';
import * as firebase from 'firebase';
import { timestamp } from 'rxjs/operators';
import { MAY } from '@angular/material';
import { map } from 'rxjs-compat/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  timestamp = firebase.firestore.FieldValue.serverTimestamp();

  constructor(private db: AngularFirestore) {

  }

  sendmessage(msg, uid, userphotourl) {
    return this.db.collection('localchats').add({ message: msg, userphoto: userphotourl, uid: uid, timestamp: this.timestamp })
  }

  loadmessage() {
    return this.db.collection('localchats', ref => {
      return ref.orderBy('timestamp', "desc").limit(30);
    }).snapshotChanges().map(action => {
      return action.map(a=>{
        const id= a.payload.doc.id;
        const data= a.payload.doc.data();
        return {id , ...data}
      })
    });
  }
}
