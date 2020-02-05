import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { LoginService } from '../../services/login.service';
import { Location } from "@angular/common";
import { Offer } from '../../model/offer';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  offers: Offer[];
  serverMessage: string;

  constructor(
    public loginService: LoginService,
    private location: Location,
    private router: Router,
    private offerService: OfferService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    if (!this.loginService.token) {
      this.location.back();
    } else {
      console.log(this.loginService.token);
      this.offerService.getOffers$().subscribe(
        (goodResponse) => {
          this.offers = goodResponse.body as unknown as Offer[];
          this.offers.sort((o1, o2) => {
            if (o1.active && !o2.active) {
              return -1;
            }
            if (!o1.active && o2.active) {
              return 1;
            }
            return 0;
          });
          console.log(this.offers);
        },
        (badResponse) => {
          console.log(badResponse);
          switch (badResponse.status) {
            case 400://bad formatted
              this.messageService.setMessageTimeout("Server JSON bad formatted Fehler. Versuche es später erneut.", 10000);
              break;
            case 470://token invalid
              console.log("token expired.");
              this.loginService.resetToken();
              this.router.navigate(['/login']).then(() => this.messageService.setMessage("Ihre Session ist abgelaufen. Bitte melden Sie sich erneut an.", true));
              break;
            case 471://token missing
              this.messageService.setMessage(badResponse.statusMessage);
              break;
            default://e.x. 500 server error
              this.messageService.setMessage("Server Error >" + badResponse.status + " " + badResponse.statusMessage + "< " + badResponse.body);
              break;
          }
        }
      );
    }
  }

}
