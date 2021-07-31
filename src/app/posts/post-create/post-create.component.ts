import { Component, Sanitizer, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../Posts.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredUserNameErr = 'Please enter a user name in the correct form';
  enteredEmailErr = 'Please enter a correctly formatted e-mail addresss ';
  enteredPostErr = '<b>Please enter a post of no more than 500 characters</b>';
  output!: string;
  accesslogger = 'User has accessed post editor on the bulletin board.'
  private fs = require('fs');

  constructor(public postsService: PostsService, public route: ActivatedRoute,
    protected sanitizer: DomSanitizer) { }

  onAddPost(postform: NgForm) {
    if (postform.invalid) {
      return;
    }
    /*this.postsService.addPost(postform.value.enteredUserName,
      postform.value.enteredEmail
      , postform.value.enteredpost);
    this.output = (this.sanitizer.sanitize(SecurityContext.HTML,
      postform.value.enteredpost));*/
    postform.resetForm();
    //_________Code Attribution_______________________
    //The following code was taken from Stack Overflow
    //Author: Erik Lopez
    //Link: https://stackoverflow.com/questions/33643107/read-and-write-a-text-file-in-typescript
    this.fs.writeFile('ActivityLogs.txt', this.accesslogger, function (err: any) {
      if (err) {
        return console.error(err);
      }
      console.log("Log entered.");
    });
    //_______End of Code Attribution___________________
  }
}
