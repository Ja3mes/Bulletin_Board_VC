import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import SignupComponent from './Auth/signup/signup.component';
import { LoginComponent } from './Auth/login/login.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './_home/home.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './Error/error.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { ErrorInterceptor } from './Error/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent},
      {path: 'home', component: HomeComponent},
    ]),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,
    multi:true},
     {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}
     ],
     bootstrap: [AppComponent],
     entryComponents: [ErrorComponent]
})
export class AppModule { }
