import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private url = environment.serverUrl + '/api/v1/result';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getResults() {
    return this.http.get(this.url, { headers: this.headers });
  }

  getResult(id: string) {
    return this.http.get(this.url + '/' + id, { headers: this.headers });
  }

  postResult(body) {
    return this.http.post(this.url, body, { headers: this.headers });
  }
}
