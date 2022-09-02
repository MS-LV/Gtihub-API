import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {catchError, filter, map, of} from "rxjs";
import {GithubService} from "../github-profile/github.service";
import {
  TypeContrProfile,
  TypeUserContributes,
  TypeUserGist,
  TypeUserProfile,
  TypeUserRepos
} from "../github-profile/interface";
import {ajax} from "rxjs/ajax";

@Component({
  selector: 'app-github-contributes',
  templateUrl: './github-contributes.component.html',
  styleUrls: ['./github-contributes.component.scss'],
  providers: [GithubService]
})
export class GithubContributesComponent implements OnInit {
  userProfileInfo!: TypeUserProfile;
  userReposInfo!: TypeUserRepos[];
  userGistInfo!: TypeUserGist[];
  userContributes!: TypeUserContributes[];
  userContrProfile!: TypeContrProfile;
  routeVal!:string[];
  sourceUrl = 'https://api.github.com/repos/';
  isPageLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private service: GithubService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((next: Params) => {
      const val = Object.values(next);
      this.routeVal = val;
      this.service.getContributions(val[0], val[1])
        .subscribe((next: TypeUserContributes[]) => {
          this.userContributes = next;
        });
      this.service.getRepoInfo(val[0], val[1])
        .subscribe((next) => {
          this.userContrProfile = next;
          this.isPageLoaded = true;
        })
    })
  }
}
