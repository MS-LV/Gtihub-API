import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GithubAboutComponent} from "./github-about.component";

const routes:Routes = [
  {
    path:'',
    component:GithubAboutComponent
  }
]

@NgModule({
  declarations: [
    GithubAboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GithubAboutModule { }
