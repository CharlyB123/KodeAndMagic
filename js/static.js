(function () {
  window.static = {
    WIZARD_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    WIZARD_SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    /* цвета мантии */
    WIZARD_COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    /* цвета глаз */
    WIZARD_EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
    /* цвета фаребола */
    WIZARD_FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
  };

  var fireballSize = 22;
  var wizardSpeed = 3;
  var wizardWidth = 70;
  var getWizardY = function (height) {
    return height * (2/3)
  };
  var getWizardHeight = function (width) {
    return 1.337 * width
  };
  var getFireballSpeed = function (movingLeft) {
    return movingLeft ? 2 : 5;
  };
})();
