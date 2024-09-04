import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CommonService } from '../services/common/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';


@Injectable()
export class APIInterceptorInterceptor implements HttpInterceptor {

    constructor(private commonService: CommonService, private _snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Show loader
        this.commonService.isShowSpinner = true;
        //  Add API key in every request
        if (request.body instanceof Object) {
            request = request.clone({
                body: { apikey: environment.apikey , ...request.body }
            })
        }
        return next.handle(request).pipe(
            finalize(() => {
                // Hide loader
                this.commonService.isShowSpinner = false;
            }),
            map((event: any) => {
                // Show message in every API call
                if (event && event.body && event.body.status_message) {
                    this._snackBar.open(event.body.status_message, '', {
                        duration: 2000
                    });
                }
                return event;
            })
        )
    }
}
