import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface IForm {
   title: string; 
   card: string;
   cash: string;
}

export class Form extends Component<IForm> { 
    protected paymentAddressEmailPhoneElement: HTMLElement;
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
     
    constructor(public container: HTMLElement, actions?: {onClick: (event: MouseEvent) => void}) {
        super(container);
        
        this.paymentAddressEmailPhoneElement = ensureElement<HTMLElement>('.modal__title', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('name="card"', this.container);
        this.cashButton = ensureElement<HTMLButtonElement>('name="cash"', this.container);

        if (actions?.onClick) {
           this.cardButton.addEventListener('click', actions.onClick);
        }

        if (actions?.onClick) {
           this.cashButton.addEventListener('click', actions.onClick);
        }
    }

    set title(value: string) {
        this.paymentAddressEmailPhoneElement.textContent = value;
    }

    set card(value: string) {
        this.cardButton.textContent = value;
    }

    set cash(value: string) {
        this.cashButton.textContent = value;
    }

}
