const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;

const toggleElement = (elementsList, value) => {
  for (const element of elementsList) {
    element.disabled = value;
  }
};

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  toggleElement(adFormElements, true);
  toggleElement(mapFiltersElements, true);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');

  toggleElement(adFormElements, false);
};

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');

  toggleElement(mapFiltersElements, false);
};

export {disableForm, activateForm, activateFilters};
