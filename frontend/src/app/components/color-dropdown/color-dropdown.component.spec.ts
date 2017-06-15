import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDropdownComponent } from './color-dropdown.component';

describe('ColorDropdownComponent', () => {
  let component: ColorDropdownComponent;
  let fixture: ComponentFixture<ColorDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
