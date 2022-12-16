import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor(public router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   

        if (request.url.indexOf('/auth/api/token') < 1) {

            const token = "Bearer" + " " + sessionStorage.getItem('access_token');
            if (sessionStorage.getItem('access_token') != null) {
                request = request.clone({
                    headers: request.headers
                        .set('Authorization', token),
                  
                });
            }
            else {
             
            }
        }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {

            if (event instanceof HttpResponse) {

                if (request.method == 'POST') {
                }

                if (event.headers.get('token') != null && event.headers.get('token') != undefined) {
                }

            }
        }, (err: any) => {

            if (err instanceof HttpErrorResponse) {

                if (err.status === 401) {
                   this.router.navigate(['/auth/login'])
                } else if (err.status == 0) {

                } else if (err.status == 404) {

                } else if (err.status == 500) {

                }
                else {

                }

            }
        }
        ));
    }

}
