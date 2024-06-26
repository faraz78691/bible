import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleChapterComponent } from './bible-chapter.component';

describe('BibleChapterComponent', () => {
  let component: BibleChapterComponent;
  let fixture: ComponentFixture<BibleChapterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BibleChapterComponent]
    });
    fixture = TestBed.createComponent(BibleChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
