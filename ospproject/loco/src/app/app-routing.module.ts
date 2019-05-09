import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitplateComponent } from './initplate/initplate.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './main/main.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { SearchNewsComponent } from './search-news/search-news.component';
import { PostnewsComponent } from './postnews/postnews.component';
import { RecentnewsComponent } from './recentnews/recentnews.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { MypostsComponent } from './myposts/myposts.component';
import { EditpostComponent } from './editpost/editpost.component';

const routes: Routes =  [   {path: '', component: InitplateComponent},
                            {path: 'login', component: LoginComponent},
                            {path: 'u', component: HomepageComponent, canActivate:[AuthGuard], children: [
                              {path: '', component: MainComponent, canActivate: [AuthGuard],runGuardsAndResolvers: 'always',},
                              // {path: 'chat', component: ChatroomComponent, canActivate: [AuthGuard]},
                              {path: 'search', component: SearchNewsComponent, canActivate: [AuthGuard]},
                              {path: 'postnews', component: PostnewsComponent, canActivate: [AuthGuard]},
                              
                              {path: 'mynews', component: MypostsComponent, canActivate: [AuthGuard]},
                              {path: 'profile', component: UserprofileComponent, canActivate: [AuthGuard]},
                              {path: 'editpost/:uid/:id', component: PostnewsComponent, canActivate: [AuthGuard]},
                            ]}  
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
