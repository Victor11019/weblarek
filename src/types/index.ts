export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type PaymentMethod = 'card' | 'cash' | '';

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
  payment: PaymentMethod;
  address: string;
  email: string;
  phone: string;
};

export type ValidationRes<T> = {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
}

export type ErrorValid = Partial<Record<keyof IBuyer, string>>;

export type ProdResponse = {
  id: string;
  total: number;
};

export interface OrderInfo extends IBuyer {
    name: string;
  items: {
    prodId: string;
    quantity: number;
  }[];
};

export type OrderResponse = {
  id: string;
  total: number;
};
