import { Form } from './Form';
import { IOrder, TPayment} from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export class Order extends Form implements IOrder {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(events, container);

        this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.addressInput = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container)
        
        this.container.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.events.emit('order:submit')
        })

        this.subButton.disabled = true

        this.cardButton.addEventListener('click', () => {
            this.events.emit('customer:change', { payment: this.cardButton.getAttribute('name') })
        })
        
        this.cashButton.addEventListener('click', () => {
            this.events.emit('customer:change', { payment: this.cashButton.getAttribute('name') })
        })

        this.addressInput.addEventListener('input', (event) => {
            const target = event.currentTarget as HTMLInputElement;
            this.events.emit('customer:change', { address: target.value.trim() });
        });
    }

    set address(value: string) {
        this.addressInput.value = value ?? ''
    }

    set paymentMethod(value: TPayment) {
        if(value === 'card') {
            this.cashButton.classList.remove('button_alt-active')
            this.cardButton.classList.add('button_alt-active')
        }

        if(value === 'cash') {
            this.cardButton.classList.remove('button_alt-active')
            this.cashButton.classList.add('button_alt-active')
        }
    }

}
