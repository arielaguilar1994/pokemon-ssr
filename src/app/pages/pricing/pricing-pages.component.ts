import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-pages',
  imports: [],
  templateUrl: './pricing-pages.component.html',
  styleUrl: './pricing-pages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPagesComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  // private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // console.log(document);
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Pricing Page ssr' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page ssr' });
    this.meta.updateTag({ name: 'keyboards', content: 'pricing,ssr,angular,curso,angularpro' });
  }

}
