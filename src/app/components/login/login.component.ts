import { Component, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from '../../model/user';
import { MessageService } from '../../services/message.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  clickedOnce: boolean;

  profile: Profile;

  constructor(
    public loginService: LoginService,
    private messageService:MessageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.profile = {};
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  onSubmitLogin() {
    this.messageService.clearMessage();
    if (!this.form.valid) {
      this.clickedOnce = true;
      return;
    }
    this.retrieveValues();
    console.log(this.profile);
    this.loginService.login$(this.profile).subscribe(
      (goodResponse) => {
        console.log("response:", goodResponse);
        this.handleOK(goodResponse.body as unknown as any[]);
      },
      (badResponse) => {
        switch (badResponse.status) {
          case 400://bad formatted
            this.messageService.setMessage("json string bad formatted - Versuche es später erneut.");
            break;
          case 490://username nonexistent
          this.messageService.setMessage(badResponse.body);
            break;
          case 491://pwd wrong
            this.messageService.setMessage(badResponse.body);
            break; 
          default:
            alert(badResponse.error + badResponse.status + badResponse.statusMessage + "\n Ein Server Error liegt vor! \nBitte starten Sie den Server.");
            break;
        }
      }
    );
  }

  retrieveValues() {
    this.profile.password = this.form.get('password').value;
    this.profile.username = this.form.get('email').value;
  }

  handleOK(body: any[]) {
    try {
      let user: User = body[0];
      let token: string = body[1];
      this.loginService.setLoggedIn(user, this.profile, token);
      this.router.navigate(['']);
      console.log("user", user, "token", token);
    }
    catch (e) {
      console.log("Server Fehler! Bitte später nochmal versuchen!", e);
    }
  }
}
