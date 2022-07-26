import {generatePopup} from './generate-popup.js';
import {activateFilters, activateForm} from './form.js';
import {showAlert} from './util.js';
import {getData} from './api.js';
import {initFilters} from './map-filters.js';

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

const address = document.querySelector('#address');

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
let markerGroup;

const setAddress = ({lat, lng}) => {
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const renderMarkers = (offers) => {
  markerGroup.clearLayers();

  offers
    .slice(0, OFFERS_COUNT)
    .forEach((offer) => {
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
        .addTo(markerGroup)
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
  renderMarkers(offers.slice(0, OFFERS_COUNT));
  initFilters(offers, renderMarkers);
  activateFilters();
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

  markerGroup = L.layerGroup().addTo(map);

  mainMarker = L.marker(
    DEFAULT_COORDINATES,
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );

  mainMarker.addTo(map);

  mainMarker.on('move', ({target}) => {
    const newCoordinates = target.getLatLng();
    setAddress(newCoordinates);
  });

};

const resetMarkers = () => {
  getData(onSuccessLoadOffers, onFailLoadOffers);
};

export {initMap, resetMap, resetMarkers};
