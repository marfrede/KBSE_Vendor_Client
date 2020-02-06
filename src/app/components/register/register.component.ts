import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/user';
import { Profile } from '../../model/profile';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User;
  profile: Profile;

  form: FormGroup;
  clickedOnce: boolean;

  constructor(
    public loginService: LoginService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.profile = {};
    this.user = {}
    this.form = this.formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      postcode: [null, [Validators.required, Validators.pattern("[0-9]{5}")]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      city: [null, [Validators.required]],
      street: [null, [Validators.required]],
      nr: [null, [Validators.required, Validators.pattern("[1-9][0-9]*[a-z]?")]]
    });
  }

  onSubmitRegister() {
    this.messageService.clearMessage();
    if (!this.form.valid) {
      this.clickedOnce = true;
      return;
    }
    this.retrieveValues();
    this.loginService.register$(this.profile, this.user).subscribe(
      (goodResponse) => {
        console.log("succeeded to register:", goodResponse);
        this.handleOK(goodResponse.body);
      },
      (badResponse) => {
        console.log("failed to register:", badResponse);
        switch (badResponse.status) {
          case 400://bad formatted
            this.messageService.setMessage("json string bad formatted - Versuche es später erneut.");
            break;
          case 480:
            this.messageService.setMessageTimeout(badResponse.error, 8000);
            break;//user gives ot enough input //e.x. street is missing
          case 481:
            this.messageService.setMessage(badResponse.error);
            break; //username or pwd null or too short
          case 482:
            this.messageService.setMessage(badResponse.error);
            break; //username already in use
          case 500:
            alert(badResponse.error);
            break;
          default:
            alert(badResponse.error + badResponse.status + badResponse.statusMessage + "\n Ein Server Error liegt vor! \nBitte starten Sie den Server.");
            this.messageService.setMessageTimeout(badResponse.statusMessage, 10000);
            break;
        }
      });
  }

  retrieveValues() {
    this.profile.password = this.form.get('password').value;
    this.profile.username = this.form.get('email').value;
    this.user.address = this.form.get('nr').value;
    this.user.postCode = this.form.get('postcode').value;
    this.user.city = this.form.get('city').value;
    this.user.street = this.form.get('street').value;
    this.user.name = this.form.get('firstname').value + ' ' + this.form.get('lastname').value;
  }

  handleOK(token: string) {
    this.loginService.setLoggedIn(this.user, this.profile, token);
    this.router.navigate(['']);
  }
}
