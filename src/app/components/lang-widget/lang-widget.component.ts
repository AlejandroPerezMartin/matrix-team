import { Component } from '@angular/core';
import {TranslateService, LangChangeEvent} from 'ng2-translate';

@Component({
  selector: 'lang-widget',
  templateUrl: './lang-widget.component.html',
  styleUrls: ['./lang-widget.component.sass']
})
export class LangWidgetComponent {
  private lang;
  public current: string;

  constructor(lang: TranslateService) {
    lang.addLangs(['en', 'es']);
    lang.setDefaultLang('en');
    lang.onLangChange.subscribe((event: LangChangeEvent) => {
      this.current = lang.currentLang;
    });
    this.lang = lang;
    this.shitchToBrowserDefault();
  }

  switch(value: string) {
    if (value !== undefined) {
      this.lang.use(value.match(/es|en/) ? value : this.lang.getDefaultLang());
    } else {
      this.shitchToBrowserDefault();
    }
  };

  shitchToBrowserDefault() {
    let browserLang: string = this.lang.getBrowserLang();
    this.lang.use(browserLang.match(/es|en/) ? browserLang : this.lang.getDefaultLang());
  }

}
