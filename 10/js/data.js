import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement} from './util.js';

const ApartmentLocation = {
  LAT_LOWER: 35.65,
  LAT_UPPER: 35.7,
  LNG_LOWER: 139.7,
  LNG_UPPER: 139.8
};

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECK_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const OFFERS_COUNT = 10;

// Функция, возвращающая объект с объявлением неподалёку
const createOffer = (count) => {
  const lat = getRandomPositiveFloat(ApartmentLocation.LAT_LOWER, ApartmentLocation.LAT_UPPER, 5);
  const lng = getRandomPositiveFloat(ApartmentLocation.LNG_LOWER, ApartmentLocation.LNG_UPPER, 5);

  return {
    author: {
      avatar: `img/avatars/user${String(count).padStart(2, '0')}.png`
    },
    offer: {
      title: 'Апартаменты в самом центре Токио',
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(1000, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 10),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(CHECK_TIME),
      checkout: getRandomArrayElement(CHECK_TIME),
      features: FEATURES.slice(0, getRandomPositiveInteger(1, FEATURES.length)),
      description: 'Уютные апартаменты со всем необходимым',
      photos: PHOTOS.slice(0, getRandomPositiveInteger(1, PHOTOS.length))
    },
    location: {
      lat,
      lng
    }
  };
};

// Создание массива с объявлениями
const createOffers = () => Array.from({length: OFFERS_COUNT}, (_, index) => createOffer(index + 1));

export {createOffers};
