import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json')
  }

  getUser(name: string) {
    var url = environment.serverUrl + '/api/v1/user/' + name;
    return this.http.get(url, {headers: this.headers});
  }

  postUser(body) {
    var url = environment.serverUrl + '/api/v1/user';
    body['role'] = 'Answerer';
    return this.http.post(url, body, {headers: this.headers});
  }
}
