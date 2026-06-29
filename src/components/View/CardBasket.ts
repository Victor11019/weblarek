import { ensureElement } from "../../utils/utils";
import { CardGeneral } from "./CardGeneral";

export interface ICardBasket {
    index: number;
    delete: HTMLButtonElement;
}

export class CardBasket extends CardGeneral {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: {onClick: (event: MouseEvent) => void}) {
        super(container)

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        if(actions?.onClick) {
             this.deleteButton.addEventListener('click', actions.onClick);
    }
}
    set index(value: number) {
        this.indexElement.textContent = String(value);
    }

    set delete(item: HTMLButtonElement) {
        this.deleteButton.textContent = String(item);
    }
}