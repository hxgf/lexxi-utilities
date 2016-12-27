
module.exports = {

  /* -------- UTILITY FUNCTIONS -------- */

  // combines js objects to create a single new objext
  extend: function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
      for (var prop in source) {
        target[prop] = source[prop];
      }
    });
    return target;
  },

  // returns true if a value is an array
  is_array: function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },


  // returns a date a given number of days from a given date
  future_days: function (theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  },

  // strips dollar sign (future general currency symbols and punctuation) from a given string
  strip_dollars: function (str){
    return str.replace("$","");
  },

  // transform string to uppercase
  uppercase: function (string){
    if (string){
      return string.toUpperCase();
    }else{
      return "";
    }
  },

  // capitalize first character of (every word?) of a given string
  capitalize: function (string){
    if (string){
      return string.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase() });
    }else{
      return "";
    }
  },

  // add commas, i think?
    // prob similar to php's number_format()
  number_format: function (string){
    if (string){
      return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      return "";
    }
  },

  // truncate a given string to a given number of characters
  truncate_string: function (str, length) {
   return str.length > length ? str.substring(0, length - 3) + '...' : str
  },

  // generate url-safe title string from a given text string
  url_title: function (text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')         // replace spaces with -
      .replace(/[^\w\-]+/g, '')     // remove all non-word chars
      .replace(/\-\-+/g, '-')       // replace multiple - with single -
      .replace(/^-+/, '')           // trim from start of text
      .replace(/-+$/, '');          // trim from end of text
  },

  // generate a hash-like alphanumeric token with a given number of characters
  generate_token: function (length){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < length; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  },

  // add http:// if not in string
  url_validate: function (string){
      if (string.indexOf("http://") > -1){
        var o = string;
      }else{
        var o = "http://" + string;
      }
    return o;
  },

  // handle errors
    // future: write to a log or something
  handle_error: function (err){
    console.log(err);
  }



};
