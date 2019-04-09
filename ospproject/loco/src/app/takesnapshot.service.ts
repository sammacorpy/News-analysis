import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TakesnapshotService {

  constructor(private route: Router){
  }
  takesnap(){
    localStorage.setItem('lastvisited',this.route.url);
  }
  
}
