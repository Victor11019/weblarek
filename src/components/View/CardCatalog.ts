import { ICardCatalog} from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { CardGeneral } from "./CardGeneral";

export type CategoryKey = keyof typeof categoryMap;
  
export class CardCatalog extends CardGeneral implements ICardCatalog {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected selectOnAction: () => void;

    constructor(container: HTMLElement, onAction: () => void) {
        super(container);
        
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);

        this.selectOnAction = onAction;
    
         this.container.addEventListener('click', () => {
         this.selectOnAction();
        })
    }

    set image(value: string) {
        this.setImage(this.imageElement, CDN_URL + value, this.imageAdd)
    }

    set imageAdd(value: string) {
        this.imageElement.alt = value
    }

    set category(value: CategoryKey) {
        const className = categoryMap[value]
        if(!className) { return }
        this.categoryElement.classList.add(className)
        this.categoryElement.textContent = value
    }
}