import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services';
import { environment } from 'src/environments/environment';

import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private cookieService: CookieService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        const userStr = localStorage.getItem('user')  as string;
        const user = JSON.parse(userStr);
        const isLoggedIn = user && user?.authdata;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${user.authdata}`,
                    'Content-Type': 'application/json',
                    "Cookie": `${ this.cookieService.get('JSESSIONID')};${this.cookieService.get('XSRF-TOKEN')}`
                },
                withCredentials: true
            });
        }

        return next.handle(request);
    }
}