import { ICardPreview } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardGeneral } from "./CardGeneral";

export class CardPreview extends CardGeneral implements ICardPreview {
  protected imageElement: HTMLImageElement; 
  protected categoryElement: HTMLElement;
  protected deleteCartButton: HTMLButtonElement;
  protected descriptionElement: HTMLElement;

constructor(container: HTMLElement, protected events: IEvents) {
  super(container);
     
  this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)
  this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
  this.deleteCartButton = ensureElement<HTMLButtonElement>('.card__button', this.container)
  this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)
    
  this.deleteCartButton.addEventListener('click', () => {
      this.events.emit('cardPreviewButton:click', { id: this.id})
      this.events.emit('cardPreviewButton:change', { id: this.id})
    })
   } 

  set image(value: string) {
      this.setImage(this.imageElement, CDN_URL + value, this.imageAdd)
  }

  set imageAdd(value: string) {
      this.imageElement.alt = value
  }
  
  set category(value: string) {
      this.categoryElement.textContent = value
  }

  set price(value: number | null) {
      if(value === null) {
          this.deleteCartButton.disabled = true
          this.deleteCartButton.textContent = 'Недоступно'
      } else {
          this.deleteCartButton.disabled = false
      }
      if (value) {
          this.priceElement.textContent = `${value} синапсов`
          return
      }
      this.priceElement.textContent = `Бесценно`
  }
  
  set buttonChange(value: boolean) {
      this.deleteCartButton.textContent = value 
      ? 'Удалить из корзины'
      : 'В корзину'
  }

  set description(value: string) {
        this.descriptionElement.textContent = value
    }
}