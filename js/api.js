const URL = 'https://26.javascript.pages.academy/keksobooking';

const Errors = {
  GET: 'Ошибка при загрузке других предложений. Попробуйте ещё раз',
  SEND: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = (onSuccess, onFail) => fetch(
  `${URL}/data`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    onFail(Errors.GET);
  })
  .then((offers) => {
    onSuccess(offers);
  })
  .catch(() => {
    onFail(Errors.GET);
  });

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(Errors.SEND);
      }
    })
    .catch(() => {
      onFail(Errors.SEND);
    });
};

export {getData, sendData};
