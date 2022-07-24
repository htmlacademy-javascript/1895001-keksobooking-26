const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const avatarDefault = avatarPreview.src;
const photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

const onAvatarChange = () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};

const onPhotoChange = () => {
  const file = photoFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const photo = document.createElement('img');
    photo.style.width = '70px';
    photo.style.height = '70px';
    photo.src = URL.createObjectURL(file);
    photoPreview.appendChild(photo);
  }
};

const initMediaUpload = () => {
  avatarFileChooser.addEventListener('change', onAvatarChange);
  photoFileChooser.addEventListener('change', onPhotoChange);
};

const resetMedia = () => {
  avatarPreview.src = avatarDefault;
  photoPreview.innerHTML = '';
};

export {initMediaUpload, resetMedia};
