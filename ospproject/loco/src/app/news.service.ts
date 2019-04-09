import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { News } from './interfaces/news';
import { map } from 'rxjs-compat/operator/map';
import { User } from './interfaces/user';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, ) { }

  enddate$: BehaviorSubject<Date>;

  get latestnews() {
    let news$: Observable<News[]>;
    let newsref: AngularFirestoreCollection<News>;

    newsref = this.db.collection<News>('News', ref => {
      return ref.orderBy('timestamp', 'desc').limit(32);
    });

    news$ = newsref.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    news$ = news$.switchMap(newss => {
      for (let i = 0; i < newss.length; i++) {
        if (newss[i].author && !newss[i].author.includes('/') && !newss[i].author.includes('http') && !newss[i].author.includes('https') && !newss[i].author.includes(':')) {

          this.db.doc<User>('users/' + newss[i].author).valueChanges().take(1).subscribe(u => {
            newss[i]['userinfo'] = u;
          });
        }
      }
      return of(newss);
    })
    // news.
    return news$;
  }

  // next
  getmorenews(checkpoint: Date, count: number) {
    let news$: Observable<News[]>;
    let newsref: AngularFirestoreCollection<News>;

    newsref = this.db.collection<News>('News', ref => {
      return ref.orderBy('timestamp', 'desc').startAfter(checkpoint).limit(count);
    });

    news$ = newsref.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    news$ = news$.switchMap(newss => {
      for (let i = 0; i < newss.length; i++) {
        if (newss[i].author && !newss[i].author.includes('/') && !newss[i].author.includes('http') && !newss[i].author.includes('https') && !newss[i].author.includes(':')) {
          this.db.doc<User>('users/' + newss[i].author).valueChanges().take(1).subscribe(u => {
            newss[i]['userinfo'] = u;
          });
        }
      }
      return of(newss);
    })
    // news.
    return news$;
  }


  searchnews(query) {

    let news$: Observable<News[]>;
    let newsref: AngularFirestoreCollection<News>;

    newsref = this.db.collection<News>('News', ref => {
      return ref.orderBy('headline').orderBy('timestamp', "desc").startAt(query).endAt(query + 'z').limit(100);
    });

    news$ = newsref.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    news$ = news$.switchMap(newss => {
      for (let i = 0; i < newss.length; i++) {
        if (newss[i].author && !newss[i].author.includes('/') && !newss[i].author.includes('http') && !newss[i].author.includes('https') && !newss[i].author.includes(':')) {

          this.db.doc<User>('users/' + newss[i].author).valueChanges().take(1).subscribe(u => {
            newss[i]['userinfo'] = u;
          });
        }
      }
      return of(newss);
    })
    // news.
    return news$;


  }

  // getmoresearchnews(query,checkpoint,count){

  //   let news$:Observable<News[]>;
  //   let newsref: AngularFirestoreCollection<News>;

  //   newsref = this.db.collection<News>('News', ref => {
  //     return ref.orderBy('headline').orderBy('timestamp',"desc").startAfter(query+checkpoint).limit(100);
  //   });

  //   news$ = newsref.snapshotChanges().map(actions => {
  //     return actions.map(a => {
  //       const data = a.payload.doc.data() as News;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     });
  //   });
  //   news$=news$.switchMap(newss=>{
  //     for(let i=0;i<newss.length;i++){
  //       this.db.doc<User>('users/'+newss[i].author).valueChanges().take(1).subscribe(u=>{
  //         newss[i]['userinfo']=u;
  //       });
  //     }
  //     return of(newss);
  //   })
  //   // news.
  //   return news$;


  // }

  getmynews(author) {


    let news$: Observable<News[]>;
    let newsref: AngularFirestoreCollection<News>;

    newsref = this.db.collection<News>('News', ref => {
      return ref.orderBy('timestamp', 'desc').where('author', '==', author).limit(10);
    });

    news$ = newsref.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    news$ = news$.switchMap(newss => {
      for (let i = 0; i < newss.length; i++) {
        if (newss[i].author && !newss[i].author.includes('/') && !newss[i].author.includes('http') && !newss[i].author.includes('https') && !newss[i].author.includes(':')) {

          this.db.doc<User>('users/' + newss[i].author).valueChanges().take(1).subscribe(u => {
            newss[i]['userinfo'] = u;
          });
        }
      }
      return of(newss);
    })
    // news.
    return news$;

  }


  getmoremynews(checkpoint: Date, count: number, author) {
    let news$: Observable<News[]>;
    let newsref: AngularFirestoreCollection<News>;

    newsref = this.db.collection<News>('News', ref => {
      return ref.orderBy('timestamp', 'desc').where('author', '==', author).startAfter(checkpoint).limit(count);
    });

    news$ = newsref.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    news$ = news$.switchMap(newss => {
      for (let i = 0; i < newss.length; i++) {
        if (newss[i].author && !newss[i].author.includes('/') && !newss[i].author.includes('http') && !newss[i].author.includes('https') && !newss[i].author.includes(':')) {

          this.db.doc<User>('users/' + newss[i].author).valueChanges().take(1).subscribe(u => {
            newss[i]['userinfo'] = u;
          });
        }
      }
      return of(newss);
    })
    // news.
    return news$;
  }



  setlike(id: string, uid: string) {

    return this.db.doc<any>('News/' + id + '/likes/' + uid).set({ like: true });
  }



  dislike(id: string, uid: string) {
    return this.db.doc("News/" + id + "/likes/" + uid).delete();

  }




  liked(id: string, uid: string) {
    return this.db.doc<any>('News/' + id + '/likes/' + uid).valueChanges().map(val => {
      if (val && val.like) {
        return val.like;
      }
      return false;
    });
  }
  getlikes(id: string) {
    return this.db.collection<any>('News/' + id + '/likes').valueChanges().map(val => {
      // console.log(val);
      return val.length;
    });
  }
}
