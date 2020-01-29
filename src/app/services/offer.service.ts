import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  url: string = 'http://localhost:8080/VirtuelleLebensmittel/resources/vendor/';

  constructor(
    private http: HttpClient
  ) { }

  makeTest(): Observable<string> {
    console.log("sending request...");
    return this.http.get<string>(this.url + "test2");
  }
}
