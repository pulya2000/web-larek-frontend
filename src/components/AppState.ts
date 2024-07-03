import { IAppState, IOrder, IProduct } from "../types";
import { Model } from "./base/Model";

export class AppState extends Model<IAppState> {
  basket: IProduct[] = [];
  order: IOrder = {
    payment: 'online',
    address: '',
    email: '',
    phone: '',
    total: 0,
    products: [],
  };
  catalog: IProduct[];
  preview: string | null;

  addToBasket(item: IProduct) {
    this.basket.push(item);
  }

  removeFromBasket(id: string) {
    this.basket = this. basket.filter(item => item.id !== id)
  }

  clearBasket() {
    this.basket = [];
  }

  getTotalPrice() {
    return this.basket.reduce((sum, next) => sum + (next.price ?? 0), 0)
  }

  setCatalog(products: IProduct[]) {
    this.catalog = products;
  }

  setPreview(product: IProduct) {
    this.preview = product.id;
  }
}
