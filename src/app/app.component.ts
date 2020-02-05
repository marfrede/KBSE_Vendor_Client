import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { CookieService } from "ngx-cookie-service";
import { User } from './model/user';
import { Profile } from './model/profile';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  done:boolean = false;
  constructor(
    private cookieHelper: CookieService,
    public loginService: LoginService,
    private router: Router
  ) { }
  ngOnInit() {
    let token = this.cookieHelper.get('TOKEN');
    if (token) {
      console.log("token found!", token);
      this.loginService.verifyToken$(token).subscribe(
        (goodResponse) => {
          console.log(goodResponse);
          this.handleOK(goodResponse.body as unknown as any[], token);
        },
        (badResponse) => {
          console.log(badResponse);
          this.done = true;
          this.router.navigate(['home']);
          switch (badResponse.status) {
            case 400://bad formatted
              break;
            case 470://token invalid
              console.log("found token but it is invalid now");
              this.loginService.resetToken();
              alert("Ihre Session ist abgelaufen. Bitte melden Sie sich erneut an.");
              break;
            case 471://token missing
              console.log("token missing");
              break;
            default:
              console.log("server error: " + badResponse.body);
              break;
          }
        }
      );
    }
    else {
      this.done = true;
    }
  }

  handleOK(body: any[], token: string) {
    try {
      let user: User = body[0];
      let profile: Profile = body[1];
      this.loginService.setLoggedIn(user, profile, token).then(()=>this.done = true);
      console.log("user logged in", user, "token", token);
    }
    catch (e) {
      console.log("Server Fehler! Bitte später nochmal versuchen!", e);
    }
  }
}
