import {generatePopup} from './generate-popup.js';
import {activateForm, activateFilters} from './form.js'; // eslint-disable-line no-unused-vars
import {getMultipleRandom, showAlert} from './util.js';
import {getData} from './api.js';

const address = document.querySelector('#address');

const DEFAULT_COORDINATES = {
  lat: 35.68483,
  lng: 139.75248
};

const DEFAULT_ZOOM =  12;
const OFFERS_COUNT = 10;

const MAP_SETTINGS = {
  layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let map;
let mainMarker;

const setAddress = ({lat, lng}) => {
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const renderMarkers = (offers) => {
  offers.forEach((offer) => {
    const {
      location: {
        lat,
        lng,
      } } = offer;

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: pinIcon,
      }
    );

    marker
      .addTo(map)
      .bindPopup(generatePopup(offer));
  });
};

const resetMap = () => {
  if (map) {
    map.setView(DEFAULT_COORDINATES, DEFAULT_ZOOM);
  }
  mainMarker.setLatLng(DEFAULT_COORDINATES);

  setTimeout(() => {
    setAddress(DEFAULT_COORDINATES);
  });
};

const onSuccessLoadOffers = (offers) => {
  const currentOffers = offers;

  renderMarkers(getMultipleRandom(currentOffers, OFFERS_COUNT));
};

const onFailLoadOffers = (message) => {
  showAlert(message);
};

const initMap = () => {
  map = L.map('map-canvas')
    .on('load', () => {
      setAddress(DEFAULT_COORDINATES);
      getData(onSuccessLoadOffers, onFailLoadOffers);
      activateForm();
    })
    .setView(DEFAULT_COORDINATES, DEFAULT_ZOOM);

  L.tileLayer(MAP_SETTINGS.layer, MAP_SETTINGS.attribution).addTo(map);

  mainMarker = L.marker(
    DEFAULT_COORDINATES,
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );

  mainMarker.addTo(map);

  // renderMarkers(similarOffers);

  mainMarker.on('move', ({target}) => {
    const newCoordinates = target.getLatLng();
    setAddress(newCoordinates);
  });

};

export {initMap, resetMap};
