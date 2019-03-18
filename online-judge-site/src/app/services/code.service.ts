import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }

  run(body) {
    var url = environment.serverUrl + '/api/v1/run';
    return this.http.post(url, body, { headers: this.headers });
  }

  junit(body) {
    var url = environment.serverUrl + '/api/v1/run/junit';
    return this.http.post(url, body, { headers: this.headers });
  }
}