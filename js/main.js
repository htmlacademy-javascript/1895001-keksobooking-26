// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => { // https://developer.mozilla.org/ Math.random()
  if (min > max) {
    throw new RangeError ('Минимальное значение не может быть больше максимального.');
  }

  if (min === max) {
    return min;
  }

  if (min < 0 || max < 0) {
    throw new RangeError ('Значения могут быть только положительными либо равными нулю.');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger(13, 15);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFloat = (min, max, precision = 5) => {
  if (min > max) {
    throw new RangeError ('Минимальное значение не может быть больше максимального.');
  }

  if (min === max) {
    return min;
  }

  if (min < 0 || max < 0) {
    throw new RangeError ('Значения могут быть только положительными либо равными нулю.');
  }

  return Number((Math.random() * (max - min)) + min).toFixed(precision);
};

getRandomFloat(5.15, 5.99);
