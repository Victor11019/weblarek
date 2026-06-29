import { IBuyer } from "../../types";
import { PaymentMethod } from "../../types";
import { ValidationRes } from "../../types";
import { ErrorValid } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";

class Customer {

  private payment: PaymentMethod = '';
  private address: string = '';
  private phone: string = '';
  private email: string = '';

  savePayment(method: PaymentMethod): void { this.payment = method; };
  saveAddress(address: string): void { this.address = address; };
  savePhone(phone: string): void { this.phone = phone; };
  saveEmail(email: string): void { this.email = email; };
  
  getData(): IBuyer {
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
  }

  validateData(): ValidationRes<IBuyer> {
    const errors: ErrorValid<IBuyer> = {};

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

    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors };
  }

  showValidationErrors() {
    const errorEl = ensureAllElements<HTMLElement>('.form__errors');
    errorEl.forEach(el => el.style.display = 'block');
  }

  showPaymentStep() {
    const contactsEl = ensureElement<HTMLFormElement>('name="contacts"');
    if(contactsEl) {
      contactsEl.style.display = 'none';
    }

    const sucessEl = ensureElement<HTMLDivElement>('.order-success');
    if(sucessEl) {
      sucessEl.style.display = 'block';
    }
  }
}

export default Customer