import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ActivatedRouteSnapshot,Router, RouterStateSnapshot } from '@angular/router';
import { TakesnapshotService } from '../takesnapshot.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  user$:Observable<User>;
  sidenavstat:boolean=false;
  chatopen:boolean=false;
  constructor(private auth: AuthService, private route: Router, private __: TakesnapshotService) { 
    
    
    if(auth.user$){
      
      this.user$=auth.user$;
    }
    __.takesnap();
  }

  signOut(){
    this.auth.signout();
  }
  ngOnInit() {
  }

  togglechat(){
    this.chatopen=!this.chatopen;
  }

}
