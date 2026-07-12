import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

class ProductCatalog {
    private products: IProduct[] = [];
    private selectProduct: IProduct | undefined = undefined;

     constructor (protected events: IEvents) {}

    saveProducts(productsArray: IProduct[]): void {
      this.products = productsArray;
      this.events.emit('productCatalog:products');
  }

    getProducts(): IProduct[] {
      return this.products; 
  }

    getProductById(id: string): IProduct | undefined {
      return this.products.find(product => product.id === id);
  }

    setSelectedProduct(product: IProduct): void {
      this.selectProduct = product;
      this.events.emit('cardCatalog:openCard', { id: product.id });
  }

    getSelectedProduct(): IProduct | undefined {
      return this.selectProduct;
  }
}

export default ProductCatalog