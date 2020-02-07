import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { Offer } from '../model/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  readonly url: string = 'http://localhost:8080/VirtuelleLebensmittel/resources/vendor/offers';

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
    return this.http.get<string>(this.url, httpOptions);
  }

  getOffer$(offer_id: number): Observable<HttpResponse<string>> {
    let httpOptions = {
      responseType: 'json' as 'json',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.loginService.token}`
      }),
      observe: 'response' as 'response'
    };
    return this.http.get<string>(this.url + `/${offer_id}`, httpOptions);
  }

  public addOffer$(offer: Offer): Observable<HttpResponse<Object>> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.loginService.token}`,
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };
    return this.http.post(this.url, JSON.stringify(offer), httpOptions);
  }

  updateOffer$(offer: Offer): Observable<HttpResponse<Object>> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.loginService.token}`,
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };
    return this.http.put(this.url + `/${offer.id}`, JSON.stringify(offer), httpOptions);
  }

}
