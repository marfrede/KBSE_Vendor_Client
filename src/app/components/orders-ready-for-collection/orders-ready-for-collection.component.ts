import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../model/order';
import { LoginService } from "../../services/login.service";
import { MessageService } from "../../services/message.service";
import { Location } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-ready-for-collection',
  templateUrl: './orders-ready-for-collection.component.html',
  styleUrls: ['./orders-ready-for-collection.component.scss']
})
export class OrdersReadyForCollectionComponent implements OnInit {
  public orders: Order[];
  public serverMessage: string;

  constructor(
    public loginService: LoginService,
    private location: Location,
    private router: Router,
    private orderService: OrderService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    if (!this.loginService.token) {
      this.location.back();
    } else {
      this.orderService.getOrders$().subscribe(
        (goodResponse) => {
          console.log("succeeded to getOrders:", goodResponse);
          this.orders = goodResponse.body as unknown as Order[];
          this.orders.sort((o1, o2) => {
            if (o1.customerName < o2.customerName) {
              return -1;
            }
            if (o2.customerName < o1.customerName) {
              return 1;
            }
            return 0;
          });
        },
        (badResponse) => {
          console.log("failed during getOrders:", badResponse);
          switch (badResponse.status) {
            case 400://bad formatted
              this.messageService.setMessageTimeout("Server JSON bad formatted Fehler. Versuche es später erneut.", 10000);
              break;
            case 470://token invalid
              console.log("failed during getAllOffer: token expired.");
              this.loginService.resetToken();
              this.router.navigate(['/login']).then(() => this.messageService.setMessage("Ihre Session ist abgelaufen. Bitte melden Sie sich erneut an.", true));
              break;
            case 471://token missing
            this.router.navigate(['home']).then(() => this.messageService.setMessage(badResponse.statusMessage));
              break;
            case 473://no orders currently placed
              this.messageService.setMessage(badResponse.error);
              break;
            default://e.x. 500 server error
              this.messageService.setMessage("Server Error >" + badResponse.status + " " + badResponse.statusMessage + "< " + badResponse.error);
              break;
          }
        }
      );
    }
  }
}
