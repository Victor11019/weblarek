import { Product } from "../../types";
import { ensureElement } from "../../utils/utils";

class Basket {
  private items: Product[] = [];

  getItems(): Product[] {
    return [...this.items];
  }

  addItem(product: Product): void {
    this.items.push(product);
  }

  removeItem(product: Product): void {
    this.items = this.items.filter(item => item.id !== product.id);
  }

  clearBasket(): void {
    this.items = [];
  }

  getTotalCost(): number {
    return this.items.reduce((total, item) => total + (item.price ?? 0), 0);
  }

  getItemCount(): number {
    return this.items.length;
  }

  hasItem(id: string): boolean {
    return this.items.some(item => item.id === id);
  }

  showPaymentStep() {
    const orderEl = ensureElement<HTMLFormElement>('name="order"');
    if(orderEl) {
      orderEl.style.display = 'none';
    }

    const contactsEl = ensureElement<HTMLFormElement>('name="contacts"');
    if(contactsEl) {
      contactsEl.style.display = 'block';
    }
  }

  processOrder() {
        this.clearBasket();
    
        const orderData = {
        items: this.getItems(),
        total: this.getTotalCost(),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
  
      this.showPaymentStep();
  }

}

export default Basket