import { Injectable  } from '@angular/core';
import {auth} from 'firebase/app';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/switchMap';

import { Observable, of } from 'rxjs';
import { User } from './interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<User>;
  constructor(private afauth: AngularFireAuth, private db: AngularFirestore, private router: Router,private route: ActivatedRoute  ) {
    this.user$=this.afauth.authState.switchMap( user => {
      if(user){
        return this.db.doc<User>('users/'+user.uid).valueChanges();
      }
      else{
        return of(null); 
      } 
      

    });
   }



   async googlesign(){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/u';
     const provider= new auth.GoogleAuthProvider();
     const credential = await this.afauth.auth.signInWithPopup(provider);
     return this.updateUser(credential.user).then(res => this.router.navigateByUrl(returnUrl));
   }

   updateUser(user: User ) {
    const uref: AngularFirestoreDocument<User>=this.db.doc<User>('users/'+ user.uid);
    return uref.set({uid: user.uid, displayName: user.displayName, email: user.email, photoURL:user.photoURL},{merge: true});

   }


   async anonymous(){
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/u';
      return this.afauth.auth.signInAnonymously().then(cred=>{
        this.user$=of<User>(cred.user);
        localStorage.setItem('anonymous',JSON.stringify(cred.user));
      }).then(res => this.router.navigateByUrl(returnUrl));
   }


   async signupwithemailpassword(email:string, pass:string){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/u';
    return this.afauth.auth.createUserWithEmailAndPassword(email,pass).then(res => 
        this.afauth.auth.signInWithEmailAndPassword(email,pass).then(cred=> this.updateUser(cred.user))
      ).then(res => this.router.navigateByUrl(returnUrl));

   }
    async signinwithemailpassword(email:string, pass:string){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/u';
      return this.afauth.auth.signInWithEmailAndPassword(email,pass).then(res => this.router.navigateByUrl(returnUrl));

   }

   async resetpass(email:string){
     this.afauth.auth.sendPasswordResetEmail(email,)
   }


   async signout(){
     await this.afauth.auth.signOut();
     return this.router.navigate(['/login']);
   }
}
