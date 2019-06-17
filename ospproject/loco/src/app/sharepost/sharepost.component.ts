import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'sharepost',
  templateUrl: './sharepost.component.html',
  styleUrls: ['./sharepost.component.scss']
})
export class SharepostComponent implements OnInit {

  @Output('triggershareinside') triggershareinside = new EventEmitter();
  @Input('sharedata') sharedata: any;
  constructor(private ps: ProfileService) {
    
    
  }

  ngOnInit() {
  }
  // ngAfterViewChecked(){
    
  //   const ele: HTMLCollection = document.getElementsByClassName('_2n-v');
  //   console.log(ele);
  //   ele.item(0).addEventListener("click",()=>{
  //     console.log("lol")
  //     this.activityshareupdate("facebook");
  //   })
  // }

  activityshareupdate(handle) {
    this.ps.recordhistory("share",this.sharedata.id,this.sharedata.userid);

    this.ps.updateusershareactivities(this.sharedata.userid, this.sharedata.id, handle);
  }


  trigsharecard() {
    this.triggershareinside.emit();
  }

}
