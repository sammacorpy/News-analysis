import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { News } from '../interfaces/news';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from '../news.service';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/user';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-viewfeed',
  templateUrl: './viewfeed.component.html',
  styleUrls: ['./viewfeed.component.scss']
})
export class ViewfeedComponent implements OnInit, OnDestroy {
  news: News;
  user: User;
  likecount;
  likedbyme = false;

  subs: Subscription;
  shared: boolean = false;
  sharetriggered: boolean;
  sharedata: any;
  constructor(private ns: NewsService, private auth: AuthService, private cs: CrudService, private route: ActivatedRoute, private ps: ProfileService) {
    let id = route.snapshot.paramMap.get('id');
    this.cs.get('/News/' + id).take(1).map(newss => {
      if (newss.author && !newss.author.includes('/') && !newss.author.includes('http') && !newss.author.includes('https') && !newss.author.includes(':')) {

        this.cs.get('users/' + newss.author).take(1).subscribe(u => {
          newss['userinfo'] = u;
          this.news = newss;
          this.news.id = id;
        });
      }

    }).map(res => {
      this.subs = this.auth.user$.map(u => this.user = u).map(u => {
        this.ns.liked(this.news.id, u.uid).subscribe((res) => {
          this.likedbyme = res;
        });
        this.ns.getlikes(this.news.id).subscribe(x => {
          this.likecount = x;

        });
      }).subscribe();
    }).subscribe();
  }

  ngOnInit() {
  }


  likeit() {
    this.ps.recordhistory("like", this.news.id, this.user.uid);

    this.ps.updateuserlikeactivities(this.user, this.news.id);

    this.ns.setlike(this.news.id, this.user.uid);
  }

  dislikeit() {
    this.ns.dislike(this.news.id, this.user.uid);
    this.ps.recordhistory("dislike", this.news.id, this.user.uid);

  }
  likedcount() {


    this.ns.getlikes(this.news.id).subscribe(val => {


    });
  }



  trigshareev() {
    this.shared = !this.shared;

    let data = { url: this.news.url, id: this.news.id, userid: this.user.uid }
    this.sharedata = data;
    this.sharetriggered = !this.sharetriggered;

  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }


}
