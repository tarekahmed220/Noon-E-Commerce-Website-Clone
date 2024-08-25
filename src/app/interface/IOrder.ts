import { IProduct } from './ISomeProduct';

export interface IOrder {
  totalPrice: number;
  products: [IProduct];
  subTotal: number;
  productLength: number;
}
