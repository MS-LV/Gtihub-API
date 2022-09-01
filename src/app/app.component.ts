import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  TypeContrProfile,
  TypeUserContributes,
  TypeUserGist,
  TypeUserProfile,
  TypeUserRepos
} from "./activities/github-profile/interface";
import {GithubService} from "./activities/github-profile/github.service";
import {catchError, filter, map, of} from "rxjs";
import {ajax} from "rxjs/ajax";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[GithubService]
})
export class AppComponent {
  menuPage = true;
  searchPage = true;
  isShowRepos = true;
  isMenuOpen = false;
  sourceUrl = 'https://api.github.com/repos/';
  isContributes = true;
  userProfileInfo!: TypeUserProfile;
  userReposInfo!: TypeUserRepos[];
  userGistInfo!: TypeUserGist[];
  userContributes!:TypeUserContributes[];
  userContrProfile!: TypeContrProfile;
  @ViewChild('inputSearch', {static: true}) inputSearch!: ElementRef

  // ->
  title = '';

  constructor(private service: GithubService) {
  }

  ngOnInit(): void {
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
        this.inputSearch.nativeElement.value = '';
      })
    //______________________________________________________________________
  }

  toggleFrontPage(val: boolean): void {
    this.searchPage = val;
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  menuOption() {
    this.menuPage = !this.menuPage;
    this.isMenuOpen = false;
  }
  openAnotherParams(value: boolean) {
    this.isShowRepos = value;
  }
  contributors(name: string | undefined, watchers: number | undefined, forks: number | undefined) {
    // this.userContrProfile = {watchers, forks};
    const getContributions = ajax.getJSON<object[]>(this.sourceUrl + name + '/contributors?per_page=100')
    getContributions
      .pipe(
        map((value: any[]) => {
            let contributes: TypeUserContributes[] = [];
            Array.from(value).forEach((item) => {
              const {login, avatar_url, contributions, html_url} = item
              contributes.push({
                login,
                avatar_url,
                contributions
              })
            })
            return contributes;
          },
          catchError(err => {
            return of({})
          })
        )
      )
      .subscribe((next: TypeUserContributes[]) => {
        this.userContributes = next;
      })
  }
}