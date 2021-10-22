import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private http: HttpClient) {
  }

  getCurrentSeason() {
    return this.http.get(`${environment.apiUrl}/temporada/actual`, {headers: {'Content-Type': 'application/json'}});
  }
}
