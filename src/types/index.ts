export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
};

export interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number | null;
  description: string;
};

export interface Buyer {
  payment: 'card' | 'cash' | '';
  address: string;
  email: string;
  phone: string;
};

export type Prod = {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
};

export type ProdResponse = {
  total: number;
  items: Prod[];
  products: Product[];
};

export type OrderInfo = {
  customerData: {
    name: string;
    email: string;
    phone: string;
    payment: 'card' | 'cash' | '';
  };
  items: {
    prodId: string;
    quantity: number;
  }[];
};