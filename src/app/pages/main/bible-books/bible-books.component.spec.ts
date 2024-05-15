import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleBooksComponent } from './bible-books.component';

describe('BibleBooksComponent', () => {
  let component: BibleBooksComponent;
  let fixture: ComponentFixture<BibleBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BibleBooksComponent]
    });
    fixture = TestBed.createComponent(BibleBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
