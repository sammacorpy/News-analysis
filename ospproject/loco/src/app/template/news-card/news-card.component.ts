import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';
import { NewsService } from 'src/app/news.service';
import { trigger } from '@angular/animations';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

// import { url } from 'inspector';

@Component({
  selector: 'news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  animations: [
    trigger('like', [

    ])
  ],
})
export class NewsCardComponent implements OnInit, OnDestroy {

  @Input('news') news;
  @Input('mode') mode;
  shared: boolean = false;
  user: User;
  likecount;
  likedbyme = false;
  @Output('triggershareevents') triggershareevents = new EventEmitter();
  @Output('togglenewsview')togglenewsview  = new EventEmitter();

  subs: Subscription;


  constructor(private auth: AuthService, private ns: NewsService) {
    this.subs = this.auth.user$.map(u => this.user = u).map(u => {
      this.ns.liked(this.news.id, u.uid).subscribe((res) => {

        this.likedbyme = res;
      });
      this.ns.getlikes(this.news.id).subscribe(x => {
        this.likecount = x;

      });
    }).subscribe();
  }


  ngOnInit() {
  }

  trigshareev() {
    this.shared = !this.shared;
    this.triggershareevents.emit(this.news.url);
  }


  likeit() {
    this.news.likes += 1;
    this.ns.setlike(this.news.id, this.user.uid);
  }

  dislikeit() {
    this.ns.dislike(this.news.id, this.user.uid);
  }
  likedcount() {
    // return 1;
    // console.log("dfdf");

    this.ns.getlikes(this.news.id).subscribe(val => {
      // console.log("dfdf",val);

    });
  }


  opennews(){
    this.togglenewsview.emit(this.news);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
