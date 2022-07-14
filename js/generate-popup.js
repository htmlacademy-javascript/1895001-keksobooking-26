const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const offerCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderFeatures = (block, features) => {
  block.forEach((featureListItem) => {
    const isNecessary = features.some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));

    if (!isNecessary) {
      featureListItem.remove();
    }
  });
};

const renderPhotos = (block, item, photos) => {
  photos.forEach((picture) => {
    const photoTemplate = item.cloneNode(true);
    photoTemplate.src = picture;
    block.appendChild(photoTemplate);
  });
};

const generatePopup = ({author, offer}) => {
  const offerElement = offerCardTemplate.cloneNode(true);
  const featuresContainer = offerElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const photosContainer = offerElement.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo');
  const description = offerElement.querySelector('.popup__description');

  if (offer.features.length > 0) {
    renderFeatures(featuresList, offer.features);
  } else {
    featuresList.classList.add('hidden');
  }

  if (offer.photos) {
    renderPhotos(photosContainer, photoItem, offer.photos);
  } else {
    photosContainer.classList.add('hidden');
  }

  photoItem.remove();

  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.classList.add('hidden');
  }

  offerElement.querySelector('.popup__avatar').src = author.avatar;
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  offerElement.querySelector('.popup__type').textContent = offerTypes[offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  return offerElement;
};

export {generatePopup};
