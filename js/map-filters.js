import {debounce} from './util.js';

const filters = document.querySelector('.map__filters');

const DEFAULT_VALUE = 'any';

const MinPriceValues = {
  MIDDLE: 10000,
  HIGH: 50000,
};

let typeFilter;
let roomsFilter;
let guestsFilter;
let priceFilter;
let featuresFilter;

const filterByType = ({offer}) => typeFilter.value === DEFAULT_VALUE
  || offer.type === typeFilter.value;

const filterByRooms = ({offer}) => roomsFilter.value === DEFAULT_VALUE
  || offer.rooms.toString() === roomsFilter.value;

const filterByGuests = ({offer}) => guestsFilter.value === DEFAULT_VALUE
  || offer.guests.toString() === guestsFilter.value;

const filterByPrice = ({offer}) => {
  switch(priceFilter.value) {
    case 'low':
      return offer.price < MinPriceValues.MIDDLE;
    case 'middle':
      return offer.price >= MinPriceValues.MIDDLE
        && offer.price < MinPriceValues.HIGH;
    case 'high':
      return offer.price >= MinPriceValues.HIGH;
    default:
      return DEFAULT_VALUE;
  }
};

const filterByFeatures = ({offer}) => {
  const checkedFilters = featuresFilter.querySelectorAll('input:checked');

  if (!checkedFilters) {
    return true;
  }

  if (offer.features){
    return Array.from(checkedFilters).every((feature) => offer.features.includes(feature.value));
  }

  return false;
};

const filterOffers = (element) =>
  filterByType(element)
  && filterByRooms(element)
  && filterByGuests(element)
  && filterByPrice(element)
  && filterByFeatures(element);

const initFilters = (offers, cb) => {
  typeFilter = filters.querySelector('#housing-type');
  roomsFilter = filters.querySelector('#housing-rooms');
  guestsFilter = filters.querySelector('#housing-rooms');
  priceFilter = filters.querySelector('#housing-price');
  featuresFilter = filters.querySelector('#housing-features');

  const onFiltersChange = (element) => () => {
    const filteredOffers = element.filter(filterOffers);

    cb(filteredOffers);
  };

  filters.addEventListener('change', debounce(onFiltersChange(offers)));
};

const resetMapFilters = () => {
  filters.reset();
};

export {initFilters, resetMapFilters};
