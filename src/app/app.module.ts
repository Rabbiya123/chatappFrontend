import { LoginComponent } from './login/login.component';
import { RouterModule, CanActivate } from '@angular/router';

import { ApplicationModule, Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-rounting.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { CanActivateFn } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { UserlistComponent } from './userlist/userlist.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserListComponent } from './user-list/user-list.component';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';
import { ChatComponent } from './chat/chat.component';
@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    FontAwesomeModule,
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    UserlistComponent,
    ChatComponent,
    UserListComponent,
    ChatInterfaceComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
