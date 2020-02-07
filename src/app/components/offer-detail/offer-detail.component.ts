import { Component, OnInit, ViewChild } from '@angular/core';
import { Offer } from '../../model/offer';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { Location } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
  offerName: string;
  offerId: number;
  offerActive: boolean;
  form: FormGroup;
  clickedOnce: boolean;
  @ViewChild('myForm', { static: false }) formViewchild;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OfferService,
    private location: Location,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getOffer().then((offer) => {
      if (offer) {
        this.initFormValidators();
        this.initFormValues(offer);
        this.form.valueChanges.subscribe(() => {
          this.offerName = this.form.get('name').value;
        });
      }
    });
  }

  private getOffer(): Promise<Offer> {
    const offer_id = +this.route.snapshot.paramMap.get('id');
    return new Promise<Offer>((resolve) => {
      this.offerService.getOffer$(offer_id).subscribe(
        (goodResponse) => {
          console.log("succeeded during getOffer:", goodResponse);
          let offer = goodResponse.body as Offer;
          resolve(offer);
        },
        (badResponse) => {
          console.log("failed during getOffer:", badResponse);
          switch (badResponse.status) {
            case 400://json error
              this.router.navigate(['all']).then(() => this.messageService.setMessageTimeout("Server JSON bad formatted Fehler. Versuche es später erneut.", 10000));
              resolve(null);
              break;
            case 470://token invalid
              console.log("failed during getOffer: token expired.");
              this.loginService.resetToken();
              this.router.navigate(['/login']).then(() => this.messageService.setMessage("Ihre Session ist abgelaufen. Bitte melden Sie sich erneut an.", true));
              resolve(null);
              break;
            case 471://token missing
              this.router.navigate(['home']).then(() => this.messageService.setMessage(badResponse.statusMessage));
              resolve(null);
              break;
            case 478: //unauthorized (the requested offer is not owned by requesting vendor)
              this.router.navigate(['home']).then(() => this.messageService.setMessage(badResponse.statusMessage));
              resolve(null);
              break;
            default://e.x. 500 server error
              this.router.navigate(['home']).then(() => this.messageService.setMessage("Server Error >" + badResponse.status + " " + badResponse.statusMessage + "< " + badResponse.error));
              resolve(null);
              break;
          }
        }
      );
    });
  }

  public onSubmitUpdate(): void {
    this.messageService.clearMessage();
    if (!this.form.valid) {
      this.clickedOnce = true;
      return;
    }
    this.submit(this.retrieveValues());
  }

  private submit(offer: Offer) {
    this.offerService.updateOffer$(offer).subscribe(
      (goodResponse) => {
        console.log("succeeded to modifyOffer:", goodResponse);
        this.goBack();
      },
      (badResponse) => {
        console.log("failed to modifyOffer:", badResponse);
        switch (badResponse.status) {
          case 400://json error
            this.router.navigate(['all']).then(() => this.messageService.setMessageTimeout("Server JSON bad formatted Fehler. Versuche es später erneut.", 10000));
            break;
          case 470://token invalid
            console.log("failed during modifyOffer: token expired.");
            this.loginService.resetToken();
            this.router.navigate(['/login']).then(() => this.messageService.setMessage("Ihre Session ist abgelaufen. Bitte melden Sie sich erneut an.", true));
            break;
          case 471://token missing
            this.router.navigate(['home']).then(() => this.messageService.setMessage(badResponse.statusMessage));
            break;
          case 478: //unauthorized (the requested offer is not owned by requesting vendor)
            this.router.navigate(['home']).then(() => this.messageService.setMessage(badResponse.statusMessage));
            break;
          default://e.x. 500 server error
            this.router.navigate(['home']).then(() => this.messageService.setMessage("Server Error >" + badResponse.status + " " + badResponse.statusMessage + "< " + badResponse.error));
            break;
        }
      }
    );
  }

  private initFormValidators() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      price: [null, [Validators.required, Validators.min(0)]],
      kilogramm: [null, [Validators.required]],
      count: [null, [Validators.required, Validators.min(0)]]
    });
  }

  private initFormValues(offer: Offer): void {
    this.offerName = offer.name;
    this.offerId = offer.id;
    this.offerActive = offer.active;
    this.form.get('name').setValue(offer.name);
    this.form.get('price').setValue(offer.price);
    this.form.get('description').setValue(offer.description);
    this.form.get('kilogramm').setValue(offer.kilogramm);
    this.form.get('count').setValue(offer.availableCount);
  }

  private retrieveValues(): Offer {;
    let offer: Offer = {};
    offer.id = this.offerId;
    offer.active = this.offerActive;
    offer.name = this.form.get('name').value;
    offer.price = this.form.get('price').value;
    offer.description = this.form.get('description').value;
    offer.kilogramm = this.form.get('kilogramm').value;
    offer.availableCount = this.form.get('count').value;
    return offer;
  }

  public goBack() {
    this.location.back();
  }

}
