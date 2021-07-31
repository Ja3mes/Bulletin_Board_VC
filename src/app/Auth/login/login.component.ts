import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../Auth.service';
import { writeFile, writeFileSync } from 'fs';
import { utf8Encode } from '@angular/compiler/src/util';

@Component({
 templateUrl: './login.component.html'
})
export class LoginComponent
{

 enteredUserNameError = 'Please enter a user name in the correct form';
 enteredEmailError = 'Please enter a correctly formatted e-mail addresss ';
 enteredPasswordError = 'Please enter a password that contains lower case,' +
 'upper case letters and at least one number';
 successtext = 'Logged On Successfully.'
 failuretext = 'Failure to Logon.'
 private fs = require('fs');
 constructor (public authService:AuthService){}
 onLogin(form: NgForm)
 {
 if (form.invalid)
 {
  //_________Code Attribution_______________________
  //The following code was taken from Stack Overflow
  //Author: Erik Lopez
  //Link: https://stackoverflow.com/questions/33643107/read-and-write-a-text-file-in-typescript
  this.fs.writeFile('ActivityLogs.txt', this.failuretext,  function(err: any) {
    if (err) {
        return console.error(err);
    }
    console.log("Log entered.");
  });
  //_______End of Code Attribution___________________
 return;
 }
 this.authService.login(form.value.enteredEmail,
form.value.enteredPassword, form.value.enteredUsername)
 console.log(form.value)
 this.fs.writeFile('ActivityLogs.txt', this.successtext,  function(err: any) {
  if (err) {
      return console.error(err);
  }
  console.log("Log entered.");
});
}
 }


