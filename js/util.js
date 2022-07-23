const ALERT_SHOW_TIME = 5000;

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  if (lower > upper) {
    throw new RangeError ('Минимальное значение не может быть больше максимального.');
  }

  if (lower === upper) {
    return lower;
  }

  if (lower < 0 || upper < 0) {
    throw new RangeError ('Значения могут быть только положительными либо равными нулю.');
  }

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomPositiveFloat = (a, b, digits = 5) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  if (lower > upper) {
    throw new RangeError ('Минимальное значение не может быть больше максимального.');
  }

  if (lower === upper) {
    return lower;
  }

  if (lower < 0 || upper < 0) {
    throw new RangeError ('Значения могут быть только положительными либо равными нулю.');
  }

  return Number((Math.random() * (upper - lower)) + lower).toFixed(digits);
};

// Функция, возвращающая случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getMultipleRandom = (arr, num) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getMultipleRandom,
  showAlert,
  isEscapeKey
};
