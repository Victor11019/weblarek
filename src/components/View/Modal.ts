import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IModal {
    content: HTMLElement[];
}

export class Modal extends Component<IModal> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;
    protected modalElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
      super(container);

      this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
      this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
      this.modalElement = ensureElement<HTMLElement>('#modal-container', this.container);

      const modal = this.modalElement;
      
      function openModal() 
        { 
          modal.classList.add('modal_active'); 
        }

        if(openModal) 
          { 
            this.container.addEventListener('click', openModal); 
          }

      function closeModal() 
        { 
          modal.classList.remove('modal_active'); 
        }

        if(closeModal) 
          { 
            this.closeButton.addEventListener('click', closeModal); 
          } 

      }

    set content(items: HTMLElement[]) {
        this.contentElement.innerHTML = '';

        items.forEach(item => {
          this.contentElement.appendChild(item);
        });
    }
}