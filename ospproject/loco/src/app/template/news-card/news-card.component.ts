import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';
import { NewsService } from 'src/app/news.service';
import { trigger } from '@angular/animations';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { News } from 'src/app/interfaces/news';
import { ProfileService } from 'src/app/profile.service';

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

  @Input('news') news: News;
  @Input('mode') mode;
  shared: boolean = false;
  user: User;
  likecount;
  likedbyme = false;
  @Output('triggershareevents') triggershareevents = new EventEmitter();
  @Output('togglenewsview') togglenewsview = new EventEmitter();

  subs: Subscription;


  constructor(private auth: AuthService, private ns: NewsService, private ps: ProfileService) {
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
    this.triggershareevents.emit({ url: this.news.url, id: this.news.id, userid: this.user.uid});
  }


  likeit() {
    this.ps.updateuserlikeactivities(this.user, this.news.id);
    this.ps.recordhistory("like",this.news.id,this.user.uid);
    this.ns.setlike(this.news.id, this.user.uid);
  }

  dislikeit() {
    this.ps.recordhistory("dislike",this.news.id,this.user.uid);

    this.ns.dislike(this.news.id, this.user.uid);
  }
  likedcount() {
    // return 1;
    // console.log("dfdf");

    this.ns.getlikes(this.news.id).subscribe(val => {
      // console.log("dfdf",val);

    });
  }


  opennews() {
    this.ps.recordhistory("view",this.news.id,this.user.uid);

    this.ps.updateuserviewactivities(this.user, this.news.id);
    this.togglenewsview.emit(this.news);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
