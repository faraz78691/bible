import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastDiaryComponent } from './past-diary.component';

describe('PastDiaryComponent', () => {
  let component: PastDiaryComponent;
  let fixture: ComponentFixture<PastDiaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PastDiaryComponent]
    });
    fixture = TestBed.createComponent(PastDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
