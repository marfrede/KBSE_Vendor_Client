import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  frontendActive:boolean;
  warning:string;

  constructor(
    private location: Location,
    private loginService: LoginService,
    private http: HttpClient
  ) { }

  ngAfterViewInit() {
    this.frontendActive_().then(bool=>this.frontendActive=bool);
  }

  frontendActive_():Promise<boolean> {
    return new Promise((resolve) => {
      this.http.get("http://localhost:8080/VirtuelleLebensmittel/resources/vendor/ping", { observe: 'response' }).subscribe(
        (s) => {resolve(true);},
        (e) => {resolve(false);}
      );
    });
  }

  setWarning() {
    this.frontendActive_().then(bool=>this.frontendActive=bool);
    this.warning = 'Frontend inaktiv!'
    setTimeout(()=>{
      this.warning = null;
    }, 3000);
  }

}
