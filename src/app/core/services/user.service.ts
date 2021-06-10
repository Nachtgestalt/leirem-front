import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {
  }

  getUser(username: string) {
    return this.http.post(`${environment.apiUrl}/users/logincheck`, {username}, {headers: {'Content-Type': 'application/json'}});
  }
}
