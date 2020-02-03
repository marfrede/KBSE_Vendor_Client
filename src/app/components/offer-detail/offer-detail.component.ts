import { Component, OnInit } from '@angular/core';
import { Offer } from '../../model/offer';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getOffer();
  }

  getOffer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.offerService.getOffer$(id)
      .subscribe((response) => this.offer = JSON.parse(response.body));
  }

  goBack(): void {
    this.location.back();
  }
}
