import { ICustomer, TPayment} from "../../types";
import { IEvents } from "../base/Events";

class Customer {

  private payment: TPayment = '';
  private address: string = '';
  private phone: string = '';
  private email: string = '';

  constructor (protected events: IEvents) {}

  getCustomerData(): ICustomer {
    return {
   payment: this.payment,
   address: this.address,
   phone: this.phone,
   email: this.email
    };
  }

  clearCustomerData(): void {
    this.payment = '';
    this.address = '';
    this.phone = '';
    this.email = '';
    this.events.emit('order:updated')
  }

  updateCustomer(data: Partial<ICustomer>): void {
        if (data.payment !== undefined) {
            this.payment = data.payment
        }

        if (data.email !== undefined) {
            this.email = data.email
        }

        if (data.phone !== undefined) {
            this.phone = data.phone
        }

        if (data.address !== undefined) {
            this.address = data.address
        }

        this.events.emit('order:updated')
    }

  validate(): Partial<Record<keyof ICustomer, string>> {
        const errors: Partial<Record<keyof ICustomer, string>> = {}

    if (this.payment === '') {
      errors.payment = 'Вид оплаты не может быть пустым';
    }

    if (this.address === '') {
      errors.address = 'Адрес не может быть пустым';
    }

    if (this.phone === '') {
      errors.phone = 'Телефон не может быть пустым';
    }

    if (this.email === '') {
      errors.email = 'Email не может быть пустым';
    }

    return errors
  }
}

export default Customer