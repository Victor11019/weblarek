import { Api } from './components/base/Api';
import Basket from './components/Models/Basket';
import Customer from './components/Models/Customer';
import ProductCatalog from './components/Models/ProductCatalog';
import Server from './components/Models/Server';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { OrderInfo } from './types';
import { EventEmitter } from './components/base/Events';
import { Modal } from './components/View/Modal';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/View/Gallery';
import { Header } from './components/View/Header';
import { CardCatalog } from './components/View/CardCatalog';
import { CardPreview } from './components/View/CardPreview';
import { CardBasket } from './components/View/CardBasket';
import { BasKet } from './components/View/BasKet';
import { Order } from './components/View/Order';
import { CardGeneral } from './components/View/CardGeneral';
import { Contacts } from './components/View/Contacts';
import { Form } from './components/View/Form';
import { Success } from './components/View/Sucess';

export const productsModel = new ProductCatalog();

productsModel.saveProducts(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getProducts());
console.log('Получение одного товара по его id: ', productsModel.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
productsModel.setSelectedProduct("HEX-леденец");
console.log('Получение товара для подробного отображения', productsModel.getSelectedProduct());

export const basket = new Basket();

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

export const customer = new Customer();

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
    console.log(responseData)
     const product = responseData.products;
     const catalog = new ProductCatalog;
     catalog.saveProducts(product);
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

const events = new EventEmitter();

const mod = ensureElement<HTMLElement>('#modal-container');
const modal = new Modal(events, mod.cloneNode(true) as HTMLElement);
const modalData = {
  content: HTMLElement,
};

const galler = ensureElement<HTMLElement>('.gallery');
const gallery = new Gallery(events, galler.cloneNode(true) as HTMLElement);
const galleryData = {
  catalog: HTMLElement,
};

const head = ensureElement<HTMLElement>('.header');
const header = new Header(events, head.cloneNode(true) as HTMLElement);
const headerData = {
  counter: 0,
};

const success = new Success(events, cloneTemplate('#success'));
const successData = {
  title: 'Заказ оформлен',
  description: 'Списано 0 синапсов',
  button: 'За новыми покупками!',
};

const cardCatalog = new CardCatalog(cloneTemplate('#card-catalog'));
const cardCatalogData = {
  category: 'софт-скил',
  title: '+1 час в сутках',
  image: './src/images/Subtract.svg',
  price: '750 синапсов',
};

const cardPreview = new CardPreview(cloneTemplate('#card-preview'));
const cardPreviewData = {
  category: 'другое',
  title: 'Бэкенд-антистресс',
  desription: 'Если планируете решать задачи в тренажёре, берите два.',
  image: './src/images/Subtract.svg',
  price: '1000 синапсов',
  button: 'В корзину',
};

const cardBasket = new CardBasket(cloneTemplate('#card-basket'));
const cardBasketData = {
  id: 1,
  title: 'Фреймворк куки судьбы',
  price: '2500 синапсов',
  button: HTMLButtonElement,
};

const basKet = new BasKet(cloneTemplate('#basket'));
const basKetData = {
  title: 'Корзина',
  button: 'Оформить',
  price: '0 синапсов',
};

const order = new Order(cloneTemplate('#order'));
const orderData = {
  title: 'Способ оплаты',
  formTitle: 'Адрес доставки',
  button: 'Далее',
};

const cardGeneral1 = new CardGeneral(cloneTemplate('#card-catalog'));
const cardGeneral2 = new CardGeneral(cloneTemplate('#card-preview'));
const cardGeneral3 = new CardGeneral(cloneTemplate('#card-basket'));
const cardGeneralData = {
  title: HTMLTitleElement,
  price: HTMLElement,
};

const contacts = new Contacts(cloneTemplate('#contacts'));
const contactsData = {
  email: HTMLInputElement,
  phone: HTMLInputElement,
  payment: 'Оплатить',
};

const form1 = new Form(cloneTemplate('#order'));
const form2 = new Form(cloneTemplate('#contacts'));
const formData = {
  title: HTMLButtonElement,
  card: 'Онлайн',
  cash: 'При получении',
};

Object.assign(modal, modalData);
Object.assign(gallery, galleryData);
Object.assign(header, headerData);
Object.assign(success, successData);  
Object.assign(cardGeneral1, cardGeneralData); 
Object.assign(cardGeneral2, cardGeneralData);  
Object.assign(cardGeneral3, cardGeneralData);   
Object.assign(cardCatalog, cardCatalogData);
Object.assign(cardPreview, cardPreviewData);  
Object.assign(cardBasket, cardBasketData);   
Object.assign(basKet, basKetData);  
Object.assign(order, orderData);
Object.assign(contacts, contactsData);
Object.assign(form1, formData);
Object.assign(form2, formData);

export async function fetchProduct() {
   try {
    const productsResponse = await server.getProd(); 
    const productsArray = productsResponse.items; 
    return productsArray;
   } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
      return []; 
   }
  }

const products = await fetchProduct();

events.on('catalog:changed', () => {
  const itemCards = products.map((item) => {
    const card = new CardCatalog(cloneTemplate('#card-catalog'), {
      onClick: () => events.emit('card:select', item),
    });
     return card.render(item)
  });
  gallery.render({catalog: itemCards});
});

const endp = API_URL;
const fullUrl = endp + `/product`

const larekApi = {
  getProductList: () => 
    fetch(fullUrl)
      .then(response => {
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json();
      })
};

larekApi
    .getProductList()
    .then((data) => {
      productsModel.saveProducts(data);
    })
    .catch((err) => console.error(err));

  /* events.on('catalog: changed', () => {
     const preview = new CardPreview(cloneTemplate('#card-preview'), {
      onClick: () => {
        const selProd = productsModel.getSelectedProduct();

        if(selProd !== null) {
            console.log(selProd.image);
            console.log(selProd.category);
            console.log(selProd.title);
            console.log(selProd.price);
          } 
        else {
            console.log('Продукт не найден.')}
      }
     });
     return preview.render();
  }); 
  
events.on('catalog: changed', () => {
     const carbas = new CardBasket(cloneTemplate('#card-basket'), {
      onClick: () => events.emit('card:delete'),
     });
     return carbas.render();
  }); 

events.on('catalog: changed', () => {
  const basket = new Basket();

  const baskProd = productsModel.getProducts().map((item) => {
     const basKet = new BasKet(cloneTemplate('#basket'), {
      onClick: () => {
        if(basket.hasItem(item.id)) {
          console.log('Этот товар есть в корзине!');
          return;
        }
        else {basket.addItem(item)};
      }
     });
     return basKet.render();
  });
    gallery.render({catalog: baskProd});
  }); 

events.on('catalog: changed', () => {
     const order = new Order(cloneTemplate('#order'), {
      onClick: () => {
        if(!customer.validateData()) {
          return;
        }

        basket.processOrder();
      },
     });
     return order.render();
  });

events.on('catalog: changed', () => {
     const contacts = new Contacts(cloneTemplate('#contacts'), {
      onClick: () => {
        if(!customer.validateData()) {
          customer.showValidationErrors();
          return;
        }
        customer.showPaymentStep()
      },
     });
     return contacts.render();
  });

events.on('catalog: changed', () => {
     const template = cloneTemplate('#order');
     const form = new Form(template, {
      onClick: () => {
        const payMethod = ensureAllElements<HTMLButtonElement>('button[.button_alt]:checked')?.values;

        if(!payMethod) {
          console.log('Выберите способ оплаты.');
          return;
        }
        console.log('Выберан способ оплаты', payMethod);
      },
     });

     const buttonButtons = form.container.querySelectorAll('button[.button_alt]');
     buttonButtons.forEach(button => {
      button.addEventListener('change', () => {
        form.container.querySelectorAll('.button_alt').forEach(tnb => {
          tnb.classList.remove('button_alt-active');
        });

        const lab = button.parentElement;
        if(lab) {
          lab.classList.add('button_alt-active');
        }
      });
     });
     
     return form.render();
  }); 
*/