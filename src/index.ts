import './scss/styles.scss';
import { AppState } from './components/AppState';
import { EventEmitter } from './components/base/EventEmitter';
import { WebLarekAPI } from './components/WebLarekAPI';
import { API_URL } from './utils/constants';
import { MainPage } from './components/MainPage';
import { IProduct } from './types';
import { ProductCard } from './components/ProductCard';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();
const appData = new AppState({}, events);
const api = new WebLarekAPI(API_URL);

const page = new MainPage(document.body, events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

export type CatalogChangeEvent ={
  catalog: IProduct[];
}

api.getProducts()
  .then(appData.setCatalog.bind(appData))
  .catch(err => {
    console.error(err);
  });

events.on<CatalogChangeEvent>('larek:changed', () => {
  page.catalog = appData.catalog.map((item) => {
    const card = new ProductCard(cloneTemplate(cardCatalogTemplate));
    return card.render({
      title: item.title,
      image: item.image,
      price: item.price,
      category: item.category,
    });
  }); 
});