import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GithubProfileComponent} from "./github-profile.component";

const routes:Routes = [
  {
    path:'',
    component:GithubProfileComponent
  }
]

@NgModule({
  declarations: [
    GithubProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GithubProfileModule { }
