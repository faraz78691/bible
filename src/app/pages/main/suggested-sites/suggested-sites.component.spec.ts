import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedSitesComponent } from './suggested-sites.component';

describe('SuggestedSitesComponent', () => {
  let component: SuggestedSitesComponent;
  let fixture: ComponentFixture<SuggestedSitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuggestedSitesComponent]
    });
    fixture = TestBed.createComponent(SuggestedSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
