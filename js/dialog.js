'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');
  var dialogHandler = userDialog.querySelector('.upload');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');

  var userNameInput = userDialog.querySelector('.setup-user-name');
  var inputNameFocus = false; // флаг фокусировки на поле ввода имени
  userDialog.querySelector('.setup-similar').classList.remove('hidden');


  setupOpen.addEventListener('click', function () {
    userDialog.classList.remove('hidden');
  });

  setupClose.addEventListener('click', function () {
    userDialog.classList.add('hidden');
  });

  setupForm.addEventListener('submit', function (evt) {
    userDialog.classList.add('hidden');
  });

  var resetCoordsDialog = function () {
    userDialog.style.top = '';
    userDialog.style.left = '';
  };

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var preventClickDefault = function (evt) {
          evt.preventDefault();
          dialogHandler.removeEventListener('click', preventClickDefault);
        };
        dialogHandler.addEventListener('click', preventClickDefault);
      }
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  var popupEscHandler = function (evt) {
    if (evt.keyCode === window.static.ESC_KEYCODE && !inputNameFocus) {
      closeUserPopup();
    }
  };

  var openUserPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', popupEscHandler);

    /* установка флагов фокуса на инпут, скорее всего есть более оптимальное решение */
    userNameInput.addEventListener('focus', function () {
      inputNameFocus = true;
    });
    userNameInput.addEventListener('blur', function () {
      inputNameFocus = false;
    });
  };

  var closeUserPopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', popupEscHandler);
    resetCoordsDialog();
  };

  var saveUserPopup = function (data, theme) {
    window.help.popup('Успех!', theme);
  };

  setupOpen.addEventListener('click', openUserPopup);
  setupClose.addEventListener('click', closeUserPopup);


  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.static.ENTER_KEYCODE) {
      openUserPopup();
    }
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.static.ENTER_KEYCODE) {
      closeUserPopup();
    }
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Нужно больше симолов! минимум 2-а символа.')
    }
    else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Слишком много символов! Должно быть не больше 25-ти!')
    }
    else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('У каждого волшебника должно быть имя!')
    } else {
      userNameInput.setCustomValidity(' ');
    }
  });

  setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupForm), saveUserPopup, window.help.popup);
    evt.preventDefault();
  })
})();
