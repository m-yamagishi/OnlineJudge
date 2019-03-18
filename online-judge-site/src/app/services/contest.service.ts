import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contest } from '../models/contest';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  private url = environment.serverUrl + '/api/v1/contests';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  getContests():Observable<Contest[]> {
    return this.http.get<Contest[]>(this.url, {headers: this.headers});
  }

  getContest(id: string) {
    return this.http.get(this.url + '/' + id, {headers: this.headers});
  }

  postContest(body) {
    return this.http.post(this.url, body, {headers: this.headers});
  }
}
