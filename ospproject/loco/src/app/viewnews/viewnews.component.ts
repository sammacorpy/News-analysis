import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from '../interfaces/news';
import { NewsService } from '../news.service';
import { User } from '../interfaces/user';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'viewnews',
  templateUrl: './viewnews.component.html',
  styleUrls: ['./viewnews.component.scss']
})
export class ViewnewsComponent implements OnInit {

  user: User;
  likecount;
  likedbyme = false;
  @Output('triggershareevents') triggershareevents = new EventEmitter();
  @Output('togglenewsviewfrominside') togglenewsview = new EventEmitter();

  subs: Subscription;
  @Input('news') news: News;
  shared: boolean =false;
  constructor(private ns: NewsService, private auth: AuthService) {
    this.subs = this.auth.user$.map(u => this.user = u).map(u => {
      this.ns.liked(this.news.id, u.uid).subscribe((res) => {
        console.log(res);
        this.likedbyme = res;
      });
      this.ns.getlikes(this.news.id).subscribe(x => {
        console.log(x);
        this.likecount = x;

      });
    }).subscribe();
  }

  ngOnInit() {
  }


  likeit() {
    console.log("liked", this.news.id);
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


  opennews() {
    this.togglenewsview.emit(this.news);
  }

  closenews(){
    console.log(
      "jahsja"
    )
    this.togglenewsview.emit(this.news);
  }

  trigshareev() {
    this.shared = !this.shared;
    this.triggershareevents.emit(this.news.url);
  }

}
