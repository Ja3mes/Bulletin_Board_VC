import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../Auth.service';


@Component({
  selector: 'app-user-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
  })

  export default class SignupComponent {
    enteredUsername = '';
    enteredPassword = '';
    enteredEmail= '';
    enteredUsernameErr = 'Please do not include special characters in your username.';
    enteredPasswordErr = 'Please enter a password with at least 8 characters long.'
    enteredEmailErr = 'Please enter a valid email address.'

    constructor( public AuthService: AuthService){
    }

    OnAddUser(SignUp: NgForm){
    if(SignUp.invalid){
      return;
    }
    this.AuthService.createUser(SignUp.value.enteredUsername, SignUp.value.enteredPassword, SignUp.value.enteredEmail);
    console.log(SignUp.value);
   }
  }

