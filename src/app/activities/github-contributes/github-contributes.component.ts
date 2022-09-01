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

  constructor(
    private route: ActivatedRoute,
    private service: GithubService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((next: Params) => {
      const val = Object.values(next);
      this.routeVal = val;
      console.log(this.routeVal)
      // this.routeVal = next;
      this.service.getContributions(val[0], val[1])
        .subscribe((next: TypeUserContributes[]) => {
          this.userContributes = next;
        });
      this.service.getRepoInfo(val[0], val[1])
        .subscribe((next) => {
          this.userContrProfile = next
        })
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
      })
  }

  contributors(name: string | undefined, watchers: number | undefined, forks: number | undefined) {
    // this.userContrProfile = {watchers, forks};
    const getContributions = ajax.getJSON<object[]>(this.sourceUrl + name + '/contributors?per_page=100')
    getContributions
      .pipe(
        map((value: any[]) => {
            let contributes: TypeUserContributes[] = [];
            Array.from(value).forEach((item) => {
              const {login, avatar_url, contributions} = item
              contributes.push({
                login,
                avatar_url,
                contributions
              })
            })
            return contributes;
          }
        ),
        catchError(err => {
          return of([])
        })
      )
      .subscribe((next: TypeUserContributes[]) => {
        this.userContributes = next;
      })
  }
}
