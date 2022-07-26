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
  const offerCard = offerCardTemplate.cloneNode(true);
  const featuresContainer = offerCard.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const photosContainer = offerCard.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo');
  const description = offerCard.querySelector('.popup__description');

  if (offer.features) {
    renderFeatures(featuresList, offer.features);
  } else {
    featuresContainer.classList.add('hidden');
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

  offerCard.querySelector('.popup__avatar').src = author.avatar;
  offerCard.querySelector('.popup__title').textContent = offer.title;
  offerCard.querySelector('.popup__text--address').textContent = offer.address;
  offerCard.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  offerCard.querySelector('.popup__type').textContent = offerTypes[offer.type];
  offerCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  return offerCard;
};

export {generatePopup};
