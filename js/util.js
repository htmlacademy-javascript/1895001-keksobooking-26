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
const getRandomArrayElement = (elements, count) => elements[getRandomPositiveInteger(0, count)];

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement};
