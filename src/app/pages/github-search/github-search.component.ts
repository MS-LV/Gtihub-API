import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {fromEvent, map} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.scss']
})
export class GithubSearchComponent implements OnInit, AfterViewInit {
  userName = '';
  @ViewChild('inputElement', {static: false}) inputSearch!: ElementRef

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // console.log(this.inputSearch?.nativeElement);
    const inputSearch = this.inputSearch?.nativeElement
    fromEvent<InputEvent>(inputSearch, 'input')
      .pipe(
        map((val) => {
          return val.target;
        })
      )
      .subscribe((next: any) => {
        this.userName = next.value;
      })
  }

  goToProfile() {
    if (this.userName == '') return;
    this.router.navigate(['/github', this.userName]).then()
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.goToProfile();
    }
  }
}
