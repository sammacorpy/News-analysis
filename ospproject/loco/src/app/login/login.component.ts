import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TakesnapshotService } from '../takesnapshot.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logindet={
    uname:"",
    password:""
  }
  mode:number=1;
  constructor(private __:TakesnapshotService, private auth:AuthService, private route: Router) {
    __.takesnap();
    if(this.auth.user$){
      this.route.navigate(['/u']);
    }
   }

  signinwithgoogle(){
    this.auth.googlesign();
    
  }
  anonymous(){
    this.auth.anonymous();
  }


  signupemail(){
    this.auth.signupwithemailpassword(this.logindet.uname,this.logindet.password);
  }

  signinemail(){
    this.auth.signinwithemailpassword(this.logindet.uname,this.logindet.password);
  }

  changemode(mode:number){
    this.mode=mode;
  }

  ngOnInit() {
  }
  

}
