import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {filter} from "rxjs";
import {TypeUserContributes, TypeUserGist, TypeUserProfile, TypeUserRepos} from "./interface";
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
  searchPage = false;
  isShowRepos = true;
  isPageLoaded = false;
  sourceUrl = 'https://api.github.com/repos/';
  routerUrl!: string;
  isContributes = true;
  userProfileInfo!: TypeUserProfile;
  userReposInfo!: TypeUserRepos[];
  userGistInfo!: TypeUserGist[];
  userContributes!: TypeUserContributes[];
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  constructor(private service: GithubService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((next: Params) => {
      this.routerUrl = Object.values(next)[0];
      this.findUser(Object.values(next)[0])
    })
  }


  findUser(value: string | undefined) {
    const val: string = '' + value
    if (!value || val.length === 0) return;
    this.service.combined(value)
      .pipe(
        filter(value => value !== ''),
      )
      .subscribe((next) => {
        this.userProfileInfo = next[0];
        this.userReposInfo = next[1];
        this.userGistInfo = next[2];
        this.isPageLoaded = true;
      })
    //______________________________________________________________________
  }

  openAnotherParams(value: boolean) {
    this.isShowRepos = value;
  }
}
