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
  id;
  constructor(private ns: NewsService, private auth: AuthService, private cs: CrudService, private route: ActivatedRoute, private ps: ProfileService) {
    this.id = route.snapshot.paramMap.get('id');
    this.cs.get('/News/' + this.id).take(1).map(newss => {
      if (newss.author && !newss.author.includes('/') && !newss.author.includes('http') && !newss.author.includes('https') && !newss.author.includes(':')) {

        this.cs.get('users/' + newss.author).take(1).subscribe(u => {
          newss['userinfo'] = u;
          this.news = newss;
          // this.id = id;
        });
      }

    }).map(res => {
      this.subs = this.auth.user$.map(u => this.user = u).map(u => {
        this.ns.liked(this.id, u.uid).subscribe((res) => {
          this.likedbyme = res;
        });
        this.ns.getlikes(this.id).subscribe(x => {
          this.likecount = x;

        });
      }).subscribe();
    }).subscribe();
  }

  ngOnInit() {
  }


  likeit() {
    this.ps.recordhistory("like", this.id, this.user.uid);

    this.ps.updateuserlikeactivities(this.user, this.id);

    this.ns.setlike(this.id, this.user.uid);
  }

  dislikeit() {
    this.ns.dislike(this.id, this.user.uid);
    this.ps.recordhistory("dislike", this.id, this.user.uid);

  }
  likedcount() {


    this.ns.getlikes(this.id).subscribe(val => {


    });
  }



  trigshareev() {
    this.shared = !this.shared;

    let data = { url: this.news.url, id: this.id, userid: this.user.uid }
    this.sharedata = data;
    this.sharetriggered = !this.sharetriggered;

  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }


}
