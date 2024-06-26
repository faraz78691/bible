import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeComponent } from './customize.component';

describe('CustomizeComponent', () => {
  let component: CustomizeComponent;
  let fixture: ComponentFixture<CustomizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomizeComponent]
    });
    fixture = TestBed.createComponent(CustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
