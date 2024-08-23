export interface IProduct {
  code: number;
  image: string;
  name: string;
  onSale: boolean;
  price: string;
  priceBeforeSale: string;
  rate: number;
  subCategoryId: string;
  isFavorite: boolean;
  _id: string;
}

export interface ISomeProducts {
  products: Array<IProduct>;
}
