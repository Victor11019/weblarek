import { Product } from "../../types";

class ProductCatalog {
    private products: Product[] = [];
    private selectProduct: Product | null = null;

    saveProducts(products: Product[]): void {
      this.products = products;
  }

    getProducts(): Product[] {
      return this.products; 
  }

    getProductById(id: string): Product | undefined {
      return this.products.find(product => product.id === id);
  }

    setSelectedProduct(product: Product): void {
      this.selectProduct = product;
  }

    getSelectedProduct(): Product | null {
      return this.selectProduct;
  }
}

export default ProductCatalog