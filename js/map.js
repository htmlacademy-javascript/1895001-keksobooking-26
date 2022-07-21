import {createOffers} from './data.js';
import {generatePopup} from './generate-popup.js';
import {activateForm, activateFilters} from './form.js';

// const mapCanvas = document.querySelector('#map-canvas');
const address = document.querySelector('#address');

const DEFAULT_COORDINATES = {
  lat: 35.68483,
  lng: 139.75248
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

const createMarkers = (map, offers) => {
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
      activateFilters();
      activateForm();
    })
    .setView(DEFAULT_COORDINATES, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainMarker = L.marker(
    DEFAULT_COORDINATES,
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );

  mainMarker.addTo(map);

  createMarkers(map, similarOffers);

  mainMarker.on('moveend', ({target}) => {
    const {lat, lng} = target.getLatLng();
    address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

};

export {initMap};
