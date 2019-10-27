'use strict';

(function () {
  window.help = {
    popup: function (msg, theme) {
      var errorWindow = document.createElement('div');
      errorWindow.classList.add('help_popup');
      switch (theme) {
        case 'error': {
          errorWindow.classList.add('__danger');
          break;
        }
        case 'success': {
          errorWindow.classList.add('__success');
          break;
        }
        default: {
          errorWindow.classList.add('__default');
          break;
        }
      }
      errorWindow.textContent = msg;
      document.body.insertAdjacentElement('afterbegin', errorWindow)

      setTimeout(function () {
        errorWindow.remove()
      }, 2000)
    }
  }
})();
