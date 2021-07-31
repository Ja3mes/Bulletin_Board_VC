import {Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../posts.model';
import { PostsService } from '../Posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  accesslogger = 'User has viewed posts on the bulletin board.'
  private fs = require('fs');
  posts: Post [] = [];
  constructor( public postsService: PostsService){}
  private postsSubscription: Subscription = new Subscription;
  ngOnInit() {
   this.postsService.getPosts();
   this.postsSubscription = this.postsService.getPostUpdateListener()
  .subscribe((posts: Post[]) =>
   {
   this.posts = posts;
   });
 //_________Code Attribution_______________________
  //The following code was taken from Stack Overflow
  //Author: Erik Lopez
  //Link: https://stackoverflow.com/questions/33643107/read-and-write-a-text-file-in-typescript
  this.fs.writeFile('ActivityLogs.txt', this.accesslogger,  function(err: any) {
    if (err) {
        return console.error(err);
    }
    console.log("Log entered.");
  });
  //_______End of Code Attribution___________________
  }
  onDelete(postID: string )
  {
   this.postsService.deletePost(postID);
  }
  ngOnDestroy()
  {
   this.postsSubscription.unsubscribe();
  }
  }
