import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutMedicineComponent } from './checkout-medicine.component';

describe('CheckoutMedicineComponent', () => {
  let component: CheckoutMedicineComponent;
  let fixture: ComponentFixture<CheckoutMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutMedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
