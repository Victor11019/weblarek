import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface ISucess {
   title: string;
   description: string;
   button: string; 
}

export class Success extends Component<ISucess> {
    protected titleElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.titleElement = ensureElement<HTMLElement>('.order-success__title', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit('card:close');
        });
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set button(value: string) {
        this.closeButton.textContent = value;
    }
}
