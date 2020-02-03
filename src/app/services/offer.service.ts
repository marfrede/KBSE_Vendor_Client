import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { Offer } from '../model/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  readonly url: string = 'http://localhost:8080/VirtuelleLebensmittel/resources/vendor/';


  constructor(
    private http: HttpClient,
    public loginService: LoginService
  ) { }

  public getOffers$(): Observable<HttpResponse<string>> {
    let httpOptions = {
      responseType: 'json' as 'json',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.loginService.token}`,
      }),
      observe: 'response' as 'response'
    };
    return this.http.get<string>(this.url + "offers", httpOptions);
  }

  getOffer$(id: number):Observable<HttpResponse<string>>{
    let httpOptions = {
      responseType: 'json' as 'json',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.loginService.token}`
      }),
      observe: 'response' as 'response'
    };
    return this.http.get<string>(this.url + `offers/${id}`, httpOptions);
  }

  public addOffer$(offer: Offer): Observable<HttpResponse<Object>> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.loginService.token}`,
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };
    return this.http.post(this.url + "offers", JSON.stringify(offer), httpOptions);
  }


}
