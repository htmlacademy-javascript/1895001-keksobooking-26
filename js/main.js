// Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomInteger(min, max) { // https://developer.mozilla.org/
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
}

getRandomInteger(4, 15);
