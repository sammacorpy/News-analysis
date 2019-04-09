import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './interfaces/user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  timestamp=firebase.firestore.FieldValue.serverTimestamp();

  constructor(private db: AngularFirestore) {
    
   }

  sendmessage(msg,uid,userphotourl){
    return this.db.collection('localchats').add({message:msg,userphoto:userphotourl, uid: uid,timestamp:this.timestamp})
  }

  loadmessage(){
    return this.db.collection('localchats',ref=>{
      return ref.orderBy('timestamp',"desc").limit(50)
    }).valueChanges();
  }
}
