class Customer {

  private payment: 'card' | 'cash' | '' = '';
  private address: string = '';
  private phone: string = '';
  private email: string = '';

  savePayment(method: 'card' | 'cash' | ''): void { this.payment = method; };
  saveAddress(address: string): void { this.address = address; };
  savePhone(phone: string): void { this.phone = phone; };
  saveEmail(email: string): void { this.email = email; };
  
  getCustomerData(): {
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

   validateData(): {
    isValid: boolean;
    errors: { [key: string]: string };
  } {
    const errors: { [key: string]: string } = {
      payment: !this.payment.trim() ? 'Вид оплаты не может быть пустым' : '',
      address: !this.address.trim() ? 'Адрес не может быть пустым' : '',
      phone: !this.phone.trim() ? 'Телефон не может быть пустым' : '',
      email: !this.email.trim() ? 'Email не может быть пустым' : ''
    };

    const isValid = Object.values(errors).every(error => error === '');
    return { isValid, errors };
  }
}

export default Customer