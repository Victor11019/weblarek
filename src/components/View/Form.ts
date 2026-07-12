import { IForm } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Form extends Component<IForm> { 
    protected errElement: HTMLElement;
    protected subButton: HTMLButtonElement;
    protected formElement: HTMLFormElement;
     
    constructor(protected events: IEvents, protected container: HTMLFormElement) {
        super(container);
        
        this.errElement = ensureElement<HTMLElement>('.form__errors', this.container)
        this.subButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container)
        this.formElement = container
    }
    
    showError(errors: string[]): void {
        this.error = errors.join(', ')
        this.subButton.disabled = errors.length !== 0
    }
   
    set error(value: string) {
        this.errElement.textContent = value
    }
}
