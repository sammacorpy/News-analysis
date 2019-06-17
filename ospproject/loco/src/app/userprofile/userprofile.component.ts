import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import 'rxjs/add/operator/take';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { User } from '../interfaces/user';
import { forkJoin } from 'rxjs';
import { News } from '../interfaces/news';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  user: User;
  currentlocation;
  edit = { email: false, name: false };
  newsliked: News[] = [];
  counts = { likes: 0, share: 0, view: 0 };
  ri: String[] = ['entertainment', 'general', 'technology', 'sports', 'science-and-nature',];
  rfeeds: string[] = [];
  rhistory: string[] = [];
  
  constructor(private gauth: AuthService, private ht: HttpClient, private ps: ProfileService) {
    navigator.geolocation.getCurrentPosition(x => {
      this.ht.get("https://api.opencagedata.com/geocode/v1/json?key=8ff70af1fcd54ea7a701873be37c7c04&q=" + x.coords.latitude + "%2C+" + x.coords.longitude + "&pretty=1&no_annotations=1").toPromise().then((l: any) => {
        localStorage.setItem("location", l.results[0].formatted);
      })
    });
    gauth.user$.take(1).subscribe(x => {
      this.user = x;
      this.ps.getlikescount(this.user.uid).take(1).subscribe(l => this.counts.likes = l);
      this.ps.getsharecount(this.user.uid).take(1).subscribe(l => this.counts.share = l);
      this.ps.getviewcount(this.user.uid).take(1).subscribe(l => this.counts.view = l);
      this.ps.getrecentlyvieweditems(this.user.uid).forEach(f => {
        f.take(1).subscribe(l => {
          this.rfeeds.push(l);
        })
      });

      this.rhistory=[];
      this.ps.gethistory(this.user.uid).forEach(e =>
        e.take(1).subscribe(l => {
          this.rhistory.push(l);
        })

      );

    });
    this.currentlocation = (localStorage.getItem('location') != null) ? localStorage.getItem('location') : "please enable your location service";




  }

  ngOnInit() {
  }

  enableeditmode(i) {
    if (i == "email")
      this.edit.email = true;
    else
      this.edit.name = true;
  }

  setcontenteditable(e) {
    e.inner
  }
  

}
