import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NzI18nService, en_US, ro_RO } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersComponent, HeaderComponent, HttpClientModule, FormsModule, CommonModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private translate: TranslateService, private nzI18nService: NzI18nService) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');
    this.nzI18nService.setLocale(ro_RO);
    const savedLang = localStorage.getItem('selectedLanguage');
    
    if (savedLang) {
      this.setLanguage(savedLang);
    } else {
      const browserLang = translate.getBrowserLang();
      const lang = browserLang?.match(/en|ro/) ? browserLang : 'en';
      this.setLanguage(lang);
    }
  }

  private setLanguage(lang: string) {
    this.translate.use(lang);

    if (lang === 'ro') {
      this.nzI18nService.setLocale(ro_RO);
    } else {
      this.nzI18nService.setLocale(en_US);
    }
  }

  title = 'frontend'; 
  backgroundImage = (environment.production) ? 'url(/frontend/browser/assets/images/radu.jpg)' : 'url(/assets/images/radu.jpg)';

      /* for development: *//*  background-image: url(/assets/images/radu.jpg); */ 
    /* for production: */ //background-image: url(/frontend/browser/assets/images/radu.jpg); 
}
