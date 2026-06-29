import { ensureElement } from "../../utils/utils";
import { Form } from "./Form";

export interface IOrder {
   address: HTMLInputElement;
   button: string;
}

export class Order extends Form implements IOrder {
    protected addressInput: HTMLInputElement;
    protected orderButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: {onClick: (event: MouseEvent) => void}) {
        super(container);
        
        this.addressInput = ensureElement<HTMLInputElement>('name="address"', this.container);
        this.orderButton = ensureElement<HTMLButtonElement>('.order__button', this.container);
        
        if(actions?.onClick) {
           this.orderButton.addEventListener('click', actions.onClick)
        }
    }

    set address(item: HTMLInputElement) {
        this.addressInput.textContent = String(item);
    }

    set button(value: string) {
        this.orderButton.textContent = value;
    }
}