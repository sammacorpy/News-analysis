import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitplateComponent } from './initplate/initplate.component';
import { LoginComponent } from './login/login.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { HomepageComponent } from './homepage/homepage.component';
import { TakesnapshotService } from './takesnapshot.service';
import { TopnavComponent } from './topnav/topnav.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MainComponent } from './main/main.component';
import { QuicknavComponent } from './quicknav/quicknav.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

import {MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { SearchNewsComponent } from './search-news/search-news.component';
import { PostnewsComponent } from './postnews/postnews.component';
import { RecentnewsComponent } from './recentnews/recentnews.component';
import { NewsCardComponent } from './template/news-card/news-card.component';
import { SharepostComponent } from './sharepost/sharepost.component';
import { MypostsComponent } from './myposts/myposts.component';
import { EditpostComponent } from './editpost/editpost.component';
import { FirstnamePipe } from './firstname.pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DropzoneDirective } from './dropzone.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SpinnerComponent } from './spinner/spinner.component';
import { CrudService } from './crud.service';
import { NewsService } from './news.service';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { SummaryPipe } from './summary.pipe';
import { ViewnewsComponent } from './viewnews/viewnews.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [
    AppComponent,
    InitplateComponent,
    LoginComponent,
    HomepageComponent,
    TopnavComponent,
    SidenavComponent,
    MainComponent,
    QuicknavComponent,
    UserprofileComponent,
    ChatroomComponent,
    SearchNewsComponent,
    PostnewsComponent,
    RecentnewsComponent,
    NewsCardComponent,
    SharepostComponent,
    MypostsComponent,
    EditpostComponent,
    FirstnamePipe,
    DropzoneDirective,
    SpinnerComponent,
    SummaryPipe,
    ViewnewsComponent,
    // InfiniteScrollModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatCardModule,
    JwSocialButtonsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,  
    MatAutocompleteModule,
    MatProgressBarModule,
    AngularFireStorageModule,
    InfiniteScrollModule,
    MatBadgeModule,
  ],
  providers: [
    LoginService,
    AuthService,
    TakesnapshotService,
    CrudService,
    NewsService,
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
