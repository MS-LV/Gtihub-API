import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, Subject, takeUntil, zip} from "rxjs";
import {ajax} from "rxjs/ajax";
import {HttpClient} from "@angular/common/http";
import {TypeUserContributes} from "./interface";

@Injectable()
export class GithubService {
  example = 'service number';
  sourceUrl = 'https://api.github.com/users/';
  sourceContribution = 'https://api.github.com/repos/'
  destroy$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getContributions(user: string, repos: string): Observable<any> {
    return ajax.getJSON(this.sourceContribution + user + '/' + repos + '/contributors?per_page=100')
      .pipe(
        map((value: any) => {
          let contributes: TypeUserContributes[] = [];
          Array.from(value).forEach((item: any) => {
            const {login, avatar_url, contributions} = item
            contributes.push({
              login,
              avatar_url,
              contributions
            })
          })
          return contributes;
        }),
        takeUntil(this.destroy$),
        catchError(err => {
          return of([])
        })
      )
  }

  getRepoInfo(user: string, repos: string): Observable<any> {
    return ajax.getJSON(this.sourceContribution + user + '/' + repos)
      .pipe(
        map((value: any) => {
          const {watchers, forks, description, name} = value
          const {html_url, login, avatar_url} = value.owner;
          return {watchers, forks, html_url, login, name, description, avatar_url}
        }),
        takeUntil(this.destroy$),
        catchError(() => {
          return of(
            {
              watchers: 0,
              forks: 0,
              html_url: '',
              login: '',
              name: '',
              description: '',
              avatar_url: 'https://img.lovepik.com/free-png/20210918/lovepik-404-page-error-png-image_400217866_wh1200.png'
            })
        })
      )
  }

  combined(value: string): Observable<any> {
    const profile$ = ajax.getJSON(this.sourceUrl + value)
      .pipe(
        map((value: any) => {
          const {avatar_url, followers, following, login, public_repos, public_gists, html_url, repos_url, name} = value
          return {avatar_url, followers, following, login, public_repos, public_gists, html_url, repos_url, name}
        }),
        catchError(() => {
          return of({
              avatar_url: 'https://img.lovepik.com/free-png/20210918/lovepik-404-page-error-png-image_400217866_wh1200.png',
              followers: 0,
              following: 0,
              login: 'Error 404',
              public_repos: 0,
              public_gists: 0,
              name: '',
              url: '',
              repos_url: ''
            }
          )
        }),
        takeUntil(this.destroy$)
      )
    const repos$ = ajax.getJSON(this.sourceUrl + value + '/repos')
      .pipe(
        map((value: any) => {
          let infoUsers: object[] = [];
          // console.log(value)
          Array.from(value).forEach((item: any) => {
            const {watchers, forks, name, html_url, full_name, language, description} = item;
            infoUsers.push({watchers, forks, name, html_url, full_name, language, description});
          })
          return infoUsers;
        }),
        catchError(() => {
          return of([
            {
              watchers: '',
              forks: '',
              name: '',
              html_url: '',
              language: '',
              description: ''
            }
          ])
        }),
        takeUntil(this.destroy$)
      )
    const gists$ = ajax.getJSON(this.sourceUrl + value + '/gists')
      .pipe(
        map((value: any) => {
          let infoGists: object[] = [];
          // console.log(value)
          Array.from(value).forEach((item: any) => {
            console.log(item)
            const {description, files, html_url} = item;
            let filename, language;
            for (const fileKey in files) {
              filename = files[fileKey].filename;
              language = files[fileKey].language;
            }
            infoGists.push({description, filename, language, html_url});
          });
          return infoGists;
        }),
        catchError(() => {
          return of([
            {
              description: '',
              filename: '',
              language: ''
            }
          ])
        }),
        takeUntil(this.destroy$)
      );
    return zip(profile$, repos$, gists$).pipe(takeUntil(this.destroy$))
  }


  clear(): void {
    this.destroy$.next(true);
  }
}
