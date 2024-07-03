import { IEvents, IMainPage } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export class MainPage extends Component<IMainPage> {
  protected _catalog: HTMLElement;
  protected _basket: HTMLElement;
  protected _counter: HTMLElement;
  protected _wrapper: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._basket = ensureElement<HTMLElement>('.header__basket');
    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
  
    this._basket.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set catalog(products: HTMLElement[]) {
    this._catalog.replaceChildren(...products);
  }
  
  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  set locked(value: boolean) {
    if (value) {
      this._wrapper.classList.add('page__wrapper_locked');
    } else {
      this._wrapper.classList.remove('page__wrapper_locked');
    }
  }
}