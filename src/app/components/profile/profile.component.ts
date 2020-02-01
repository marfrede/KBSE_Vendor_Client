import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.loginService.user) {
      this.location.back();
    }
  }

  logout(){
    if (!this.loginService.token) {
      alert("nobody logged in!")
    }
    else {
      this.loginService.logout$().subscribe(
        (response) => {
          this.location.back();
          console.log(response);
          this.loginService.setLoggedOut();
        }
      );
    }
  }

}
