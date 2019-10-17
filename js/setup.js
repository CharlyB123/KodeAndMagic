// Файл setup.js
'use strict';

(function () {

    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // шаблон
    var similarListElement = document.querySelector('.setup').querySelector('.setup-similar-list');
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
            name: generateRandomElement(window.static.WIZARD_NAMES, window.static.WIZARD_SURNAME),
            coatColor: generateRandomElement(window.static.WIZARD_COAT_COLOR),
            eyes: generateRandomElement(window.static.WIZARD_EYES_COLOR)
        },
        {
            name: generateRandomElement(window.static.WIZARD_NAMES, window.static.WIZARD_SURNAME),
            coatColor: generateRandomElement(window.static.WIZARD_COAT_COLOR),
            eyes: generateRandomElement(window.static.WIZARD_EYES_COLOR)
        },
        {
            name: generateRandomElement(window.static.WIZARD_NAMES, window.static.WIZARD_SURNAME),
            coatColor: generateRandomElement(window.static.WIZARD_COAT_COLOR),
            eyes: generateRandomElement(window.static.WIZARD_EYES_COLOR)
        },
        {
            name: generateRandomElement(window.static.WIZARD_NAMES, window.static.WIZARD_SURNAME),
            coatColor: generateRandomElement(window.static.WIZARD_COAT_COLOR),
            eyes: generateRandomElement(window.static.WIZARD_EYES_COLOR)
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

    wizardCoat.addEventListener('click', function (evt) {
        var colorCoat = generateRandomElement(window.static.WIZARD_COAT_COLOR);
        wizardCoat.style.fill = colorCoat;
        setupWizardAppearance.getElementsByTagName('input').namedItem('coat-color').value = colorCoat;

    });

    wizardEyes.addEventListener('click', function () {
        var colorEyes = generateRandomElement(window.static.WIZARD_EYES_COLOR);
        wizardEyes.style.fill = colorEyes;
        setupWizardAppearance.getElementsByTagName('input').namedItem('eyes-color').value = colorEyes;
    });

    wizardFireBall.addEventListener('click', function () {
        var colorFireBall = generateRandomElement(window.static.WIZARD_FIREBALL_COLOR);
        wizardFireBall.style.background = colorFireBall;
        wizardFireBall.getElementsByTagName('input').namedItem('fireball-color').value = colorFireBall;
    });

})();
