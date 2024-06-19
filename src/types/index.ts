export interface IProduct { // интерфейс для товара
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
  }
  
  export interface IProductList { // интерфейс для списка товаров
    products: string[];
    total: number;  
  }
  
  export type TPayment = 'online' | 'cash'; // тип оплаты
  
  export interface IOrderForm { // интерфейс для формы заказа
    payment: string;
    address: string;
    email: string;
    phone: string;
  }
  
  export interface IOrder extends IOrderForm{ // интерфейс для заказа 
    total: number | null;
    products: IProduct[];
  }
  
  export interface IOrderData { // интерфейс для оформленного заказа
    id: string;
    total: number;
  }
  
  export interface IBasket { // интерфейс для корзины
    products: IProduct[];
    total: number | null;  
  }
  
  
  export interface IUser { // интерфейс для пользователя
    address: string;
    email: string ;
    phone: string;
    payment: string;  
  }
  
  export interface IWebLarekAPI { // интерфейс API клиента
    getProducts(): Promise<IProductList>;
    getProductById(id: string): Promise<IProduct>;
      postOrder(order: IOrder): Promise<IOrderData>;
  }
  
  export interface IBasketModel { // интерфейс модели данных корзины
    products: IProduct[];
    addToBasket(id: string): void;
    removeFromBasket(id: string): void;
    clearBasket(): void;
    getTotalPrice(): number;
  }
  
  export interface IOrderModel extends Partial<IOrder> { // интерфейс модели заказа
    addAddress(address: string): void;
    addPhone(phone: string): void;
    addEmail(email: string): void;
    addPayment(payment: TPayment): void;
  }
  
  export interface IProductCard extends IProduct { // интерфейс для карточки товара
    cardTemplate: HTMLTemplateElement;
    getProduct(): void;  
  }
  
  export interface IModalContainer { // интерфейс для контейнера модальных окон
    overlay: HTMLElement;
    closeButton: HTMLElement;
    openModal(): void;
    closeModal(): void;
    closeModalByEsc(): void;
    closeModalByOverlay(): void;
  }
  
  export interface IModal { // интерфейс для модального окна
    title?: string;
    product: IProduct;
    basket: IBasket;
    form: IOrderForm;
    content: HTMLElement;
  }
  
  export interface ISuccessModal extends IModal { // интерфейс для модального окна успешно созданного заказа
    totalPrice: number;
    mainPageButton: HTMLElement;
    getTotalPrice(): number;
  }
  
  // Возможно будет иметь смысл выделить отдельный компонент Form,
  // как обертку для полей формы Formfields.
  // Тогда пригодятся следующие интерфейсы:
  
  export interface IForm {
    fields: IFormField[];
    button: HTMLElement;
    displayNextFields(): void;
    submit(): void;
  }
  
  export interface IFormField {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    isValid: boolean;
    error: string;
    setValue(): void;
    setValidation(): void;
    setError(): void;
  }