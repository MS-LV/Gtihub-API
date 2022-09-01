import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubContributesComponent } from './github-contributes.component';

describe('GithubContributesComponent', () => {
  let component: GithubContributesComponent;
  let fixture: ComponentFixture<GithubContributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubContributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubContributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
