import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  user;
  constructor(private gauth: AuthService) { 
    gauth.user$.take(1).subscribe(x=>this.user=x);
  }

  ngOnInit() {
  }

}
