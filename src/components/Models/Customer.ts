import { IBuyer, ValidationRes } from "../../types";

class Customer {

  private payment: 'card' | 'cash' | '' = '';
  private address: string = '';
  private phone: string = '';
  private email: string = '';

  savePayment(method: 'card' | 'cash' | ''): void { this.payment = method; };
  saveAddress(address: string): void { this.address = address; };
  savePhone(phone: string): void { this.phone = phone; };
  saveEmail(email: string): void { this.email = email; };
  
  IBuyer(): {
    payment: 'card' | 'cash' | '';
    address: string;
    phone: string;
    email: string;
  } {
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
    const errors: Partial<Record<keyof IBuyer, string>> = {
      payment: 'Вид оплаты не может быть пустым',
      address: 'Адрес не может быть пустым',
      phone: 'Телефон не может быть пустым',
      email: 'Email не может быть пустым'
    };

    const isValid = Object.values(errors).every(error => error === '');
    return { isValid, errors };
  }
}

export default Customer