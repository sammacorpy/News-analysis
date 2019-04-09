import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Input('showsidenav')showsidenav:Boolean=false;
  @Output('clicksidenavbg') clicksidenavbg = new EventEmitter();
  @Output('triggerchat') triggerchat = new EventEmitter();

  
  user:User;
  subscription1: Subscription;
  constructor(private auth: AuthService) { 
    this.subscription1= this.auth.user$.subscribe(u=>this.user=u);
  }

  ngOnInit() {
  }
  signout(){
    this.auth.signout();
  }
  clicksdnav(){
    this.showsidenav=!this.showsidenav;
    this.clicksidenavbg.emit();
  }

  togglechat(){
    this.triggerchat.emit();
  }
  ngOnDestroy(){
    this.subscription1.unsubscribe();
  }
}
