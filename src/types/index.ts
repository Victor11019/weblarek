export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'card' | 'cash' | '';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
};

export interface IProduct  {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number | null;
  description: string;
};
 
export interface IModal {
	content: HTMLElement;
}

export interface IGallery {
    catalog: HTMLElement[];
}

export interface IHeader {
    counter: number;
}

export interface IBasket {
	list: HTMLElement[];
    total: number;
    button: boolean;
}

export interface ICardBasket extends ICardGeneral {
    index: number;
}

export interface ICardCatalog extends ICardGeneral {
    category: string;
    image: string;
    imageAdd?: string;
}

export interface ICardPreview extends ICardGeneral {
    category: string;
    image: string;
    imageAdd?: string;
    description: string;
}

export interface ICardGeneral {
    id: string;
    title: string;
    cost: number | null;
    index?: number;
}

export interface IForm {
	error: string;
    email?: string;
    phone?: number | string;
    paymentMethod?: TPayment;
    address?: string;
}

export interface IOrder extends IForm {
	address: string
}

export interface IContacts extends IForm  {
	phone: string;
	email: string;
}

export interface ISuccess {
    total: number;
}

export type TOrderResponse = TOrderSuccess | TOrderError;

export interface TOrderData extends ICustomer{
    total: number; 
    items: string[]; 
}

export type TProductListResponse = {
    total: number;
    items: IProduct[];
}

export type TOrderSuccess = {
    id: string;
    total: number;
}

export type TOrderError = {
    error: string;
}

export interface ICustomer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}