import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendVersesComponent } from './send-verses.component';

describe('SendVersesComponent', () => {
  let component: SendVersesComponent;
  let fixture: ComponentFixture<SendVersesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SendVersesComponent]
    });
    fixture = TestBed.createComponent(SendVersesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
