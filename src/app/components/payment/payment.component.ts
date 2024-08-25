import { Component, OnInit } from '@angular/core';
import {
  ICreateOrderRequest,
  IPayPalConfig,
  NgxPayPalModule,
} from 'ngx-paypal';
import { PaymentService } from '../../Services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgxPayPalModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  total!: string;
  public payPalConfig?: IPayPalConfig;
  orderDetails!: any;

  constructor(private _paymentServ: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this._paymentServ.getOrderData().subscribe((response) => {
      this.orderDetails = response;
      this.initConfig(); // تأكد من تكوين PayPal بعد تحميل البيانات
    });
  }

  private initConfig(): void {
    // تأكد من تحميل orderDetails بشكل صحيح قبل الإعداد
    if (this.orderDetails && this.orderDetails.length > 0) {
      this.total = this.orderDetails[0]?.totalPrice.toString(); // تأكد من أن totalPrice هو رقم وتحويله إلى سلسلة نصية إذا لزم الأمر

      const currency = 'USD'; // تأكد من التوافق مع العملة التي تستخدمها في PayPal
      this.payPalConfig = {
        currency: currency,
        clientId:
          'Af-HZkpKvU-QyeJIbDe2Dx10PAKHRKrEy6Fk8LZT_Zpxy86TBEM5Fb7YVs0m9iqqJyOWAlP627FgQwob',
        createOrderOnClient: (data) =>
          <ICreateOrderRequest>{
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: this.total,
                  breakdown: {
                    item_total: {
                      currency_code: currency,
                      value: this.total,
                    },
                  },
                },
                items: this.orderDetails[1]?.products.map((item: any) => ({
                  name: item.productId.name,
                  quantity: item.quantity,
                  unit_amount: {
                    currency_code: currency,
                    value: item.productId.price,
                  },
                })),
              },
            ],
          },
        advanced: {
          commit: 'true',
        },
        style: {
          label: 'paypal',
          layout: 'vertical',
        },
        onApprove: (data, actions) => {
          console.log(
            'onApprove - transaction was approved, but not authorized',
            data,
            actions
          );
          actions.order.get().then((details: any) => {
            this.router.navigate(['success']);
          });
        },
        onClientAuthorization: (data) => {
          console.log(
            'onClientAuthorization - you should probably inform your server about completed transaction at this point',
            data
          );
        },
        onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
        },
        onError: (err) => {
          console.log('OnError', err);
        },
        onClick: (data, actions) => {
          console.log('onClick', data, actions);
        },
      };
    }
  }
}
