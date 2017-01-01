
module.exports = function(app){
  var module = {};

  // returns a date a given number of days from a given date
  module.future_days = function (theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  };

  // strip any character that isn't a dot or a digit
    // good for decimal-based currency. otherwise, consider something like globalizejs
  module.currency_strip = function (str){
    return Number(str.replace(/[^0-9\.]+/g,"")); // Remove all non dot / digits
  };

  // add commas -- similar to php's number_format()
  module.number_format = function (string){
    if (string){
      return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      return "";
    }
  };

  // easily generate a hash-like alphanumeric token with a given number of characters
  module.token_generate = function (length){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < length; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  };

  // add http(s):// if not in string
  module.url_validate = function (string){
      if (string.indexOf("http://") > -1 || string.indexOf("https://")){
        var o = string;
      }else{
        var o = "http://" + string;
      }
    return o;
  };

  // handle application errors
    // fixit write this to a log or something idk
  module.application_error = function (err){
    console.log(err);
  };


  module.url_encode = function(o){
    return encodeURIComponent(o);
  };

  module.url_decode = function(o){
    return decodeURIComponent(o);
  };





  module.email_send = function($, params){
    var mail_options = {
      from: params.from,
      subject: params.subject,
      to: params.to
    };
    if (params.cc){
      mail_options.cc = params.cc;
    }
    if (params.bcc){
      mail_options.bcc = params.bcc;
    }
    if (params.reply_to){
      if ($.mail_mailgun){
        mail_options['h:Reply-To'] = params.reply_to;
      }else{
        mail_options.replyTo = params.reply_to;
      }
    }
    if (params.html){
      mail_options.html = params.message;
    }else{
      mail_options.text = params.message;
    }
    if (params.template){
      mail_options.template = params.template;
      mail_options.context = params.data;
    }
    $.mail_transport.sendMail(mail_options, function (err, info) {
      if (err) {
        $.lexxi.application_error({
          type: 'email_send',
          err: err
        });
        return next(err);
      }
      if (info){
        console.log(info);
      }
    });
  	return true;
  };



















  module.unserialize = function(data) { // this is from php.js
    var that = this,
      utf8Overhead = function(chr) {
        var code = chr.charCodeAt(0);
        if (  code < 0x0080
              || 0x00A0 <= code && code <= 0x00FF
              || [338,339,352,353,376,402,8211,8212,8216,8217,8218,8220,8221,8222,8224,8225,8226,8230,8240,8364,8482].indexOf(code)!=-1)
        {
          return 0;
        }
        if (code < 0x0800) {
          return 1;
        }
        return 2;
      };
    error = function(type, msg, filename, line) {
      throw new that.window[type](msg, filename, line);
    };
    read_until = function(data, offset, stopchr) {
      var i = 2,
        buf = [],
        chr = data.slice(offset, offset + 1);
      while (chr != stopchr) {
        if ((i + offset) > data.length) {
          error('Error', 'Invalid');
        }
        buf.push(chr);
        chr = data.slice(offset + (i - 1), offset + i);
        i += 1;
      }
      return [buf.length, buf.join('')];
    };
    read_chrs = function(data, offset, length) {
      var i, chr, buf;
      buf = [];
      for (i = 0; i < length; i++) {
        chr = data.slice(offset + (i - 1), offset + i);
        buf.push(chr);
        length -= utf8Overhead(chr);
      }
      return [buf.length, buf.join('')];
    };
    _unserialize = function(data, offset) {
      var dtype, dataoffset, keyandchrs, keys, contig,
        length, array, readdata, readData, ccount,
        stringlength, i, key, kprops, kchrs, vprops,
        vchrs, value, chrs = 0,
        typeconvert = function(x) {
          return x;
        };
      if (!offset) {
        offset = 0;
      }
      dtype = (data.slice(offset, offset + 1))
        .toLowerCase();
      dataoffset = offset + 2;
      switch (dtype) {
      case 'i':
        typeconvert = function(x) {
          return parseInt(x, 10);
        };
        readData = read_until(data, dataoffset, ';');
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case 'b':
        typeconvert = function(x) {
          return parseInt(x, 10) !== 0;
        };
        readData = read_until(data, dataoffset, ';');
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case 'd':
        typeconvert = function(x) {
          return parseFloat(x);
        };
        readData = read_until(data, dataoffset, ';');
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case 'n':
        readdata = null;
        break;
      case 's':
        ccount = read_until(data, dataoffset, ':');
        chrs = ccount[0];
        stringlength = ccount[1];
        dataoffset += chrs + 2;
        readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
        chrs = readData[0];
        readdata = readData[1];
        dataoffset += chrs + 2;
        if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
          error('SyntaxError', 'String length mismatch');
        }
        break;
      case 'a':
        readdata = {};
        keyandchrs = read_until(data, dataoffset, ':');
        chrs = keyandchrs[0];
        keys = keyandchrs[1];
        dataoffset += chrs + 2;
        length = parseInt(keys, 10);
        contig = true;
        for (i = 0; i < length; i++) {
          kprops = _unserialize(data, dataoffset);
          kchrs = kprops[1];
          key = kprops[2];
          dataoffset += kchrs;
          vprops = _unserialize(data, dataoffset);
          vchrs = vprops[1];
          value = vprops[2];
          dataoffset += vchrs;
          if (key !== i)
            contig = false;
          readdata[key] = value;
        }
        if (contig) {
          array = new Array(length);
          for (i = 0; i < length; i++)
            array[i] = readdata[i];
          readdata = array;
        }
        dataoffset += 1;
        break;
      default:
        error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
        break;
      }
      return [dtype, dataoffset - offset, typeconvert(readdata)];
    };
    return _unserialize((data + ''), 0)[2];
  };




  return module;

};
