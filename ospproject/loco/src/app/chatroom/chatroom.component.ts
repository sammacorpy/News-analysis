import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, OnDestroy {

  @Output('triggerchat') triggerchat = new EventEmitter();
  @Input('load') load: boolean;
  user: User;
  subs: Subscription;
  chats: any[];
  msgcompose;
  constructor(private auth: AuthService, private cs: ChatService) {
    this.subs = this.auth.user$.subscribe(u => this.user = u);

      console.log("load")
      this.cs.loadmessage().subscribe(chs => {
        chs.reverse();
        this.chats = chs;
        console.log("load",chs);

      })
  }

  ngOnInit() {
  }

  togglechat() {
    this.triggerchat.emit();
  }
  sendmsg() {
    this.cs.sendmessage(this.msgcompose, this.user.uid, this.user.photoURL).then(z => this.msgcompose = "");
  }

  ngOnDestroy() {
    this.subs.unsubscribe();

  }

}
