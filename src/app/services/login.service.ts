import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Profile } from '../model/profile';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly url: string = 'http://localhost:8080/VirtuelleLebensmittel/resources/vendor/';

  public profile: Profile;
  public user: User;
  public token: string;

  constructor(
    private http: HttpClient,
    private cookiehelper: CookieService
  ) { }

  public register$(profile: Profile, user: User): Observable<HttpResponse<string>> {
    let httpOptions = {
      responseType: 'text' as 'text',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };
    return this.http.post(
      this.url + "register", "[" + JSON.stringify(profile) + "," + JSON.stringify(user) + "]", httpOptions
    );
  }

  public login$(profile: Profile): Observable<HttpResponse<string>> {
    let httpOptions = {
      responseType: 'json' as 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };
    return this.http.post<string>(this.url + "login", JSON.stringify(profile), httpOptions);
  }

  public logout$(): Observable<HttpResponse<string>> {
    let httpOptionsPlain = {
      responseType: 'text' as 'text',
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      }),
      observe: 'response' as 'response'
    };
    this.token = null;
    this.cookiehelper.delete('TOKEN');
    return this.http.post(this.url + "logout", this.token, httpOptionsPlain);
  }

  public verifyToken$(token: string): Observable<HttpResponse<string>> {
    let httpOptions = {
      responseType: 'json' as 'json',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      observe: 'response' as 'response'
    };
    return this.http.get<string>(this.url + "user", httpOptions);
  }

  setLoggedIn(user: User, profile: Profile, token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.token = token;
      this.cookiehelper.set('TOKEN', token, 1);
      this.user = user;
      this.profile = profile;
      resolve();
    });
  }
  setLoggedOut(): void {
    this.user = null;
    this.profile = null;
  }

}