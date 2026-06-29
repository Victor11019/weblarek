import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface IBasket {
    list: HTMLElement;
    button: string;
    price: string;
}

export class BasKet extends Component<IBasket> {
    protected listElement: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected priceElement: HTMLElement;
    
    constructor(container: HTMLElement, actions?: {onClick: (event: MouseEvent) => void}) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        
        if(actions?.onClick) {
            this.basketButton.addEventListener('click', actions.onClick)
        }
    }

    set list(item: HTMLElement) {
        this.listElement.textContent = String(item);
    }

    set button(value: string) {
        this.basketButton.textContent = value;
    }

    set price(value: string) {
        this.priceElement.textContent = value;
    }
}