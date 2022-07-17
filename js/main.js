import {createOffers} from './data.js';
import {generatePopup} from './generate-popup.js';
import {disableForm, activateForm, activateFilters} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');

const offers = createOffers();
const popup = generatePopup(offers[0]);

mapCanvas.appendChild(popup);

disableForm();
activateFilters();
activateForm();
