import { Component, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from '../../model/user';
import { MessageService } from '../../services/message.service';

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
    private messagesService:MessageService,
    private loginService: LoginService,
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
    this.messagesService.message = null;
    if (!this.form.valid) {
      this.clickedOnce = true;
      return;
    }
    this.retrieveValues();
    console.log(this.profile);
    this.loginService.login$(this.profile).subscribe(
      (goodResponse) => {
        console.log("response:", goodResponse);
        this.handleOK(goodResponse.body);
      },
      (badResponse) => {
        switch (badResponse.status) {
          case 400:
            this.messagesService.message = "json string bad formatted - Versuche es später erneut.";
            break;//bad formatted
          case 490:
            console.log("service:" + this.messagesService.message);
            this.messagesService.message = badResponse.error;
            console.log("service:" + this.messagesService.message);
            break;//username nonexistent
          case 491:
            this.messagesService.message = badResponse.error;
            break; //pwd wrong
          case 500:
            alert(badResponse.error);
            break;
          default:
            this.messagesService.message = badResponse.error;
            break;
        }
      }
    );
  }

  retrieveValues() {
    this.profile.password = this.form.get('password').value;
    this.profile.username = this.form.get('email').value;
  }

  handleOK(body: string) {
    try {
      let objs: Array<any> = JSON.parse(body);
      let user: User = objs[0];
      let token: string = objs[1];
      this.loginService.setLoggedIn(user, this.profile, token);
      this.router.navigate(['']);
      console.log("user", user, "token", token);
    }
    catch (e) {
      console.log("Server Fehler! Bitte später nochmal versuchen!", e);
    }
  }
}
