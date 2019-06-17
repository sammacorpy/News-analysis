import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { News } from '../interfaces/news';
import { NewsService } from '../news.service';
import { User } from '../interfaces/user';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/take';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'viewnews',
  templateUrl: './viewnews.component.html',
  styleUrls: ['./viewnews.component.scss']
})
export class ViewnewsComponent implements OnInit, OnDestroy {

  user: User;
  likecount;
  likedbyme = false;
  @Output('triggershareevents') triggershareevents = new EventEmitter();
  @Output('togglenewsviewfrominside') togglenewsview = new EventEmitter();

  subs: Subscription;
  @Input('news') news: News;
  shared: boolean =false;
  constructor(private ns: NewsService, private auth: AuthService, private ps: ProfileService) {
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


  likeit() {
    this.ps.recordhistory("like",this.news.id,this.user.uid);
    
    this.ps.updateuserlikeactivities(this.user,this.news.id);

    this.ns.setlike(this.news.id, this.user.uid);
  }

  dislikeit() {
    this.ns.dislike(this.news.id, this.user.uid);
    this.ps.recordhistory("dislike",this.news.id,this.user.uid);

  }
  likedcount() {


    this.ns.getlikes(this.news.id).subscribe(val => {


    });
  }


  opennews() {
    this.togglenewsview.emit(this.news);
  }

  closenews(){

    this.togglenewsview.emit(this.news);
  }

  trigshareev() {
    this.shared = !this.shared;
    this.triggershareevents.emit({url: this.news.url, id: this.news.id, userid: this.user.uid});
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
