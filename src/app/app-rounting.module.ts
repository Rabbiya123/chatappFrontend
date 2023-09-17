import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserlistComponent } from './userlist/userlist.component';
import { ChatComponent } from './chat/chat.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userlist',
    component: UserlistComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'user-list-chat',
    component: UserListComponent,
  },
  {
    path: 'chat-interface',
    component: ChatInterfaceComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
