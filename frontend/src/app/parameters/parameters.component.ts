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

@Component({
  selector: 'app-parameters',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NzIconModule, NzInputNumberModule],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.css'
})
export class ParametersComponent implements OnInit {
  parameters: IParameter[];

  constructor(private parameterService: ParameterService, private router: Router, private message: NzMessageService) {
    this.parameters = [];
  }

  ngOnInit() {
    this.parameterService.getParameters().subscribe(parameters => {
      this.parameters = parameters;
    })
  }

  saveParameters(): void {
    this.handleParameterSave(this.parameterService.saveParameters(this.parameters));
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
}
