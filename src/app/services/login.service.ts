import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Profile } from '../model/profile';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080/VirtuelleLebensmittel/resources/vendor/';
  public isLoggedIn: boolean;
  public profile: Profile;
  public user: User;
  private httpOptions = {
    responseType: 'text' as 'text',
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response' as 'response' 
  };

  constructor(
    private http: HttpClient
  ) { }

  public register(profile: Profile, user: User): Observable<HttpResponse<string>> {
    let toSend:string = "["+JSON.stringify(profile) + "," + JSON.stringify(user)+"]";
    return this.http.post(this.url + "registerSignature", toSend, this.httpOptions);
  }

  public login(profile: Profile): Observable<HttpResponse<string>> {
    return this.http.post(this.url + "loginSignature", JSON.stringify(profile), this.httpOptions);
  }
}