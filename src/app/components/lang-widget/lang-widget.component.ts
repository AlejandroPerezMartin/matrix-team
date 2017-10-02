import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lang-widget',
  templateUrl: './lang-widget.component.html',
  styleUrls: ['./lang-widget.component.scss']
})
export class LangWidgetComponent {

  public language;

  public currentLang: string;

  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = this.translate.currentLang;
    });

    this.language = this.translate;
    this.shitchToBrowserDefault();
  }

  switch(value: string) {
    if (value !== undefined) {
      this.language.use(value.match(/es|en/) ? value : this.language.getDefaultLang());
    } else {
      this.shitchToBrowserDefault();
    }
  }

  shitchToBrowserDefault() {
    const browserLang: string = this.language.getBrowserLang();
    this.language.use(browserLang.match(/es|en/) ? browserLang : this.language.getDefaultLang());
  }

}
