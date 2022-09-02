import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GithubContributesComponent} from "./github-contributes.component";

const routes:Routes = [
  {
    path:'',
    component:GithubContributesComponent
  }
]

@NgModule({
  declarations: [
    GithubContributesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GithubContributesModule { }
