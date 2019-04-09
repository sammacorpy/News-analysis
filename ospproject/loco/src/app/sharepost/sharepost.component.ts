import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'sharepost',
  templateUrl: './sharepost.component.html',
  styleUrls: ['./sharepost.component.scss']
})
export class SharepostComponent implements OnInit {

  @Output('triggershareinside')triggershareinside=new EventEmitter();
  @Input('sharedata') sharedata;
  constructor() { }

  ngOnInit() {
  }

  trigsharecard(){
    this.triggershareinside.emit();
  }

}
