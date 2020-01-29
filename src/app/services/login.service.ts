import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../model/profile';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080/VirtuelleLebensmittel/resources/vendor/';
  public isLoggedIn:boolean;
  public profile: Profile;
  public user:User;

  constructor(
    private http: HttpClient
  ) { }

  public register(profile: Profile, user: User):Observable<any> {
    return this.http.post(this.url + "register", JSON.stringify(profile) + "," + JSON.stringify(user));
  }
  
  public login(profile: Profile):Observable<any>{let httpOptions = {
      responseType: 'text' as 'text',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.url + "login", JSON.stringify(profile), httpOptions);
  }
}