import { Component, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '@app/modules/footer/footer/footer.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public collapsedFaq1 = false;
  public collapsedFaq2 = false;
  public collapsedFaq3 = false;
  public collapsedFaq4 = false;
  public collapsedFaq5 = false;
  public collapsedFaq6 = false;
  public collapsedFaq7 = false;
  public collapsedFaq8 = false;
  public collapsedFaq9 = false;
  public collapsedFaq10 = false;
  public collapsedFaq11 = false;
  public collapsedFaq12 = false;
  public collapsedFaq13 = false;
  public collapsedFaq14 = false;
  @ViewChild(FooterComponent, { static: false }) footerComponentRef: FooterComponent;
  constructor() { }

  ngOnInit() {
  }

  scrollSubscribeNewsletter() {
    this.footerComponentRef.scrollToNewsLetter();
  }

}
