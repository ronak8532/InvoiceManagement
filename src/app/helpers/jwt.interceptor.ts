import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private totalRequests = 0;

    constructor(private authenticationService: AuthenticationService,
                private loadingService: LoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.totalRequests++;
        this.loadingService.setLoading(true);
        // add authorization header with jwt token if available
        let currentUser: any = this.authenticationService.currentUserValue();
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser}`
                }
            });
        }

        return next.handle(request).pipe(
          finalize(() => {
            this.totalRequests--;
            if (this.totalRequests === 0) {
              this.loadingService.setLoading(false);
            }
          })
        );
    }
}
