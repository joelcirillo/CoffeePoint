import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarComponent } from './lugar.component';

describe('LugarComponent', () => {
  let component: LugarComponent;
  let fixture: ComponentFixture<LugarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LugarComponent]
    });
    fixture = TestBed.createComponent(LugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
