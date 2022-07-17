const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text'
}, false);

const guestsCapacityMap = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const validateCapacity = () => guestsCapacityMap[rooms.value].includes(capacity.value);

const getCapacityErrorMessage = () => {
  if (rooms.value === '100') {
    return 'Не для гостей';
  }

  return capacity.value === '0' ? 'Это жилье для гостей' : 'Мало комнат';
};

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

const initValidation = () => {
  pristine.addValidator(capacity, validateCapacity, getCapacityErrorMessage);

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {disableForm, activateForm, activateFilters, initValidation};
