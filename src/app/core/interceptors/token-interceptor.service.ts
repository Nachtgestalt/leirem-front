import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService {

    constructor() {
    }

    static setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
        const token = localStorage.getItem('token');
        const authorization = `${token}`;
        const headers = req.headers.set('Authorization', authorization);
        return req.clone({headers});
    }

    public intercept(req: HttpRequest<any>,
                     next: HttpHandler): Observable<HttpEvent<any>> {
        const authorizationReq = TokenInterceptorService.setAuthHeader(req);
        return next.handle(authorizationReq);
    }
}
