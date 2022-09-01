import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GithubSearchComponent} from "./github-search.component";
import {AppRoutingModule} from "../../app-routing.module";

const routes:Routes = [
  {
    path:'',
    component:GithubSearchComponent
  }
]

@NgModule({
  declarations: [
    GithubSearchComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class GithubSearchModule { }
