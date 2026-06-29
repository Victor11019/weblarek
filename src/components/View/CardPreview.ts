import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { CardGeneral } from "./CardGeneral";

type CatKey = keyof typeof categoryMap;

export interface ICardPreview {
   image: string;
   category: string;
   description: string;
   button: string;
}

export class CardPreview extends CardGeneral {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected cardButton: HTMLButtonElement;
    protected descriptionElement: HTMLElement;

    constructor(container: HTMLElement, actions?: {onClick: (event: MouseEvent) => void}) {
        super(container);
        
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.descriptionElement = ensureElement<HTMLTitleElement>('.card__text', this.container);

        if(actions?.onClick) {
            this.cardButton.addEventListener('click', actions.onClick);
        }
    }
     
    set image(value: string) {
        this.setImage(this.imageElement, value, this.title);
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        for(const key in categoryMap) {
            this.categoryElement.classList.toggle(
                categoryMap[key as CatKey], 
                key === value
            );
        }
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set button(value: string) {
        this.cardButton.textContent = value;
    }

}
