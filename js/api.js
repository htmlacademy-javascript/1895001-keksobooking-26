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

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobookin',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
