import { ICardGeneral } from "../../types";
import { ensureElement } from "../../utils/utils";import { Component } from "../base/Component";

export class CardGeneral extends Component<ICardGeneral> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    
    constructor(container: HTMLElement) {
        super(container)

        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }
    
    set cost(value: number | null) {
        this.priceElement.textContent = value ? `${value} синапсов` : 'Бесценно';
    }
}