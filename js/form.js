const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  for (const element of adFormElements) {
    element.disabled = true;
  }

  for (const element of mapFiltersElements) {
    element.disabled = true;
  }
};

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  for (const element of adFormElements) {
    element.disabled = false;
  }

  for (const element of mapFiltersElements) {
    element.disabled = false;
  }
};

export {disableForm, enableForm};
