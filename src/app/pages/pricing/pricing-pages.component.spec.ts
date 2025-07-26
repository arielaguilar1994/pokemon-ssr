import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPagesComponent } from './pricing-pages.component';

describe('PricingPagesComponent', () => {
  let component: PricingPagesComponent;
  let fixture: ComponentFixture<PricingPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
