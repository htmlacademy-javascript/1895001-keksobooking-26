const getData = (onSuccess, onFail) => fetch(
  'https://26.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    onFail('Ошибка при загрузке других предложений. Попробуйте ещё раз');
  })
  .then((offers) => {
    onSuccess(offers);
  })
  .catch(() => {
    onFail('Ошибка при загрузке других предложений. Попробуйте ещё раз');
  });

export {getData};
