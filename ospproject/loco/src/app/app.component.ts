import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loco';
  constructor() {
    
    localStorage.removeItem('firebase:previous_websocket_failure');
  }
}
