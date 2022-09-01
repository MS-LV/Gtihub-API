import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GithubSearchComponent} from "./activities/github-search/github-search.component";

const routes: Routes = [
  {
    path: 'github',
    component: GithubSearchComponent
  },
  {
    path: 'about',
    loadChildren: () => import('./activities/github-about/github-about.module').then(m => m.GithubAboutModule)
  },
  {
    path: 'github/:user',
    loadChildren: () => import('./activities/github-profile/github-profile.module').then(m => m.GithubProfileModule)
  },
  {
    path:'github/:user/:repos',
    loadChildren:() => import('./activities/github-contributes/github-contributes.module').then(m =>m.GithubContributesModule)
  },
  {
    path:'**',
    component:GithubSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
