import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Component({
  selector: 'topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  user:User;
  @Input('activesidenavbutton') activesidenavbutton: boolean=true;
  @Output('clicksidenav') clicksidenav = new EventEmitter();
  constructor(private auth: AuthService) { 

  }

  async ngOnInit() {
    this.auth.user$.subscribe(u=>this.user=u);
    
  }

  onClickSideNavButton(){
    this.activesidenavbutton=!this.activesidenavbutton;
    this.clicksidenav.emit();
  }

}
