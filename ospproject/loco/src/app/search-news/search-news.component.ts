import { Component, OnInit, OnDestroy } from '@angular/core';
import { TakesnapshotService } from '../takesnapshot.service';
import { NewsService } from '../news.service';
import { News } from '../interfaces/news';
// import { take } from 'rxjs/operators';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-search-news',
  templateUrl: './search-news.component.html',
  styleUrls: ['./search-news.component.scss']
})
export class SearchNewsComponent implements OnInit , OnDestroy{

  allnews: News[];
  sharetriggered: boolean = false;
  sharedata = null;
  searchq;
  checkpoint: Date;
  viewnews;
  shownewsview: boolean=false;
  constructor(private __: TakesnapshotService, private ns: NewsService) {
    __.takesnap();

    this.ns.latestnews().take(1).subscribe(news =>{ console.log("abccjheck, ",news ); this.allnews = news;});

  }

  ngOnInit() {
  }
  setnewsview(data){
    this.viewnews=data;
    this.shownewsview=!this.shownewsview;
  }
  setsharedata(data) {
    this.sharedata = data.url;
    this.sharetriggered = !this.sharetriggered;
  }


  searchnews() {
    this.ns.searchnews(this.searchq).take(1).subscribe(news => {
      this.allnews = news;
      this.checkpoint = news[news.length - 1].timestamp;
    });
  }

  // onScroll() {
  //   this.ns.getmoresearchnews(this.searchq,this.checkpoint,1).subscribe(news=>{
  //     news.forEach(element => {
  //       this.allnews.push(element);
  //     });
  //     this.checkpoint=news[news.length-1].timestamp;
  //   });
  // }

  tracknews(index, news) {
    return news ? news.id : undefined;

  }
  ngOnDestroy(){
    this.allnews=[];
  }

}
