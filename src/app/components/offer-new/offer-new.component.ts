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
    public loginService: LoginService,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if (!this.loginService.token) {
      this.messageService.setMessage("Sie müssen angemeldet sein!");
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

  public onSubmitAdd() {
    this.messageService.clearMessage();
    if (!this.form.valid) {
      this.clickedOnce = true;
      return;
    }
    this.retrieveValues();
    this.offerService.addOffer$(this.offer).subscribe(
      (goodResponse) => {
        console.log("succeeded to addNewOffer:", goodResponse);
        this.router.navigate(['/all']).then(() => this.messageService.setMessageTimeout("Sie haben ein neues Angebot erstellt.", 10000, true));
      },
      (badResponse) => {
        console.log("failed to addNewOffer:", badResponse);
        switch (badResponse.status) {
          case 400://json error
            this.messageService.setMessageTimeout("Server JSON bad formatted Fehler. Versuche es später erneut.", 10000);
            break;
          case 470://token invalid
            console.log("failed during addNewOffer: token expired.");
            this.loginService.resetToken();
            this.router.navigate(['/login']).then(() => this.messageService.setMessage("Ihre Session ist abgelaufen. Bitte melden Sie sich erneut an.", true));
            break;
          case 471://token missing
          this.router.navigate(['home']).then(() => this.messageService.setMessage(badResponse.statusMessage));
            break;
          case 475://duplicate offer
            this.router.navigate(['/all']).then(() => this.messageService.setMessageTimeout("Sie haben bereits ein gleichnamiges Angebot (\""+this.offer.name+"\") erstellt. Sie können keine 2 Angebote mit dem selben Namen anbieten.",5000));
            break;
          case 476://property missing
            this.messageService.setMessage(badResponse.error);
            break;
          default://e.x. 500 server error
            this.messageService.setMessage("Server Error >" + badResponse.status + " " + badResponse.statusMessage + "< " + badResponse.error);
            break;
        }
      }
    );
  }

  private retrieveValues():void {
    this.offer.name = this.form.get('name').value;
    this.offer.price = this.form.get('price').value;
    this.offer.description = this.form.get('description').value;
    this.offer.kilogramm = this.form.get('kilogramm').value;
    this.offer.availableCount = this.form.get('count').value;
    this.offer.active = true;
  }

}
