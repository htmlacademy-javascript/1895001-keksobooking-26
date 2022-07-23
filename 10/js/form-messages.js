import {isEscapeKey} from './util.js';

const successSubmitMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorSubmitMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const showSubmitSuccessMessage = () => {
  document.body.append(successSubmitMessage);

  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  successSubmitMessage.addEventListener('click', onSuccessMessageClick);
};

const closeSubmitSuccessMessage = () => {
  successSubmitMessage.remove();

  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  successSubmitMessage.removeEventListener('click', onSuccessMessageClick);
};

function onSuccessMessageEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSubmitSuccessMessage();
  }
}

function onSuccessMessageClick () {
  closeSubmitSuccessMessage();
}

const showSubmitErrorMessage = () => {
  document.body.append(errorSubmitMessage);

  document.addEventListener('keydown', onErrorMessageEscKeydown);
  errorSubmitMessage.addEventListener('click', onErrorMessageClick);
};

const closeSubmitErrorMessage = () => {
  errorSubmitMessage.remove();

  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  errorSubmitMessage.removeEventListener('click', onErrorMessageClick);
};

function onErrorMessageEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeSubmitErrorMessage();
  }
}

function onErrorMessageClick () {
  closeSubmitErrorMessage();
}

export {showSubmitErrorMessage, showSubmitSuccessMessage};
