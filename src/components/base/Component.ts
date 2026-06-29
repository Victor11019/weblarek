import { IHeader } from "../View/Header";
import { IGallery } from "../View/Gallery";
import { IModal } from "../View/Modal";
import { ISucess } from "../View/Sucess";
import { IBasket } from "../View/BasKet";
import { IForm } from "../View/Form";
import { IOrder } from "../View/Order";
import { IContacts } from "../View/Contacts";
import { ICardBasket } from "../View/CardBasket";
import { TCardCatalog } from "../View/CardCatalog";
import { Product } from "../../types";

/**
 * Базовый компонент
 */
export abstract class Component<T extends IHeader | IGallery | IModal | ISucess | IBasket | IForm | IOrder | IContacts | ICardBasket | TCardCatalog | Product> {
    protected constructor(protected readonly container: HTMLElement) {
        // Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Установить изображение с альтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}
