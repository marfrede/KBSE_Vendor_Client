import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly url: string = 'http://localhost:8080/VirtuelleLebensmittel/resources/vendor/orders';

  constructor(
    private http: HttpClient,
    public loginService: LoginService
  ) { }

  public getOrders$(): Observable<HttpResponse<string>> {
    let httpOptions = {
      responseType: 'json' as 'json',
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.loginService.token}`,
      }),
      observe: 'response' as 'response'
    };
    return this.http.get<string>(this.url, httpOptions);
  }
}
