import { ISuccessModal } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export class Success extends Component<ISuccessModal> {
  protected _close: HTMLButtonElement;
  protected _totalPrice: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._close = ensureElement<HTMLButtonElement>('.order-success__close', container);
    this._totalPrice = ensureElement<HTMLElement>('.order-success__description', container);
  }

  set totalPrice(value: string) {
    this._totalPrice.textContent = `Списано ${value} синапсов`;
  }
}
