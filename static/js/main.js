$(document).ready(function() {
    var _csrfCookie = Cookies.get('csrf-token');
    $("#submit-btn").before('<input type="hidden" name="_csrf" value="'+_csrfCookie+'">');
});