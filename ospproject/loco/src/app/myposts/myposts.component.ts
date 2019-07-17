import { Component, OnInit, OnDestroy  } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { TakesnapshotService } from '../takesnapshot.service';
import { NewsService } from '../news.service';
import { News } from '../interfaces/news';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss']
})
export class MypostsComponent implements OnInit, OnDestroy {
  user: User;
  allnews: News[];
  subs: Subscription;
  sharetriggered: boolean = false;
  sharedata = null;
  checkpoint: Date;
  viewnews;
  shownewsview: boolean=false;
  constructor(private auth: AuthService, private __: TakesnapshotService, private ns: NewsService) {
    this.subs = this.auth.user$.subscribe(u => {
      this.user=u;
      this.ns.getmynews(u.uid).subscribe(news => {
      this.allnews = news;
      this.checkpoint=news.length>=1?news[news.length-1].timestamp:0;
      });
    });
    __.takesnap();


  }

  setnewsview(data){
    this.viewnews=data;
    this.shownewsview=!this.shownewsview;
  }
  setsharedata(data) {
    this.sharedata = data.url;
    this.sharetriggered = !this.sharetriggered;
  }

  ngOnInit() {
  }


  onScroll() {
    this.ns.getmoremynews(this.checkpoint,4,this.user.uid).subscribe(news=>{
      news.forEach(element => {
        this.allnews.push(element);
      });
      this.checkpoint=news[news.length-1].timestamp;
    });
  }


  tracknews(index, news) {
    return news ? news.id : undefined;

  }

  ngOnDestroy(){
    this.allnews=[]
    this.subs.unsubscribe();
  }

}
