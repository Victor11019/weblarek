import { IApi } from "../../types";
import { ProdResponse } from "../../types";
import { OrderResponse } from "../../types";
import { OrderInfo } from "../../types";

class Server {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  };

  async getProd(): Promise<ProdResponse> {
    return await this.api.get<ProdResponse>('/product/')
  };

  async postOrder(orderInfo: OrderInfo): Promise<OrderResponse> {
    return await this.api.post('/order/', orderInfo)
  };
};

export default Server