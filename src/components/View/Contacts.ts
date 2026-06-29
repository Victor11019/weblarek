import { ensureElement } from "../../utils/utils";
import { Form } from "./Form";

export interface IContacts {
   email: HTMLInputElement;
   phone: HTMLInputElement;
   payment: string;
}

export class Contacts extends Form implements IContacts {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    protected paymentButton: HTMLButtonElement;
    
    constructor(container: HTMLElement, actions?: {onClick: (event: MouseEvent) => void}) {
        super(container);

        this.emailInput = ensureElement<HTMLInputElement>('name="email"', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('name="phone"', this.container); 
        this.paymentButton = ensureElement<HTMLButtonElement>('.button', this.container);

        if(actions?.onClick) {    
           this.paymentButton.addEventListener('click', actions.onClick);
        }
    }

    set email (item: HTMLInputElement) {
        this.emailInput.textContent = String(item);
    }

    set phone(item: HTMLInputElement) {
        this.phoneInput.textContent = String(item);
    }

    set payment(value: string) {
        this.paymentButton.textContent = value;
    }
}