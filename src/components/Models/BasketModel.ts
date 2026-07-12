import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

class BasketModel {
  protected items: IProduct[] = [];

  constructor (protected events: IEvents) {}

  getItems(): IProduct[] {
    return this.items;
  }

  addItem(product: IProduct): void {
   if (product.price !== null) {
          this.items.push(product);
          this.events.emit('basket:change');
        }
  }

  removeItem(productDelete: IProduct): void {
    this.items = this.items.filter(item => item.id !== productDelete.id);
    this.events.emit('basket:change');
  }

  clearBasket(): void {
    this.items = [];
    this.events.emit('basket:change');
  }

  getTotalCost(): number {
  return this.items.reduce((total, product) => {
      return total + (product.price ?? 0);
  }, 0);
}

  getItemCount(): number {
    return this.items.length;
  }

  hasItem(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}

export default BasketModel