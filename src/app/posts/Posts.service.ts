import {Post} from './posts.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class PostsService
{
private posts: Post [] = [] ;
private updatedPosts = new Subject<Post[]>();
constructor(private http: HttpClient){}
getPosts()
{
 this.http.get<{message: string, posts:
any}>('https://localhost:3000/api/posts').pipe(map((postData)=>
 {
 return postData.posts.map((post: { userName: any; Email: any; PlacedOrder: any; _id: any; })=>{
 return {
 userName: post.userName,
 Email: post.Email,
 ListedPost: post.PlacedOrder,
 id: post._id
 };
 });
 }))
 .subscribe((changedPosts)=>
 {
 this.posts = changedPosts;
 this.updatedPosts.next([...this.posts]);
 });
}
getPostUpdateListener()
{
 return this.updatedPosts.asObservable();
}
addPost(userName: string , Email: string , ListedPost: string )
{ const post: Post = {id : '', userName : userName , Email: Email,
ListedPost: ListedPost};
 this.http.post<{message: string, postId: string}
>('https://localhost:3000/api/posts',post)
 .subscribe((responsePostData)=>{
 console.log(responsePostData.message);
 const id = responsePostData.postId;
 post.id= id;
 this.posts.push(post);
 this.updatedPosts.next([...this.posts]);
 });
}
deletePost(postID: string)
{
 this.http.delete('https://localhost:3000/api/posts/' + postID)
 .subscribe(()=>
 {
 const updatedPostsDel = this.posts.filter(post =>post.id!== postID);
 this.posts= updatedPostsDel;
 this.updatedPosts.next([...this.posts]);
 console.log('Post Deleted');
 });
}
savefile()
{
}
}
