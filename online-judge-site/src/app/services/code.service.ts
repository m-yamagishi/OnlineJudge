import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contest } from '../models/contest';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }

  run(body) {
    var url = 'http://localhost:3000/api/v1/run';
    return this.http.post(url, body, { headers: this.headers });
  }

  junit(body) {
    var url = 'http://localhost:3000/api/v1/run/junit';
    return this.http.post(url, body, { headers: this.headers });
  }
}