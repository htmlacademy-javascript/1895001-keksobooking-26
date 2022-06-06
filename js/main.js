// Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomInteger(min, max) { // https://developer.mozilla.org/ Math.random()
  if (min >= 0 && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (min > max) {
    return 'Минимальное значение не может быть больше максимального.';
  }
  if (min === max) {
    return min;
  }
  if (min < 0 || max < 0) {
    return 'Значения могут быть только положительными либо равными нулю.';
  }
  return 'Нет ни одного подходящего числа.';
}

getRandomInteger(4, 15);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
function getTemporaryCoordinate(min, max, precision) {
  if (min >= 0 && min < max && precision >= 0) {
    return Number((Math.random() * (max - min + 1)) + min).toFixed(precision);
  }
  if (min > max) {
    return 'Минимальное значение не может быть больше максимального.';
  }
  if (min === max) {
    return min;
  }
  if (min < 0 || max < 0) {
    return 'Значения могут быть только положительными либо равными нулю.';
  }
  return 'Нет ни одного подходящего числа.';
}

getTemporaryCoordinate(1.15, 5.99, 2);
