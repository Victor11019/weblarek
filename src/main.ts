import { Api } from './components/base/Api';
import Basket from './components/Models/Basket';
import Customer from './components/Models/Customer';
import ProductCatalog from './components/Models/ProductCatalog';
import Server from './components/Models/Server';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { OrderInfo } from './types';

const productsModel = new ProductCatalog();

productsModel.saveProducts(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getProducts());
console.log('Получение одного товара по его id: ', productsModel.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
productsModel.setSelectedProduct("HEX-леденец");
console.log('Получение товара для подробного отображения', productsModel.getSelectedProduct());

const basket = new Basket();
basket.addItem(apiProducts.items[0]);
basket.addItem(apiProducts.items[1]);
console.log('Добавление товара, который был получен в параметре, в массив корзины', basket.getItems());
basket.removeItem(apiProducts.items[0]);
console.log('Удаление товара, полученного в параметре из массива корзины', basket.getItems());
basket.clearBasket();
console.log('Очистка корзины', basket.getItems());
console.log('Получение стоимости всех товаров в корзине', basket.getTotalCost());
console.log('Получение количества товаров в корзине', basket.getItemCount());
console.log('Проверка наличия товара в корзине по его id, полученного в параметр метода', basket.hasItem("b06cde61-912f-4663-9751-09956c0eed67"));

const customer = new Customer();
customer.savePayment('cash');
customer.saveAddress('ул. Полярная, 1');
customer.savePhone('+7-908-124-556-8391');
customer.saveEmail('dima@example.com');

console.log('Получение всех данных покупателя', customer.getData());
console.log('Очистка данных покупателя', customer.clearCustomerData());
console.log('Валидация данных', customer.validateData());

const api = new Api(API_URL);

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
    name: 'Дмитрий Владимиров',
    email: 'dima@example.com',
    phone: '+7-908-124-556-8391',
    address: 'ул. Полярная, 1',
    payment: 'cash',
  
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