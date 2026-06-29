import { Product } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
 

export class CardGeneral extends Component<Product> {
   protected titleCardElement: HTMLElement; 
   protected priceCardElement: HTMLElement;

   constructor(container: HTMLElement) {
    super(container);
     
    this.titleCardElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.priceCardElement = ensureElement<HTMLElement>('.card__price', this.container);

   }

    set title(value: string) {
        this.titleCardElement.textContent = value;
    }   
    
    set price(value: string) {
        this.priceCardElement.textContent = value ? `${value} синапсов` : 'Бесценно';
        
    }   

}