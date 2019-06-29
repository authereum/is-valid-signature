;(function(root) {

  function isValidEmail(v) {
    if (!v) return false;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(v);
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = isValidEmail;
    }
    exports.isValidEmail = isValidEmail;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return isValidEmail;
    });
  } else {
    root.isValidEmail = isValidEmail;
  }

})(this);
