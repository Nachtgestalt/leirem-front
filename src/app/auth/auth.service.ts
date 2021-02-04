import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {username, password});
  }

  logout(user: any) {
    const {id, refreshToken} = user;
    localStorage.removeItem('currentUser');
    return this.http.post(`${environment.apiUrl}/auth/logout`, {id, refreshToken});
  }
}
