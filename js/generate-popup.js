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

const generatePopup = (element) => {
  const offerElement = offerCardTemplate.cloneNode(true);
  const featuresContainer = offerElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const photosContainer = offerElement.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo');

  if (!element.offer.features) {
    featuresContainer.classList.add('hidden');
  } else {
    featuresList.forEach((featureListItem) => {
      const isNecessary = element.offer.features.some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));

      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  }

  if (!element.offer.photos) {
    photosContainer.classList.add('hidden');
  } else {
    element.offer.photos.forEach((picture) => {
      const photoTemplate = photoItem.cloneNode(true);
      photoTemplate.src = picture;
      photosContainer.appendChild(photoTemplate);
    });
  }

  photoItem.remove();

  offerElement.querySelector('.popup__avatar').src = element.author.avatar;
  offerElement.querySelector('.popup__title').textContent = element.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = element.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = offerTypes[element.offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  offerElement.querySelector('.popup__description').textContent = element.offer.description ? element.offer.description : offerElement.querySelector('.popup__description').classList.add('hidden');

  return offerElement;
};

export {generatePopup};
