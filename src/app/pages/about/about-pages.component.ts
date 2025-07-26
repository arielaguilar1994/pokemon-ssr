import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-pages',
  imports: [],
  templateUrl: './about-pages.component.html',
  styleUrl: './about-pages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AboutPagesComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({ name: 'description', content: 'About page ssr' });
    this.meta.updateTag({ name: 'og:title', content: 'About page ssr' });
    this.meta.updateTag({ name: 'keyboards', content: 'about,ssr,angular,curso,angularpro' });
  }

}
