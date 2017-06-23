import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryResolverComponent } from './order-history-resolver.component';

describe('OrderHistoryResolverComponent', () => {
  let component: OrderHistoryResolverComponent;
  let fixture: ComponentFixture<OrderHistoryResolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHistoryResolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
