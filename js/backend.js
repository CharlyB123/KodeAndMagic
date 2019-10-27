'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText, 'error');
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения', 'error');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', 'error');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', GET_URL);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response, 'success');
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText, 'error');
        }
      });

      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  }
})();