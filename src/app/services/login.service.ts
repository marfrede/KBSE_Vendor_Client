import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Profile } from '../model/profile';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly url: string = 'http://localhost:8080/VirtuelleLebensmittel/resources/vendor/';

  public profile: Profile;
  public user: User;
  public token: string;

  private httpOptions = {
    responseType: 'text' as 'text',
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response' as 'response'
  };

  private httpOptionsPlain = {
    responseType: 'text' as 'text',
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    }),
    observe: 'response' as 'response'
  };

  constructor(
    private http: HttpClient
  ) { }

  public register$(profile: Profile, user: User): Observable<HttpResponse<string>> {
    return this.http.post(
      this.url + "register", //url
      "[" + JSON.stringify(profile) + "," + JSON.stringify(user) + "]", //req body
      this.httpOptions //options
    );
  }

  public login$(profile: Profile): Observable<HttpResponse<string>> {
    return this.http.post(this.url + "login", JSON.stringify(profile), this.httpOptions);
  }

  public logout$(): Observable<HttpResponse<string>>{
    return this.http.post(this.url + "logout", this.token, this.httpOptionsPlain);
  }

  setLoggedIn(user: User, profile:Profile, token: string): void {
    this.token = token;
    this.user = user;
    this.profile = profile;
  }
  setLoggedOut(): void {
    this.token = null;
    this.user = null;
    this.profile = null;
  }

}