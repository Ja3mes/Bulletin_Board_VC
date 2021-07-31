import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
@Injectable({providedIn: 'root'})
export class AuthService
{
 private token! : string;
 constructor(private http: HttpClient){}
 createUser (email:string, password: string , username: string)
 {
 const authData: AuthData = {email:email, password:password,
username:username};
 this.http.post('https://localhost:3000/api/user/signup', authData)
 .subscribe(response =>{
 console.log(response);
 });
 }
 login(email: string, password:string, username: string)
 {
 const authData: AuthData = {email:email,
password:password,username:username };
 this.http.post<{token: string
}>('https://localhost:3000/api/user/login',authData)
 .subscribe(response => {
 const token = response.token;
 this.token = token;
 console.log(response);
 });
 }
 getToken()
 {
 return this.token; }
}

