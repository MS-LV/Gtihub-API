import {Component} from '@angular/core';
import {GithubService} from "./pages/github-profile/github.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[GithubService]
})
export class AppComponent {
  isMenuOpen = false;
  title = '';

  constructor() {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
