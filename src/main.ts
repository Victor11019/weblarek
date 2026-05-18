import ProductCatalog from './components/Models/ProductCatalog';
import Server from './components/Models/Server';
import './scss/styles.scss';
import { IApi, OrderInfo } from './types';

const api: IApi = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }
    return await response.json() as Promise<T>;
  },
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }
    return await response.json() as Promise<T>;
  }
};

const server = new Server(api);

server.getProd()
  .then((responseData) => {
     const products = responseData.products;
     const catalog = new ProductCatalog;
     catalog.saveProducts(products);
     console.log('Сохранённый каталог:', catalog.getProducts())
  })
  .catch((error) => {
    console.error('Ошибка при получении товаров:', error)   
  });

const orderInfo: OrderInfo = {
  customerData: {
    name: 'Дмитрий Владимиров',
    email: 'dima@gmail.com',
    phone: '+7-903-564-3216',
    payment: 'cash'
  },
  items: [
    {prodId: "412bcf81-7e75-4e70-bdb9-d3c73c9803b7", quantity: 1},
    {prodId: "1c521d84-c48d-48fa-8cfb-9d911fa515fd", quantity: 2}
  ],
};

server.postOrder(orderInfo)
  .then((confirm) => {
    console.log('Заказ подтверждён:', confirm);
  })
  .catch((error) => {
    console.error('Ошибка при оформлении заказа:', error)
  });