import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from '../interface/IOrder';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  orderData: BehaviorSubject<IOrder[]> = new BehaviorSubject<IOrder[]>([]);

  constructor() {
    const storedOrder = localStorage.getItem('orderData');
    if (storedOrder) {
      this.orderData.next(JSON.parse(storedOrder));
    }
  }

  getOrderData() {
    return this.orderData.asObservable();
  }

  onOrderChange(newOrder: any) {
    this.orderData.next(newOrder);
    localStorage.setItem('orderData', JSON.stringify(newOrder));
  }
}
