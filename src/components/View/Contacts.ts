import { IContacts } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export class Contacts extends Form implements IContacts {
	protected phoneInput: HTMLInputElement
    protected emaiInput: HTMLInputElement

    constructor(container: HTMLFormElement, events: IEvents) {
		super(events, container);

        this.phoneInput = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.container)
		this.emaiInput = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.container)

        this.phoneInput.addEventListener('input', (event) => {
            const target = event.currentTarget as HTMLInputElement;
            this.events.emit('customer:change', {phone: target.value.trim()})
        })

		 this.emaiInput.addEventListener('input', (event) => {
            const target = event.currentTarget as HTMLInputElement;
            this.events.emit('customer:change', {email: target.value.trim()})
        })

		this.subButton.disabled = true

		this.container.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.events.emit('contacts:submit')
        })

    }

	set phone(value: string) {
        this.phoneInput.value = value ?? ''
    }

    set email(value: string) {
        this.emaiInput.value = value ?? ''
    }

}