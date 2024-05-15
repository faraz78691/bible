import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAreaComponent } from './member-area.component';

describe('MemberAreaComponent', () => {
  let component: MemberAreaComponent;
  let fixture: ComponentFixture<MemberAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MemberAreaComponent]
    });
    fixture = TestBed.createComponent(MemberAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
