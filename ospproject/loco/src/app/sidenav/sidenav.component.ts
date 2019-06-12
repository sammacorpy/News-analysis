import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations:[
    trigger('slide',[
      state('void',style({
        opacity:0,
        transform:'translateX(-100%)'

      })),
      transition("void=>*",[animate("150ms ease-out",style({
        opacity:1,
        transform:'translateX(0%)'


      }))]),
      transition("*=>void",[animate("150ms ease-out",style({
        opacity:0,
        transform:'translateX(-100%)'


      }))])
    ])
  ]
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
