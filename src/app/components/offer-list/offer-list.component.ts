import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  testString:string;

  constructor(
    private offerService:OfferService
  ) { }

  ngOnInit() {
  }

}
