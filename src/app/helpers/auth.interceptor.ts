// auth.interceptor.ts

// Helper Class for Inspecting and Transforming HTTP requests

import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService} from '../services/token-storage.service';
import {Observable} from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

// @ts-ignore
// @ts-ignore
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = req;
        const token = this.token.getToken();
        if (token != null) {
            authRequest = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
        }
        return next.handle(authRequest);
    }


}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];

