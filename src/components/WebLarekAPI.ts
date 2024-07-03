import { IOrder, IOrderData, IProduct, IWebLarekAPI } from "../types";
import { API_URL } from "../utils/constants";
import { Api, ApiListResponse } from "./base/api";

export class WebLarekAPI extends Api implements IWebLarekAPI {
  readonly cdn: string;

  constructor(baseUrl: string, options?: RequestInit) {
    super(baseUrl, options)
  }

  getProducts(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) => 
      data.items.map((item) => ({
        ...item,
        image: API_URL + item.image,
      }))
    );
	};

  getProductById(id: string): Promise<IProduct> {
    return this.get(`product/${id}`).then(
      (item: IProduct) => ({
        ...item,
        image: API_URL + item.image,
      })
    );
  };

  postOrder(order: IOrder): Promise<IOrderData> {
    return this.post(`/order`, order).then(
      (data: IOrderData) => data
    );
  };
}
