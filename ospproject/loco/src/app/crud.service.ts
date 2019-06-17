import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';
import { User } from './interfaces/user';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CrudService {


  task: AngularFireUploadTask;
  user:User;
  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private ps:ProfileService, private gauth: AuthService) { 
    gauth.user$.take(1).subscribe(u=> this.user=u);
  }

  post(collection: string, data: any) {
    return this.db.collection(collection).add(data).then(x=>this.ps.recordhistory("post",x.id,this.user.uid));
  }

  get(location) {
    return this.db.doc<any>(location).valueChanges();
  }

  getcollection(location) {
    return this.db.collection<any>(location).valueChanges();
  }

  delete(location) {
    return this.db.doc<any>(location).delete();
  }

  // deletecollection(location){
  //   return this.db.collection(location);
  // }

  update(location: string, data: any) {
    const id=location.split('/')[1];
    return this.db.doc<any>(location).update(data).then(x=>this.ps.recordhistory("update",id,this.user.uid));
    ;
  }


  postfile(location, file: File) {
    const path = location + "/" + file.name + "_loco";
    return this.storage.upload(path, file);

  }

  deletefile(location, filename) {
    return this.storage.ref(location + "/" + filename).delete();
  }
  getfile(location) {
    return this.storage.ref(location).getDownloadURL().toPromise();

  }


}
