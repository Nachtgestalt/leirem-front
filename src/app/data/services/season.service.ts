import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SeasonService {
    seasonURL = `${environment.apiUrl}/temporada`;

    constructor(private http: HttpClient) {
    }

    getCurrentSeason() {
        return this.http.get(`${environment.apiUrl}/temporada/actual`, {headers: {'Content-Type': 'application/json'}});
    }

    fetchSeasons() {
        return this.http.get(this.seasonURL, {headers: {'Content-Type': 'application/json'}});
    }
}
