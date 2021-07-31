import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './Auth/login/login.component';
import SignupComponent from './Auth/signup/signup.component';
const routes: Routes = [
 {path:'', component:PostListComponent},
 {path:'create', component:PostCreateComponent},
 {path:'edit/:postId', component:PostListComponent},
 {path:'login', component: LoginComponent},
 {path:'signup', component: SignupComponent}
];
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule {}
