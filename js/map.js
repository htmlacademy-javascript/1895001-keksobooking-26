import {createOffers} from './data.js';
import {generatePopup} from './generate-popup.js';
import {activateForm, activateFilters} from './form.js'; // eslint-disable-line no-unused-vars

const address = document.querySelector('#address');

const DEFAULT_COORDINATES = {
  lat: 35.68483,
  lng: 139.75248
};

const DEFAULT_ZOOM =  12;

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

const similarOffers = createOffers(10);

const setAddress = ({lat, lng}) => {
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const renderMarkers = (map, offers) => {
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

const initMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      // activateFilters();
      setAddress(DEFAULT_COORDINATES);
      activateForm();
    })
    .setView(DEFAULT_COORDINATES, DEFAULT_ZOOM);

  L.tileLayer(MAP_SETTINGS.layer, MAP_SETTINGS.attribution).addTo(map);

  const mainMarker = L.marker(
    DEFAULT_COORDINATES,
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );

  mainMarker.addTo(map);

  renderMarkers(map, similarOffers);

  mainMarker.on('move', ({target}) => {
    const newCoordinates = target.getLatLng();
    setAddress(newCoordinates);
  });

};

export {initMap};
