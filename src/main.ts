import './scss/styles.scss';

import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { Server } from './components/base/Server';
import { API_URL } from './utils/constants';
import { ICustomer } from './types';
import { Modal } from './components/View/Modal';
import { Basket } from './components/View/Basket';
import { Contacts } from './components/View/Contacts';
import { Success } from './components/View/Sucess';
import { Order } from './components/View/Order';
import ProductCatalog from './components/Models/ProductCatalog';
import BasketModel from './components/Models/BasketModel';
import Customer from './components/Models/Customer';
import { Api } from './components/base/Api';
import { Header } from './components/View/Header';
import { Gallery } from './components/View/Gallery';
import { CardPreview } from './components/View/CardPreview';
import { CardCatalog, CategoryKey } from './components/View/CardCatalog';
import { CardBasket } from './components/View/CardBasket';

// Оболочки для компонентов представления
const api = new Api(API_URL);
const server = new Server(api);
const events = new EventEmitter();
const productCatalog = new ProductCatalog(events);
const basketModel = new BasketModel(events);
const customerModel = new Customer(events);

// Оболочки для компонентов представления
const headerContainer = ensureElement<HTMLElement>('.header');
const galerryContainer = ensureElement<HTMLElement>('.page__wrapper');
const modalContainer = ensureElement<HTMLElement>('.modal');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const successContainer = successTemplate.content.cloneNode(true) as HTMLElement;
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderContainer = cloneTemplate<HTMLFormElement>(orderTemplate);
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const contactsContainer = cloneTemplate<HTMLFormElement>(contactsTemplate);

// Экземпляры классов представления
const header = new Header(headerContainer, events);
const galerry = new Gallery(events, galerryContainer);
const modal = new Modal(modalContainer, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const success = new Success(events, successContainer);
const order = new Order(orderContainer, events);
const contacts = new Contacts(contactsContainer, events);
const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), () => {
    events.emit('cardPreviewButton:click');
});

function initialization() {
    
// При изменении данных покупателя отображаем сохраненные данные в формах и передаем в формы имеющиеся ошибки
events.on('order:updated', () => {
    const customer = customerModel.getCustomerData()
    const errors = customerModel.validate()

    order.paymentMethod = customer.payment
    order.address = customer.address
    
    contacts.email = customer.email
    contacts.phone = customer.phone

    const contactErrors: string[] = [];
    if (errors.email) contactErrors.push(errors.email);
    if (errors.phone) contactErrors.push(errors.phone);
    
    const orderErrors: string[] = [];
    if (errors.payment) orderErrors.push(errors.payment);
    if (errors.address) orderErrors.push(errors.address);

    order.showError(orderErrors);
    contacts.showError(contactErrors);
})

// При изменении данных в модели корзины происходит перерисовка компонентов
events.on('basket:change', () => {
    basket.render({
        list: getBasketList(),
        total: basketModel.getTotalCost(),
        buttonState: basketModel.getItemCount() === 0
    })

    header.counter = basketModel.getItemCount()
})

// Удаление товара из списка корзины в окне с корзиной
events.on<{ id: string }>('basket:delete', ({ id }) => {
     const product = productCatalog.getProductById(id);
     if (product && basketModel.hasItem(id)) {
        basketModel.removeItem(product);
     }
})

// Отрисовка каталога товаров
events.on('productCatalog:products', () => {
    const items = productCatalog.getProducts().map((item) => {
        const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), () => {
            events.emit('cardCatalog:selected', { id: item.id });
        })
         
        card.image = item.image;
        card.imageAdd = item.title;
        card.category = item.category as CategoryKey;

        return card.render({
            title: item.title, 
            cost: item.price
        })
    })       
    galerry.render({ catalog: items })
})

// Клик по карточке из каталога товаров для открытия подробной карточки
events.on<{ id: string }>('cardCatalog:selected', ({ id }) => {
    const selectedCard = productCatalog.getProductById(id)
    if (selectedCard) {
        productCatalog.setSelectedProduct(selectedCard)
    }
})

// Открытие полной карточки товара в модальном окне
events.on<{ id: string }>('cardCatalog:openCard', ({ id }) => {
    const product = productCatalog.getProductById(id)
    
     if (!product) {
        console.error(`Продукт с id ${id} не найден в каталоге.`);
        return; 
    }

    Object.assign(cardPreview, {
        image: product.image,
        imageAdd: product.title,
        category: product.category,
        description: product.description,
        buttonChange: basketModel.hasItem(id)
    });

    modal.open()

    modal.render({ 
        content: cardPreview.render({
            title: product.title,
            cost: product.price
        }) 
    })            
})

// клик по кнопке добавления/удаления в корзину
events.on('cardPreviewButton:click', () => {
    const product = productCatalog.getSelectedProduct();
    if (!product) return;

    const hasCart = basketModel.hasItem(product.id);

    if (hasCart) {
        basketModel.removeItem(product)
    } else {
        basketModel.addItem(product)
    }

    cardPreview.buttonChange = !hasCart;
})

// Функция для получения массива с карточками товаров
const getBasketList = (): HTMLElement[] => {
    const basketLists = basketModel.getItems().map((list, index) => {
        const card = new CardBasket(cloneTemplate(cardBasketTemplate), () => {
            events.emit('basket:delete', { id: list.id });
        })

        card.index = index + 1

        return card.render({
           title: list.title,
           cost: list.price
        })
    })

    return basketLists
}

// Открытие корзины
events.on('basket:open', () => {
    basket.buttonState = basketModel.getItemCount() === 0
    modal.open()
    modal.render({ 
        content: basket.render()})
})

// Переход на страницу создания заказа
events.on('basket:makeOrder', () => {
    modal.render({ 
        content: order.render()
    });
});

// Изменение данных о покупателе
events.on<Partial<ICustomer>>('customer:change', ( data) => {
    customerModel.updateCustomer(data)
})

// Заполнение формы адреса и выбора оплаты
events.on('order:submit', () => {
    modal.render({ 
        content: contacts.render()
    });
});

// Проверяем правильность данных, обновляем данные пользователя, отправляем заказ, если он успешный - выводим сообщение.
events.on<{ email: string; phone: string;}>('contacts:submit', async () => {       
    try {
            const itemsId = basketModel.getItems().map((item) => item.id)
            const order = await server.createOrder({
                ...customerModel.getCustomerData(),
                total: basketModel.getTotalCost(),
                items: itemsId,
            })

                modal.render({ 
                    content: success.render({
                        total: order.total
                    })
                })

                customerModel.clearCustomerData()
                basketModel.clearBasket()
        } catch (err) {
            console.error('Ошибка при создании заказа:', err)
        }
    }
)

// Закрытие модального окна
 events.on('modal:close', () => {
    modal.close();
})

// Закрытие формы об успешной оплате
events.on('success-modal:close', () => {         
    console.log('Success modal is closing');
})

// Запрос за товарами
server
    .getProductList()
    .then((data) => {productCatalog.saveProducts(data)})
    .catch((err) => console.error(err))
}

initialization()