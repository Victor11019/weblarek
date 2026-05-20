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

export interface IBuyer {
  payment: 'card' | 'cash' | '';
  address: string;
  email: string;
  phone: string;
};

export type ValidationRes<T> = {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
}

export type ProdResponse = {
  id: string;
  total: number;
};

export type OrderInfo = {
    name: string;
    email: string;
    phone: string;
    payment: 'card' | 'cash' | '';
  
  items: {
    prodId: string;
    quantity: number;
  }[];
};

export type OrderResponse = {
  success: boolean;
  message: string;
  orderId?: string | number;
  buyer: IBuyer;
};
