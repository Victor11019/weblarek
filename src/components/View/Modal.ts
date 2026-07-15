import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { IModal } from '../../types';

export class Modal extends Component<IModal> {
	protected closeButton: HTMLButtonElement;
    protected modalContent: HTMLElement;
    protected openFlag: boolean = false;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container)
        this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container)

		this.closeButton.addEventListener('click', () => {
            this.close();
        });

		this.container.addEventListener('click', (event) => {
            if (event.target === container) {
                this.close();
            }
        });

        this.events.on('success-modal:close', () => {
            this.close();
        });
    }

	open() {
        if (this.openFlag) { return }
        this.container.classList.add('modal_active');
        this.openFlag = true;
        this.events.emit('modal:open');
    }

	close() {
        if (!this.openFlag) { return }
        this.container.classList.remove('modal_active');
        this.openFlag = false;
        this.modalContent.innerHTML = '';
        this.events.emit('modal:close');
    }

	isOpen(): boolean {
        return this.openFlag
    }

	set modal(content: HTMLElement) {
        this.modalContent.innerHTML = ''
        this.modalContent.appendChild(content)
    }
}