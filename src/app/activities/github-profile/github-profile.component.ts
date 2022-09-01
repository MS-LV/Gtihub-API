import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {filter} from "rxjs";
import {TypeContrProfile, TypeUserContributes, TypeUserGist, TypeUserProfile, TypeUserRepos} from "./interface";
import {GithubService} from "./github.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.scss'],
  providers: [GithubService]
})
export class GithubProfileComponent implements OnInit {
  menuPage = true;
  searchPage = true;
  isShowRepos = true;
  sourceUrl = 'https://api.github.com/repos/';
  routerUrl!:string;
  isContributes = true;
  userProfileInfo!: TypeUserProfile;
  userReposInfo!: TypeUserRepos[];
  userGistInfo!: TypeUserGist[];
  userContributes!: TypeUserContributes[];
  userContrProfile!: TypeContrProfile;
  @ViewChild('inputSearch', {static: true}) inputSearch!: ElementRef

  // ->

  constructor(private service: GithubService, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((next:Params)=>{
      this.routerUrl = Object.values(next)[0];
      console.log(this.routerUrl)
      this.findUser(Object.values(next)[0])
    })
  }


  findUser(value: string | undefined) {
    const val: string = '' + value
    if (!value || val.length === 0) return;
    this.service.combined(value)
      .pipe(
        filter(value => value !== '')
      )
      .subscribe((next) => {
        this.userProfileInfo = next[0];
        this.userReposInfo = next[1];
        this.userGistInfo = next[2];
        this.toggleFrontPage(false);
      })
    //______________________________________________________________________
  }

  toggleFrontPage(val: boolean): void {
    this.searchPage = val;
  }

  openAnotherParams(value: boolean) {
    this.isShowRepos = value;
  }

  // contributors(name: string | undefined, watchers: number | undefined, forks: number | undefined) {
  //   // const getContributions = ajax.getJSON<object[]>(this.sourceUrl + name + '/contributors?per_page=100')
  //   // getContributions
  //   //   .pipe(
  //   //     map((value: any[]) => {
  //   //         let contributes: TypeUserContributes[] = [];
  //   //         Array.from(value).forEach((item) => {
  //   //           const {login, avatar_url, contributions} = item
  //   //           contributes.push({
  //   //             login,
  //   //             avatar_url,
  //   //             contributions
  //   //           })
  //   //         })
  //   //         return contributes;
  //   //       },
  //   //       catchError(err => {
  //   //         return of([])
  //   //       })
  //   //     )
  //   //   )
  //   //   .subscribe((next: TypeUserContributes[]) => {
  //   //     this.userContributes = next;
  //   //     this.isContributes = false
  //   //   })
  // }
}
