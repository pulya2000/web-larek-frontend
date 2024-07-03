import { IProduct } from "../types";
import { API_URL } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class ProductCard extends Component<IProduct> {
  protected _description: HTMLElement;
  protected _image: HTMLImageElement;
  protected _title: HTMLElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;
  protected _index: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions ) {
    super(container);
     
    this._description = container.querySelector(`.card__text`);
    this._image = container.querySelector(`.card__image`);
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._category = container.querySelector(`.card__category`);
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._index = container.querySelector(`.basket__item-index`);
    this._button = container.querySelector(`.card__button`);

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }
  
  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set description(value: string) {
    this._description.textContent = value;
  }

  set image(value: string) {
    this._image.src = API_URL + value;
  }

  set title(value: string) {
    this._title.textContent = value;
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set category(value: string) {
    this.setText(this._category, value);
    switch (value) {
      case 'софт-скил':
        this._category.classList.add('card__category_soft');
        break;
      case 'хард-скил':
        this._category.classList.add('card__category_hard');
        break;
      case 'дополнительное':
        this._category.classList.add('card__category_additional');
        break;
      case 'кнопка':
        this._category.classList.add('card__category_button');
        break;
      default:
        this._category.classList.add('card__category_other');
        break;
    }
  }
  
  set price(value: number| null) {
    this.setText(this._price, (value) ? `${value.toString()} синапсов`: 'Бесценно');
  }

  get price(): number {
    return Number(this._price.textContent || '');
  }

  set index(value: string){
    this._index.textContent = value;
  };

  get index(): string{
    return this._index.textContent || '';
  };

  set titleButton(value: string) {
    this._button.textContent = value;
  };

  buttonVisibility(value:number | null) {
    if (value === null) {
      if (this._button) {
        this._button.disabled= true;
      }
    }
  };
}
