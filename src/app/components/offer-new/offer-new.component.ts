import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Location } from '@angular/common';
import { Offer } from '../../model/offer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OfferService } from '../../services/offer.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-new',
  templateUrl: './offer-new.component.html',
  styleUrls: ['./offer-new.component.scss']
})
export class OfferNewComponent implements OnInit {

  form: FormGroup;
  clickedOnce: boolean;

  offer: Offer;

  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private offerService: OfferService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if (!this.loginService.token) {
      this.location.back();
    }
    this.offer = {};
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      price: [null, [Validators.required, Validators.min(0)]],
      kilogramm: [null, [Validators.required]],
      count: [null, [Validators.required, Validators.min(0)]]
    });
  }

  private onSubmitAdd() {
    this.retrieveValues();
    console.log("offer: ", this.offer);
    console.log(this.loginService.token);
    this.offerService.addOffer$(this.offer).subscribe(
      (goodResponse) => {
        console.log(goodResponse);
        this.router.navigate(['/all']).then(() => this.messageService.setMessageTimeout("Sie haben ein neues Angebot erstellt.", 10000, true));
      },
      (badResponse) => {
        console.log(badResponse);
        switch (badResponse.status) {
          case 400:
            this.messageService.setMessageTimeout("Server JSON bad formatted Fehler. Versuche es später erneut.", 10000);
            break;
          case 470:
            this.router.navigate(['/login']).then(() => this.messageService.setMessage("Ihre Session ist abgelaufen. Bitte melden Sie sich erneut an.", true));
            break;
          case 471:
            this.messageService.setMessage(badResponse.statusMessage);
            break;
          case 475:
            this.router.navigate(['/all']).then(() => this.messageService.setMessage("Sie haben bereits ein gleichnamiges Angebot erstellt. Sie können keine 2 Angebote mit dem selben Namen anbieten."));
            break;
          case 476:
            this.messageService.setMessage(badResponse.body);
            break;
          default:
            this.messageService.setMessage("Server Error >" + badResponse.status + " " + badResponse.statusMessage + "< " + badResponse.body);
            break;
        }
      }
    );
  }

  private retrieveValues() {
    this.offer.name = this.form.get('name').value;
    this.offer.price = this.form.get('price').value;
    this.offer.description = this.form.get('description').value;
    this.offer.kilogramm = this.form.get('kilogramm').value;
    this.offer.availableCount = this.form.get('count').value;
    this.offer.active = true;
  }

}
