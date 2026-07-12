import { ISuccess } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Success extends Component<ISuccess> {
   protected closeButton: HTMLButtonElement;
   protected totalElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        this.totalElement = ensureElement<HTMLElement>('.order-success__description', this.container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit('modal:close')
        })
    }
    
    set total(value: number) {
		this.totalElement.textContent = `Списано ${value} синапсов`;
	}
}
