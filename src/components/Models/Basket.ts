import { Product } from "../../types";

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
}

export default Basket