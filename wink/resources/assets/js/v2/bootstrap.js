window._ = require('lodash');
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('moment');
window.swal = require('sweetalert');
window.Vue = require('vue');
window.axios = require('axios');
window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken, 
    'X-Requested-With': 'XMLHttpRequest'
};