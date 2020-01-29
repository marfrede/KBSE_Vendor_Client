import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Profile } from '../../model/profile';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user:User;
  profile:Profile;

  form:FormGroup;

  constructor(
    private loginService:LoginService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.profile = {};
    this.user = {}
    this.form = this.formBuilder.group({
      firstname: [null,[Validators.required, Validators.maxLength(25)]],
      lastname: [null,[Validators.required, Validators.maxLength(25)]],
      postcode: [null, [Validators.required, Validators.pattern("[0-9]{5}")]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.maxLength(50)]],
      city:[null, [Validators.required, Validators.maxLength(50)]],
      street:[null, [Validators.required, Validators.maxLength(50)]],
      nr:[null, [Validators.required, Validators.pattern("[1-9][0-9]*[a-z]?"), Validators.maxLength(50)]]
    });
  }

  onSubmitRegister(){
    this.retrieveValues();
    console.log("user",this.user,"profile",this.profile);
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

}
