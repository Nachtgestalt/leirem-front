import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const body = {
      username,
      password
    };
    console.log(body);
    return this.http.post<any>(`${environment.apiUrl}/login`, body, {observe: 'response'})
      .pipe(
        map((resp: HttpResponse<any>) => resp.headers.get('authorization'))
      );
  }

  logout(user: any) {
    const {id, refreshToken} = user;
    localStorage.removeItem('currentUser');
    return this.http.post(`${environment.apiUrl}/auth/logout`, {id, refreshToken});
  }
}
