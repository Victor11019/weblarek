import { ICardCatalog} from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardGeneral } from "./CardGeneral";

type CategoryKey = keyof typeof categoryMap;
  
export class CardCatalog extends CardGeneral implements ICardCatalog {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);

        this.container.addEventListener('click', () => {
            this.events.emit('cardCatalog:selected', { id: this.id })
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