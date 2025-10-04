import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { catchError, Observable, tap, throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerService {
  
    constructor(
      private translate: TranslateService,
      private message: NzMessageService
    ) {}
  
    handleApiCall<T>(
      observable: Observable<T>,
      successMessageKey?: string
    ): Observable<T> {
      return observable.pipe(
        tap(() => {
          if (successMessageKey) {
            this.message.success(this.translate.instant(successMessageKey));
          }
        }),
        catchError((error: any) => {
          this.handleError(error);
          return throwError(() => error);
        })
      );
    }
  
    private handleError(error: any): void {
      if (error.status === 400 && error.error?.messageKey) {
        const paramName = error.error.param;
        const translatedParamName = this.translate.instant('PARAMS.' + paramName);
        
        const translatedMsg = this.translate.instant(
          error.error.messageKey,
          { paramName: translatedParamName }
        );
        
        this.message.error(translatedMsg);
      } else if (error.status === 400) {
        this.message.error(error.error?.message || error.error);
      } else {
        this.message.error(this.translate.instant('MESSAGES.UNEXPECTED_ERROR'));
      }
    }
  }