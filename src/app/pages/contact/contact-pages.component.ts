import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-pages',
  imports: [],
  templateUrl: './contact-pages.component.html',
  styleUrl: './contact-pages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ContactPagesComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({ name: 'description', content: 'Contact Page ssr' });
    this.meta.updateTag({ name: 'og:title', content: 'Contact Page ssr' });
    this.meta.updateTag({ name: 'keyboards', content: 'contact,ssr,angular,curso,angularpro' });
  }

}
