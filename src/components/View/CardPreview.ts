import { ICardPreview } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { CardGeneral } from "./CardGeneral";

type CategoryKey = keyof typeof categoryMap;

export class CardPreview extends CardGeneral implements ICardPreview {
  protected imageElement: HTMLImageElement; 
  protected categoryElement: HTMLElement;
  protected actionButton: HTMLButtonElement;
  protected descriptionElement: HTMLElement;
  protected handleAction: () => void;

constructor(container: HTMLElement, onAction: () => void) {
  super(container);
     
  this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)
  this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
  this.actionButton = ensureElement<HTMLButtonElement>('.card__button', this.container)
  this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)

  this.handleAction = onAction;
    
  this.actionButton.addEventListener('click', () => {
      this.handleAction();
    })
   } 

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value, this.imageAdd)
  }

  set imageAdd(value: string) {
    this.imageElement.alt = value
  }
  
  set category(value: CategoryKey) {
    const nameClass = categoryMap[value]
    if(!nameClass) {return}
    this.categoryElement.classList.add(nameClass)
    this.categoryElement.textContent = value
  }

  set buttonText(value: string) {
    this.actionButton.textContent = value
  }

  set buttonDisabled(value: boolean) {
    this.actionButton.disabled = value
  }

  set buttonChange(value: boolean) {
    this.buttonText = value ? 'Удалить из корзины' : 'В корзину'
  }

  set description(value: string) {
        this.descriptionElement.textContent = value
    }
}