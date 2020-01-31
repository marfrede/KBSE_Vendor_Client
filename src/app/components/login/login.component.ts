import { Component, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
  public clickedOnce: boolean;

  private profile: Profile;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.profile = {};
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.maxLength(50)]]
    });
  }

  onSubmitLogin() {
    if (!this.form.valid) {
      this.clickedOnce = true;
      return;
    }
    this.retrieveValues();
    console.log(this.profile);
    this.loginService.login(this.profile).subscribe((response) => {
      console.log("response:", response);
      //FALLUNTERSCHEIDUNG
      //case success
      if (response.ok) {
        this.setLoggedIn();
      }
    })
  }

  retrieveValues() {
    this.profile.password = this.form.get('password').value;
    this.profile.username = this.form.get('email').value;
  }

  setLoggedIn() {
    this.loginService.isLoggedIn = true;
    this.loginService.profile = this.profile;
    this.router.navigate(['']);
  }

}
