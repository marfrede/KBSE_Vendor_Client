import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/user';
import { Profile } from '../../model/profile';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';

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

  serverMessage: string;

  constructor(
    private loginService: LoginService,
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
    this.serverMessage = null;
    if (!this.form.valid) {
      this.clickedOnce = true;
      return;
    }
    this.retrieveValues();
    this.loginService.register$(this.profile, this.user).subscribe(
      (goodResponse) => {
        console.log("response:", goodResponse);
        this.handleOK(goodResponse.body);
      },
      (badResponse) => {
        switch (badResponse.status) {
          case 400:
            this.setServerMessage("json string bad formatted - Versuche es später erneut.");
            break;//bad formatted
          case 480:
            this.setServerMessage(badResponse.error);
            break;//user gives ot enough input //e.x. street is missing
          case 481:
            this.setServerMessage(badResponse.error);
            break; //username or pwd null or too short
          case 482:
            this.setServerMessage(badResponse.error);
            break; //username already in use
          case 500:
            alert(badResponse.error);
            break;
          default:
            this.setServerMessage(badResponse.error);
            break;
        }
      });
  }
  setServerMessage(newMessage: string) {
    this.serverMessage = newMessage;
    setTimeout(() => {
      this.serverMessage = null;
    }, 5000);
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
