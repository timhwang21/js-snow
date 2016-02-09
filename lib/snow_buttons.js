/////////////////////////////////////////

// controller for wind
var $submitButtonWindSlow = $('#submit-button-wind-slow');
$submitButtonWindSlow.on('click', function () {
  wind -= 1;
  $('.wind').html(wind);
});

var $submitButtonWindFast = $('#submit-button-wind-fast');
$submitButtonWindFast.on('click', function () {
  wind += 1;
  $('.wind').html(wind);
});

// controller for snow amt

var $submitButtonSnowAmtLess = $('#submit-button-snow-amt-less');
$submitButtonSnowAmtLess.on('click', function () {
  snow_amt -= 10;
  $('.snow_amt').html(snow_amt);
});

var $submitButtonSnowAmtMore = $('#submit-button-snow-amt-more');
$submitButtonSnowAmtMore.on('click', function () {
  snow_amt += 10;
  $('.snow_amt').html(snow_amt);
});

// controller for drift

var $submitButtonDriftLess = $('#submit-button-drift-less');
$submitButtonDriftLess.on('click', function () {
  drift /= 1.2;
  $('.drift').html(drift);
});

var $submitButtonDriftMore = $('#submit-button-drift-more');
$submitButtonDriftMore.on('click', function () {
  drift *= 1.2;
  $('.drift').html(drift);
});

/////////////////////////////////////////