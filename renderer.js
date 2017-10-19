window.$ = window.jQuery = require('jquery');
window.onload = function () {
    window.alert('hello');

    document.getElementById('pg-store404').innerHTML = 'hi';
};
function doCap() {
    // let sitekey = 'flsdj';
    // $('#pg-store404').innerHTML = '<div id="recaptcha" class="g-recaptcha" data-sitekey="' + sitekey + '" data-callback="sub"></div>';
    // $.getScript("https://www.google.com/recaptcha/api.js", function () {});
};