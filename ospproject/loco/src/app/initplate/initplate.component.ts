import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initplate',
  templateUrl: './initplate.component.html',
  styleUrls: ['./initplate.component.scss']
})
export class InitplateComponent implements OnInit {

  constructor(private route: Router) { 
    if(localStorage.getItem('newuserondevice')!=null){
      const lastvisited= localStorage.getItem('lastvisited');
      route.navigateByUrl(lastvisited);
    }
    else{
      localStorage.setItem('newuserondevice','1');

    }
  }

  ngOnInit() {
  }

}
