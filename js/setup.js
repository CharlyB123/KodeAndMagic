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

    var wizardRating;

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

    var loadSuccess = function (data) {
        var fragment = document.createDocumentFragment();
        wizardRating = data.map(function (item) {
            item.rating = 0;
            if (item.colorFireball === wizardFireBall.getElementsByTagName('input').namedItem('fireball-color').value) {
                item.rating +=2;
            }
            if (item.colorEyes === setupWizardAppearance.getElementsByTagName('input').namedItem('eyes-color').value) {
                item.rating +=1;
            }
            if (item.colorCoat === setupWizardAppearance.getElementsByTagName('input').namedItem('coat-color').value) {
                item.rating +=4;
            }
            return item;
        }).sort(function (first, second) {
            if (first.rating < second.rating) {
                return 1
            } else if (first.rating > second.rating) {
                return  -1
            } else return 0;
        });
        for (var i = 0; i < 4; i++) {
            fragment.appendChild(renderWizard(wizardRating[i]));
        }
        similarListElement.appendChild(fragment);
    };

    window.backend.load(loadSuccess, window.help.popup);

    var renderWizard = function (wizard) {
        var wizardElement = similarWizardTemplate.cloneNode(true);

        wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
        wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
        wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

        return wizardElement;
    };

    /* for clear wizards block */
    var clearWizardsList = function () {
        var similarListElementChilds = similarListElement.querySelectorAll('div');
        for (var i = 0; i < similarListElementChilds.length; i++) {
            similarListElementChilds[i].remove();
        }
    };

    /* for recalculation Rating And Rerender wizards */
    var recalculationRatingAndRerender = function () {
        var fragment = document.createDocumentFragment();
        wizardRating = wizardRating.map(function (item) {
            item.rating = 0;
            if (item.colorFireball === wizardFireBall.getElementsByTagName('input').namedItem('fireball-color').value) {
                item.rating +=2;
            }
            if (item.colorEyes === setupWizardAppearance.getElementsByTagName('input').namedItem('eyes-color').value) {
                item.rating +=1;
            }
            if (item.colorCoat === setupWizardAppearance.getElementsByTagName('input').namedItem('coat-color').value) {
                item.rating +=4;
            }
            return item;
        }).sort(function (first, second) {
            if (first.rating < second.rating) {
                return 1
            } else if (first.rating > second.rating) {
                return  -1
            } else return 0;
        });

        clearTimeout(timerRender);
        var timerRender = setTimeout(function () {
            clearWizardsList();
            for (var i = 0; i < 4; i++) {
                fragment.appendChild(renderWizard(wizardRating[i]));
            }
            similarListElement.appendChild(fragment);
        }, 10000);
    };

    wizardCoat.addEventListener('click', function () {
        var colorCoat = generateRandomElement(window.static.WIZARD_COAT_COLOR);
        wizardCoat.style.fill = colorCoat;
        setupWizardAppearance.getElementsByTagName('input').namedItem('coat-color').value = colorCoat;
        recalculationRatingAndRerender();
    });

    wizardEyes.addEventListener('click', function () {
        var colorEyes = generateRandomElement(window.static.WIZARD_EYES_COLOR);
        wizardEyes.style.fill = colorEyes;
        setupWizardAppearance.getElementsByTagName('input').namedItem('eyes-color').value = colorEyes;
        recalculationRatingAndRerender();
    });

    wizardFireBall.addEventListener('click', function () {
        var colorFireBall = generateRandomElement(window.static.WIZARD_FIREBALL_COLOR);
        wizardFireBall.style.background = colorFireBall;
        wizardFireBall.getElementsByTagName('input').namedItem('fireball-color').value = colorFireBall;
        recalculationRatingAndRerender();
    });
})();
