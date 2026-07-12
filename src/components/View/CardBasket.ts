import { ICardBasket } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardGeneral } from "./CardGeneral";

export class CardBasket extends CardGeneral implements ICardBasket {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container)

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this.deleteButton.addEventListener('click', () => {
            this.events.emit('basket:delete', { id: this.id })
        })
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}