import { IBasket } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

export class Basket extends Component<IBasket> {
    protected listElement: HTMLUListElement;
    protected buttonElement: HTMLButtonElement;
    protected totalElement: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this.listElement = ensureElement<HTMLUListElement>('.basket__list', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.totalElement = ensureElement<HTMLElement>('.basket__price', this.container);
        

        this.buttonElement.addEventListener('click', () => {
            this.events.emit('basket:makeOrder')
        })
    } 

    set total(value: number) {
        this.totalElement.textContent = `${value} синапсов`
    }

    set list(items: HTMLElement[]) {
        this.listElement.innerHTML = ''
        items.forEach(item => {
            this.listElement.appendChild(item)
        })
    }

    set button(state: boolean) {
        this.buttonElement.disabled = state
    }
}