import {createOffers} from './data.js';
import {generatePopup} from './generate-popup.js';

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(generatePopup(createOffers()[0]));
