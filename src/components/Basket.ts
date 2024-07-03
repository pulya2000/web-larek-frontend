import { IBasket } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/EventEmitter";

export class Basket extends Component<IBasket> {
  protected _products: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._products = ensureElement<HTMLElement>('.basket__list', container);
    this._total = ensureElement<HTMLElement>('.basket__price', container);
    this._button = ensureElement<HTMLButtonElement>('.basket__button', container);

    if (this._button) {
      this._button.addEventListener('click', () => {
        events.emit('basket:open');
      })
    }
  }

  set products(products: HTMLElement[]) {
    this._products.replaceChildren(...products);
  }

  set total(total: number) {
    this._total.textContent = total.toString() + 'синапсов'
  }

  set selected(products: string[]) {
    const hasProducts = products.length > 0;
    this.setDisabled(this._button, !hasProducts)
  }
}