import { Component, OnInit, HostListener } from '@angular/core';
import { TakesnapshotService } from '../takesnapshot.service';
import { NewsService } from '../news.service';
import 'rxjs/add/operator/take';
import { Observable, combineLatest } from 'rxjs';
import { News } from '../interfaces/news';
import { forEach } from '@angular/router/src/utils/collection';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations:[
    trigger('fadeup',[
      state('void',style({
        opacity:0,
        transform: 'translateY(-100%)'
      })),
      transition("void=>*",animate("500ms ease-in",style({
        opacity:1,
        transform: 'translateY(0%)'
      })))
    ])
  ]
})
export class MainComponent implements OnInit {

  // allnews=['a','b','c','a','b','c','a','b','c']
  sharetriggered: boolean = false;
  sharedata = null;
  checkpointdate: Date;
  allnews: News[];

  viewnews;
  shownewsview: boolean=false;
  // @HostListener(scroll)
  constructor(private ns: NewsService, private __: TakesnapshotService) {
    __.takesnap();

    // this.allnews=this.ns.latestnews;
    this.ns.latestnews.subscribe(alnws => {
      this.allnews = alnws
      this.checkpointdate = alnws[alnws.length - 1].timestamp;
    });
  }

  ngOnInit() {
  }
  setsharedata(data) {
    this.sharedata = data;
    this.sharetriggered = !this.sharetriggered;
  }

  setnewsview(data){
    this.viewnews=data;
    this.shownewsview=!this.shownewsview;
  }

  onScroll() {
    console.log(scrollY);
    console.log("Scrolling");
    let count = 8;
    this.ns.getmorenews(this.checkpointdate, count).subscribe(news => {
      console.log(news);
      news.forEach(element => {
        this.allnews.push(element);
      });
      // this.allnews.concat(news);
      if (news.length>0){
        this.checkpointdate = news[news.length-1].timestamp;

      }
      // return null;
    })
  }

  tracknews(index, news) {
    return news ? news.id : undefined;

  }

}
