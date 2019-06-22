import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from './interfaces/user';
import * as firebase from 'firebase';
import { News } from './interfaces/news';
import { of, Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  feedsliked: News[] = [];
  timestamp = firebase.firestore.Timestamp.now().toMillis();
  constructor(private db: AngularFirestore) {



  }


  updateuserlikeactivities(user: User, feedid) {
    this.db.doc('/activities/likes/' + user.uid + '/' + feedid).set({ feedid, timestamp: this.timestamp });
  }
  updateuserviewactivities(user: User, feedid) {
    this.db.doc('/activities/view/' + user.uid + '/' + feedid).set({ feedid: feedid, timestamp: this.timestamp });
  }
  updateusershareactivities(userid: string, feedid, handler) {
    this.db.doc('/activities/share/' + userid + '/' + handler + '/ids/' + feedid).set({ feedid, timestamp: this.timestamp });

  }


  recordhistory(activity, feedid, userid) {
    this.db.collection('userhistory/' + userid + '/acts').add({
      timestamp: this.timestamp,
      feedid: feedid,
      activity: activity

    })

  }

  getlikescount(userid) {
    return this.db.collection('/activities/likes/' + userid).get().switchMap((x) => {
      return of(x.size);
      // let y:any[]=[];

      // x.forEach(r => {
      //   y.push(this.db.doc<News>('News/' + r.data().feedid).get().switchMap(x => {
      //     // this.feedsliked.push(x);
      //     return of(x.data())
      //   }));
      //   // this.feedsliked.push();  
      //   // console.log(r.data().feedid);
      // })
      // console.log(y)
      // return y;

    });
  }

  getsharecount(userid) {
    return this.db.collection('/activities/share/' + userid + '/linkedin/ids').get().switchMap((x) => {
      return of(x.size);
    });
  }

  getviewcount(userid) {
    return this.db.collection('/activities/view/' + userid).get().switchMap((x) => {
      return of(x.size);
    });
  }

  getrecentlyvieweditems(userid) {
    let data: any;
    return this.db.collection('/activities/view/' + userid, q => q.orderBy('timestamp', 'desc').limit(60)).get()
      .switchMap((x) => {
        let o = [];
        x.forEach(f => {
          o.push(this.db.doc('News/' + f.data().feedid).get().switchMap(feeds => {

            if (feeds.data()) {
              data = feeds.data();
              data.id = f.data().feedid;
            }
            return of(data);
          }));


        });
        return o;
      });
  }

  gethistory(userid) {
    return this.db.collection('userhistory/' + userid + '/acts', q => q.orderBy('timestamp', 'desc').limit(60)).get().switchMap(d => {
      let ret = [];
      let temp = [];
      let lstringel: string;
      let feeddata: string;
      d.forEach(histr => {


        ret.push(this.db.doc('News/' + histr.data().feedid).get().switchMap(feeds => {
          temp = [];
          feeddata = feeds.data().headline;
          lstringel = histr.data().activity;
          temp.push(histr.data().feedid);
          if (lstringel[lstringel.length - 1] != 'e') {
            temp.push("You " + lstringel + "ed" + " " + feeddata);
          }
          else {
            temp.push("You " + lstringel + "d" + " " + feeddata);

          }

          return of(temp);
        })
        )



      });
      return ret;
    })
  }

}
