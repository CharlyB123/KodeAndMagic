// Файл setup.js
'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
/* цвета мантии */
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
/* цвета глаз */
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
/* цвета фаребола */
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // шаблон

var inputNameFocus = false; // флаг фокусировки на поле ввода имени

/* svg c магом */
var setupWizard = document.querySelector('.setup-wizard');
/* часть svg c мантией*/
var wizardCoat = setupWizard.querySelector('.wizard-coat');
/* часть svg с глазами */
var wizardEyes  = setupWizard.querySelector('.wizard-eyes');

/* обертка фаербола */
var wizardFireBall = document.querySelector('.setup-fireball-wrap');

/* обертка около мага для выбора нужных инпутов */
var setupWizardAppearance = document.querySelector('.setup-wizard-appearance');

var generateRandomElement = function (array, arrayTwo) {
    var arrayRandomNumber = Math.floor(array.length * Math.random());

    if (arrayTwo) {
      var arrayRandomNumberTwo = Math.floor(arrayTwo.length * Math.random());
      return array[arrayRandomNumber] + ' ' + arrayTwo[arrayRandomNumberTwo];
    }

    return array[arrayRandomNumber]
};

var wizards = [
    {
        name: generateRandomElement(WIZARD_NAMES, WIZARD_SURNAME),
        coatColor: generateRandomElement(WIZARD_COAT_COLOR),
        eyes: generateRandomElement(WIZARD_EYES_COLOR)
    },
    {
        name: generateRandomElement(WIZARD_NAMES, WIZARD_SURNAME),
        coatColor: generateRandomElement(WIZARD_COAT_COLOR),
        eyes: generateRandomElement(WIZARD_EYES_COLOR)
    },
    {
        name: generateRandomElement(WIZARD_NAMES, WIZARD_SURNAME),
        coatColor: generateRandomElement(WIZARD_COAT_COLOR),
        eyes: generateRandomElement(WIZARD_EYES_COLOR)
    },
    {
        name: generateRandomElement(WIZARD_NAMES, WIZARD_SURNAME),
        coatColor: generateRandomElement(WIZARD_COAT_COLOR),
        eyes: generateRandomElement(WIZARD_EYES_COLOR)
    }
];

var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

    return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// userDialog.querySelector('.setup-similar').classList.remove('hidden');

var popupEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !inputNameFocus) {
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
};

setupOpen.addEventListener('click', openUserPopup);
setupClose.addEventListener('click', closeUserPopup);


setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        openUserPopup();
    }
});

setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
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

wizardCoat.addEventListener('click', function (evt) {
    var colorCoat = generateRandomElement(WIZARD_COAT_COLOR);
    wizardCoat.style.fill = colorCoat;
    setupWizardAppearance.getElementsByTagName('input').namedItem('coat-color').value = colorCoat;

});

wizardEyes.addEventListener('click', function () {
    var colorEyes = generateRandomElement(WIZARD_EYES_COLOR);
    wizardEyes.style.fill = colorEyes;
    setupWizardAppearance.getElementsByTagName('input').namedItem('eyes-color').value = colorEyes;
});

wizardFireBall.addEventListener('click', function () {
    var colorFireBall = generateRandomElement(WIZARD_FIREBALL_COLOR);
    wizardFireBall.style.background = colorFireBall;
    wizardFireBall.getElementsByTagName('input').namedItem('fireball-color').value = colorFireBall;
});
