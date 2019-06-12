import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, AfterViewChecked } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Output('triggerchat') triggerchat = new EventEmitter();
  @Input('load') load: boolean;
  user: User;
  subs: Subscription;
  chats: any[];
  msgcompose: String;
  to_id;
  constructor(private auth: AuthService, private cs: ChatService) {
    this.subs = this.auth.user$.subscribe(u => this.user = u);

    this.cs.loadmessage().subscribe(chs => {
      if (chs.length > 0) {
      this.to_id = chs[0].id;
      chs.reverse();
      }
      this.chats = chs;


    })
  }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    if (document.getElementById(this.to_id))
      this.scrollto(this.to_id);
  }

  togglechat() {
    this.triggerchat.emit();
  }
  sendmsg() {
    console.log("sending msg")
    document.getElementsByClassName("chattext")[0].innerHTML="";
    this.msgcompose=this.msgcompose.trim();
    if (this.msgcompose=="" )
    return;
    this.cs.sendmessage(this.msgcompose, this.user.uid, this.user.photoURL).then(z => {
      this.msgcompose = "";
      
    });
  }
  setmsg(element) {
    this.msgcompose = element.innerText;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();

  }
  scrollto(id) {
    console.log("I am from scroll", id);
    let el = document.getElementById(id);
    el.scrollIntoView();
  }

}
