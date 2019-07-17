import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { TakesnapshotService } from '../takesnapshot.service';
import { NewsService } from '../news.service';

import { Observable, combineLatest, Subscription } from 'rxjs';
import 'rxjs/add/operator/take';
import { News } from '../interfaces/news';
// import { forEach } from '@angular/router/src/utils/collection';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('fadeup', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(+100%)'

      })),
      transition("void=>*", [animate("900ms ease-Out", style({
        opacity: 1,
        transform: 'translateY(0%)'


      }))])
    ])
  ]
})
export class MainComponent implements OnInit, OnDestroy {

  // allnews=['a','b','c','a','b','c','a','b','c']
  sharetriggered: boolean = false;
  sharedata = null;
  checkpointdate: Date;
  allnews: News[] = [];
  currentnews: News[] = [];

  viewnews;
  shownewsview: boolean = false;
  // @HostListener(scroll)
  subs: Subscription;
  constructor(private ns: NewsService, private __: TakesnapshotService) {
    __.takesnap();

    // this.allnews=this.ns.latestnews;
    this.ns.latestnews().take(1).subscribe(alnws => {
      this.currentnews = [];
      this.allnews=[];

      alnws.forEach(element => {
        if ((new Date(element.timestamp)).getDate() == (new Date().getDate())) { //|| element.timestamp >= (new Date(parseInt(new Date().toTimeString()) - 5 * 60 * 60 * 100))
          this.currentnews.push(element);

        }
        else {
          this.allnews.push(element);
        }
      })

      this.checkpointdate = alnws[alnws.length - 1].timestamp;
    });
  }

  ngOnInit() {
  }
  setsharedata(data) {
    this.sharedata = data;
    this.sharetriggered = !this.sharetriggered;
  }

  setnewsview(data) {
    this.viewnews = data;
    this.shownewsview = !this.shownewsview;
  }

  onScroll() {

    let count = 8;
    this.ns.getmorenews(this.checkpointdate, count).take(1).subscribe(news => {
      news.forEach(element => {

        if ((new Date(element.timestamp)).getDate() == (new Date().getDate())) {
          this.currentnews.push(element);

        }
        else {
          this.allnews.push(element);
        }
        // this.allnews.push(element);
      });
      // this.allnews.concat(news);
      if (news.length > 0) {
        this.checkpointdate = news[news.length - 1].timestamp;

      }
      // return null;
    })
  }

  // tracknews(index, news) {
  //   return news ? news.id : undefined;

  // }

  ngOnDestroy() {

    // this.subs.unsubscribe();
    this.allnews = [];
  }

}
