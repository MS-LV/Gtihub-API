import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubAboutComponent } from './github-about.component';

describe('GithubAboutComponent', () => {
  let component: GithubAboutComponent;
  let fixture: ComponentFixture<GithubAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
