'use strict';

var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 400;
var CLOUD_X = 100;
var CLOUD_Y = 50;
var GAP = 50;
var FONT_GAP = 15;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var MAX_HEIGHT_BAR = 150;
var HEIGHT_TITLE_TEXT = (TEXT_HEIGHT + FONT_GAP) * 2;

var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(CLOUD_WIDTH + 50, y + 40, CLOUD_WIDTH + 20, y + 50, CLOUD_WIDTH, y);
    ctx.bezierCurveTo(CLOUD_WIDTH + 50, y + 40, CLOUD_WIDTH + 20, y + 50, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.bezierCurveTo(x - 50, CLOUD_HEIGHT + 50, x - 60, CLOUD_HEIGHT, x, CLOUD_HEIGHT);
    ctx.bezierCurveTo(x - 50, y + 50, x - 60, y, x, y);
    ctx.fill();
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
          maxElement = arr[i]
      }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, 120, 20, 'rgba(0, 0, 0, 0.3)');
    renderCloud(ctx, 100, 0, '#fff');

    ctx.fillStyle = '#000';

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
        var currentLineHeight = Math.floor((MAX_HEIGHT_BAR * times[i]) / maxTime);
        var randomColorBar = Math.floor(Math.random() * 255);

        if (names[i] === 'Вы') {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = 'rgba(0, ' + randomColorBar +', 255, 1)';
        }
        ctx.fillRect(CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y + (MAX_HEIGHT_BAR - currentLineHeight) + HEIGHT_TITLE_TEXT, BAR_WIDTH, currentLineHeight);
        ctx.fillStyle = '#000';
        ctx.fillText(names[i], CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y + MAX_HEIGHT_BAR + FONT_GAP + HEIGHT_TITLE_TEXT);
        ctx.fillText(currentLineHeight, CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y - FONT_GAP + HEIGHT_TITLE_TEXT);
    }

    ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y);
    ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + TEXT_HEIGHT);
};
