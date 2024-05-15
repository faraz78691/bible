import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVersesComponent } from './my-verses.component';

describe('MyVersesComponent', () => {
  let component: MyVersesComponent;
  let fixture: ComponentFixture<MyVersesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyVersesComponent]
    });
    fixture = TestBed.createComponent(MyVersesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
