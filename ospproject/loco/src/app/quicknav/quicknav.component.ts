import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'quicknav',
  templateUrl: './quicknav.component.html',
  styleUrls: ['./quicknav.component.scss']
})
export class QuicknavComponent implements OnInit {

  show=false;
  @Output('triggerchat') triggerchat =new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  togglechat(){
    this.triggerchat.emit();
  }


}
