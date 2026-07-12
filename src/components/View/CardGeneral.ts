import { ICardGeneral } from "../../types";
import { ensureElement } from "../../utils/utils";import { Component } from "../base/Component";

export class CardGeneral extends Component<ICardGeneral> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected ID: string = '';
    
    constructor(container: HTMLElement) {
        super(container)

        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this.titleElement.textContent = value
    }
    
    set cost(value: number | null) {
        if (value) {
            this.priceElement.textContent = `${value} синапсов`
            return
        }
        this.priceElement.textContent = `Бесценно`
    }

    set id(value: string) {
        this.ID = value
    }
}