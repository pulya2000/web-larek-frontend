import { IEvents, IOrderForm } from '../types';
import { ensureElement } from '../utils/utils';
import { Form } from './Form';

export class Address extends Form<IOrderForm> {
  protected _onlineButton: HTMLButtonElement;
  protected _cashButton: HTMLButtonElement;
  protected _address: HTMLInputElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    
    this._onlineButton = ensureElement<HTMLButtonElement>('.online', this.container);
    this._cashButton = ensureElement<HTMLButtonElement>('.cash', this.container);
    this._address = ensureElement<HTMLInputElement>('.address',this.container);
    this._button = this.container.querySelector('.order__button');
    
    this._onlineButton.addEventListener('click', (evt: Event) => {
      evt.preventDefault();
      this._onlineButton.classList.add('button_alt-active');
      this._cashButton.classList.remove('button_alt-active');
      events.emit('address:change', {field:'payment', value: 'online'});
    });
    
    this._cashButton.addEventListener('click', (evt: Event) => {
      evt.preventDefault();
      this._cashButton.classList.add('button_alt-active');
      this._onlineButton.classList.remove('button_alt-active');
      events.emit('address:change', {field:'payment', value: 'offline'});
    });

    if (this._address) {
      this._address.addEventListener('input', (evt: InputEvent) => {
          const target = evt.target as HTMLInputElement;
          const value = target.value;
          events.emit('address:change', {field:'address', value: value} );
      });
    }

    if (this._button) {
      this._button.addEventListener('click', () => {
        events.emit('contactForm:open');
      });
    };
  };

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
	};
};
