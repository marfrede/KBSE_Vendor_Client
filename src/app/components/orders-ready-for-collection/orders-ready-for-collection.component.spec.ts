import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReadyForCollectionComponent } from './orders-ready-for-collection.component';

describe('OrdersReadyForCollectionComponent', () => {
  let component: OrdersReadyForCollectionComponent;
  let fixture: ComponentFixture<OrdersReadyForCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersReadyForCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersReadyForCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
