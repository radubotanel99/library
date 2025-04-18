import { Component, OnInit } from '@angular/core';
import { IParameter } from './parameters.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { ParameterService } from '../service/parameter.service/parameter.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CustomButtonComponent } from '../ui.components/custom-button/custom-button.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-parameters',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NzIconModule, NzInputNumberModule, NzModalModule, NzButtonModule, CustomButtonComponent],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.css'
})
export class ParametersComponent implements OnInit {
  parameters: IParameter[];

  romanianFlagIcon = (environment.production) ? '/frontend/browser/assets/images/romania.png' : '/assets/images/romania.png'
  americanFlagIcon = (environment.production) ? '/frontend/browser/assets/images/america.png' : '/assets/images/america.png';

  constructor(private parameterService: ParameterService, private router: Router, private message: NzMessageService, private i18n: NzI18nService) {
    this.parameters = [];
  }

  ngOnInit() {
    this.parameterService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
    })
    this.i18n.setLocale(en_US); 
  }

  saveParameters(): void {
    this.handleParameterSave(this.parameterService.saveParameters(this.parameters));
    this.isVisible = false;
  }

  handleParameterSave(observable: Observable<IParameter[]>): void {
    observable.subscribe({
      next: () => {
        this.message.success('Values set successfully.');
      },
      error: (error: any) => {
        if (error.status === 400) {
          this.message.error(error.error.message);
        } else {
          this.message.error('An unexpected error occurred. Contact the administrator.');
        }
      }
    });
  }

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
  }

  setLanguage(param: IParameter, languageNumber: number) {
    param.value = languageNumber;
  }
}
