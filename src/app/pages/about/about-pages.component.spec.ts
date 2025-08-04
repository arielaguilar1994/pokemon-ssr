import { ComponentFixture, TestBed } from '@angular/core/testing';
import AboutPagesComponent from './about-pages.component';

describe('AboutPagesComponent', () => {
  let component: AboutPagesComponent;
  let fixture: ComponentFixture<AboutPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
