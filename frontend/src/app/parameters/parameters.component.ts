import { Component, OnInit } from '@angular/core';
import { IParameter } from './parameters.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { ParameterService } from '../service/parameter.service/parameter.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CustomButtonComponent } from '../ui.components/custom-button/custom-button.component';
import { environment } from '../../environments/environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzI18nService, en_US, ro_RO } from 'ng-zorro-antd/i18n';
import { ErrorHandlerService } from '../service/error-handler-service';

@Component({
  selector: 'app-parameters',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NzIconModule, NzInputNumberModule, NzModalModule, NzButtonModule, CustomButtonComponent, TranslateModule],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.css'
})
export class ParametersComponent implements OnInit {
  parameters: IParameter[];

  romanianFlagIcon = (environment.production) ? '/frontend/browser/assets/images/romania.png' : '/assets/images/romania.png'
  americanFlagIcon = (environment.production) ? '/frontend/browser/assets/images/america.png' : '/assets/images/america.png';

  selectedLanguage: string = this.translate.currentLang;

  constructor(private parameterService: ParameterService, 
      private router: Router, 
      private message: NzMessageService, 
      private i18n: NzI18nService,
      public translate: TranslateService,
      private errorHandler: ErrorHandlerService
    ) {
    this.parameters = [];
  }

  ngOnInit() {
    this.parameterService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
    })
  }

  saveParameters(): void {
    // save language in local storage in browser
    this.translate.use(this.selectedLanguage);
    localStorage.setItem('selectedLanguage', this.selectedLanguage);

    if (this.selectedLanguage === 'ro') {
      this.i18n.setLocale(ro_RO);
    } else {
      this.i18n.setLocale(en_US);
    }

    this.errorHandler
      .handleApiCall(
        this.parameterService.saveParameters(this.parameters),
        'MESSAGES.PARAMS_SUCCESS'
      )
      .subscribe();
    this.isVisible = false;
  }

  // This method is no longer needed as we use ErrorHandlerService directly

  validateNumberInput(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    const key = event.key;

    if (!allowedKeys.includes(key) && isNaN(Number(key))) {
      event.preventDefault();
    }
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }
  
  handleCancel(): void {
    this.isVisible = false;
    this.parameterService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
    })
    this.selectedLanguage = this.translate.currentLang;
  }

  setLangValue(langValue: string) {
    this.selectedLanguage = langValue;
  }

  getTranslatedParamName(paramName: string): string {
    return this.translate.instant('PARAMS.' + paramName);
  }
}
