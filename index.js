
module.exports = function(app){

  var module = {};

  /* -------- UTILITY FUNCTIONS -------- */

  // combines js objects to create a single new objext
  module.extend = function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
      for (var prop in source) {
        target[prop] = source[prop];
      }
    });
    return target;
  };

  // returns true if a value is an array
  module.is_array = function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  };


  // returns a date a given number of days from a given date
  module.future_days = function (theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  };

  // strips dollar sign (future general currency symbols and punctuation) from a given string
  module.strip_dollars = function (str){
    return str.replace("$","");
  };

  // transform string to uppercase
  module.uppercase = function (string){
    if (string){
      return string.toUpperCase();
    }else{
      return "";
    }
  };

  // capitalize first character of (every word?) of a given string
  module.capitalize = function (string){
    if (string){
      return string.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase() });
    }else{
      return "";
    }
  };

  // add commas, i think?
    // prob similar to php's number_format()
  module.number_format = function (string){
    if (string){
      return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      return "";
    }
  };

  // truncate a given string to a given number of characters
  module.truncate_string = function (str, length) {
   return str.length > length ? str.substring(0, length - 3) + '...' : str
  };

  // generate url-safe title string from a given text string
  module.url_title = function (text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')         // replace spaces with -
      .replace(/[^\w\-]+/g, '')     // remove all non-word chars
      .replace(/\-\-+/g, '-')       // replace multiple - with single -
      .replace(/^-+/, '')           // trim from start of text
      .replace(/-+$/, '');          // trim from end of text
  };

  // generate a hash-like alphanumeric token with a given number of characters
  module.generate_token = function (length){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < length; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  };

  // add http:// if not in string
  module.url_validate = function (string){
      if (string.indexOf("http://") > -1){
        var o = string;
      }else{
        var o = "http://" + string;
      }
    return o;
  };

  // handle errors
    // future: write to a log in production mode or something
  module.handle_error = function (err){
    console.log(err);
  };



















// ---------------- from previous projects, need to be updated (if we need them) -------

// fixit stopped here
  module.email_send = function($, params){

// console.log('what up tho');
console.log(params);
console.log($);

    // if ($.config.mailgun){
    //
  	// 	var prefs = {
  	// 		from: params.from_name + ' <'+params.from_email+'>',
  	// 		subject: params.subject
  	// 	};
    //
  	// 	if (params.to_object){
  	// 		var to = [];
  	// 		var cc = [];
  	// 		var bcc = [];
  	// 		$._.forEach(params.to_object, function(dd) {
  	// 			if (dd.type == 'to'){
  	// 				if (dd.name){
  	// 					to.push(dd.name+' <'+dd.email+'>');
  	// 				}else{
  	// 					to.push(dd.email);
  	// 				}
  	// 			}
    //
  	// 			if (dd.type == 'cc'){
  	// 				if (dd.name){
  	// 					cc.push(dd.name+' <'+dd.email+'>');
  	// 				}else{
  	// 					cc.push(dd.email);
  	// 				}
  	// 			}
    //
  	// 			if (dd.type == 'bcc'){
  	// 				if (dd.name){
  	// 					bcc.push(dd.name+' <'+dd.email+'>');
  	// 				}else{
  	// 					bcc.push(dd.email);
  	// 				}
  	// 			}
  	// 		});
    //
  	// 		if (!$._.isEmpty(to)){
  	// 			prefs.to = to.toString();
  	// 		}
  	// 		if (!$._.isEmpty(cc)){
  	// 			prefs.cc = cc.toString();
  	// 		}
  	// 		if (!$._.isEmpty(bcc)){
  	// 			prefs.bcc = bcc.toString();
  	// 		}
    //
  	// 	}else{
  	// 		if (params.to_list){
  	// 			prefs.to = params.to_list.toString();
  	// 		}else{
  	// 			if (params.to){
  	// 				prefs.to = params.to;
  	// 			}
  	// 		}
  	// 		if (params.cc){
  	// 			prefs.cc = params.cc;
  	// 		}
  	// 		if (params.bcc){
  	// 			prefs.bcc = params.bcc;
  	// 		}
  	// 	}
    //
  	// 	if (params.html){
  	// 		prefs.html = params.message;
  	// 	}else{
  	// 		prefs.text = params.message;
  	// 	}
    //
  	// 	var mailgun_client = new mailgun({apiKey: $.config.mailgun.key, domain: $.config.mailgun.domain});
    //
    //
  	// 	mailgun_client.messages().send(prefs, function (err, body) {
    //
  	// 			if (err){
  	// 				return $.lexxi.handle_error(err);
  	// 			}else{
  	// 				// fixit send success;
  	// 				return true; // ?? wat
  	// 			}
  	// 	});
  	// }
    //
    //
  	// else{
    //
  	// 	// handle other mail
    //
  	// }


  	return true;

  };






  module.seo_date_calendar = function(date_start, date_end){
    var start = new Date(date_start);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date_format = months[start.getMonth()] +' '+ start.getDate() +', '+ start.getFullYear();
    if (date_end && date_end !== date_start){
      var end = new Date(date_end);
      if (start.getFullYear() === end.getFullYear()){
        if (start.getMonth() === end.getMonth()){
          // 2 dates
          var date_format = months[start.getMonth()] +' '+ start.getDate() +'-'+end.getDate()+', '+ end.getFullYear();
        }else{
          // 2 dates/months
          var date_format = months[start.getMonth()] +' '+ start.getDate() +' - '+months[end.getMonth()]+' '+ end.getDate()+', '+ start.getFullYear();
        }
      }else{
        // 2 dates/months/years
        var date_format = months[start.getMonth()] +' '+ start.getDate() +', '+ start.getFullYear() + ' - ' + months[end.getMonth()] +' '+ end.getDate() +', '+ end.getFullYear();
      }
    }
    return date_format;
  };


  // lol
  // maybe abstract the date stuff to use for other seo date wranglin stuff or whatever?
  module.seo_title_calendar = function(title, city, state, date_start, date_end){
    // "event title, city, state - aug 27, 2014"
    var o = title + ", " + city + ", " + state + ", " + seo_date_calendar(date_start, date_end);
    return o;
  };



  module.seo_slug_calendar = function(title, date_start){
    // 11-20-2015-seo-title-like-this
    var date = new Date(date_start);
    var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    var date_format = months[date.getMonth()] +'-'+ date.getDate() +'-'+ date.getFullYear();
    var o = date_format + '-' + $.lexxi.url_title(title);
    return o;
  };




  module.in_array = function(haystack, needle){
  	var o = false;
  	if (haystack.indexOf(''+needle) > -1){
  		o = true;
  	}
  	return o;
  };





  module.resize_s3 = function(req, res, models, $, file_type, callback){

    var ext = path.extname(req.body.filename);
    var mimetype = mime.lookup(path.extname(req.body.filename));

    var filename_original = req.body.filename;
    var filename_new = $.lexxi.url_title(filename_original.substr(0, filename_original.lastIndexOf('.')).toLowerCase());

  	var src = $.__base + 'app/uploads/temp-' + filename_new + ext;

    var site_code = $.config.site_code;
    var file_id = $.file_id;

    $.q.fcall(function(){

  		gm(src)
  			.options({imageMagick: true})
  			.resize(250, "250^")
        .gravity("Center")
  			.crop(250, 250)
  			.extent(250, 250)
  			.quality(90)
  			.write($.__base + 'app/uploads/'+file_type+'-' + file_id +'-s'+ ext, function (err) {
          if (err) return $.lexxi.handle_error(err);
  		    s3.putFile(
  		      $.__base + 'app/uploads/'+file_type+'-' + file_id +'-s'+ ext,
  		      '/'+file_type+'-' + file_id +'-s'+ ext,
  		      { 'x-amz-acl': 'public-read', 'Content-Type': mimetype }, function(err, res){
  		      if (err) return $.lexxi.handle_error(err);
  		      fs.unlink($.__base + 'app/uploads/'+file_type+'-' + file_id +'-s'+ ext);
  		    });
  		});
  		gm(src)
  			.options({imageMagick: true})
  			.resize(500)
  			.quality(90)
  			.write($.__base + 'app/uploads/'+file_type+'-' + file_id +'-m'+ ext, function (err) {
          if (err) return $.lexxi.handle_error(err);
  		    s3.putFile(
  		      $.__base + 'app/uploads/'+file_type+'-' + file_id +'-m'+ ext,
  		      '/'+file_type+'-' + file_id +'-m'+ ext,
  		      { 'x-amz-acl': 'public-read', 'Content-Type': mimetype }, function(err, res){
  		      if (err) return $.lexxi.handle_error(err);
  		      fs.unlink($.__base + 'app/uploads/'+file_type+'-' + file_id +'-m'+ ext);

            callback(ext, $);

  		    });
  		});
  		gm(src)
  			.options({imageMagick: true})
  			.resize(1024)
  			.quality(90)
  			.write($.__base + 'app/uploads/'+file_type+'-' + file_id +'-l'+ ext, function (err) {
          if (err) return $.lexxi.handle_error(err);
  		    s3.putFile(
  		      $.__base + 'app/uploads/'+file_type+'-' + file_id +'-l'+ ext,
  		      '/'+file_type+'-' + file_id +'-l'+ ext,
  		      { 'x-amz-acl': 'public-read', 'Content-Type': mimetype }, function(err, res){
  		      if (err) return $.lexxi.handle_error(err);
  		      fs.unlink($.__base + 'app/uploads/'+file_type+'-' + file_id +'-l'+ ext);
  		    });
  		});
    }).then(function(){
      s3.putFile(src,
        '/'+file_type+'-' + file_id +'-o'+ ext,
        { 'x-amz-acl': 'public-read', 'Content-Type': mimetype }, function(err, res){
          if (err) return $.lexxi.handle_error(err);
  	      fs.unlink(src);
      });
    }).done();

  };









  module.resize_s3_multiple = function(req, res, models, $, file_type, filename, callback){

    var ext = path.extname(filename);
    var mimetype = mime.lookup(path.extname(filename));
  	var src = $.__base + 'app/uploads/temp-'+filename;


    var site_code = $.config.site_code;
    var file_id = $.file_id;

    $.q.fcall(function(){

  		gm(src)
  			.options({imageMagick: true})
  			.resize(250, "250^")
        .gravity("Center")
  			.crop(250, 250)
  			.extent(250, 250)
  			.quality(90)
  			.write($.__base + 'app/uploads/'+file_type+'-' + file_id +'-s'+ ext, function (err) {
  		    s3.putFile(
  		      $.__base + 'app/uploads/'+file_type+'-' + file_id +'-s'+ ext,
  		      '/'+file_type+'-' + file_id +'-s'+ ext,
  		      { 'x-amz-acl': 'public-read', 'Content-Type': mimetype }, function(err, res){
  		      if (err) return $.lexxi.handle_error(err);
  		      fs.unlink($.__base + 'app/uploads/'+file_type+'-' + file_id +'-s'+ ext);
  		    });
  		});
  		gm(src)
  			.options({imageMagick: true})
  			.resize(500)
  			.quality(90)
  			.write($.__base + 'app/uploads/'+file_type+'-' + file_id +'-m'+ ext, function (err) {
  		    s3.putFile(
  		      $.__base + 'app/uploads/'+file_type+'-' + file_id +'-m'+ ext,
  		      '/'+file_type+'-' + file_id +'-m'+ ext,
  		      { 'x-amz-acl': 'public-read', 'Content-Type': mimetype }, function(err, res){
  		      if (err) return $.lexxi.handle_error(err);
  		      fs.unlink($.__base + 'app/uploads/'+file_type+'-' + file_id +'-m'+ ext);

            callback(ext, $);

  		    });
  		});
  		gm(src)
  			.options({imageMagick: true})
  			.resize(1024)
  			.quality(90)
  			.write($.__base + 'app/uploads/'+file_type+'-' + file_id +'-l'+ ext, function (err) {
  		    s3.putFile(
  		      $.__base + 'app/uploads/'+file_type+'-' + file_id +'-l'+ ext,
  		      '/'+file_type+'-' + file_id +'-l'+ ext,
  		      { 'x-amz-acl': 'public-read', 'Content-Type': mimetype }, function(err, res){
  		      if (err) return $.lexxi.handle_error(err);
  		      fs.unlink($.__base + 'app/uploads/'+file_type+'-' + file_id +'-l'+ ext);
  		    });
  		});
    }).then(function(){
      s3.putFile(src,
        '/'+file_type+'-' + file_id +'-o'+ ext,
        { 'x-amz-acl': 'public-read', 'Content-Type': mimetype }, function(err, res){
  	      fs.unlink(src);
      });
    }).done();

  };














  module.unserialize = function(data) {
    //  discuss at: http://phpjs.org/functions/unserialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Pedro Tainha (http://www.pedrotainha.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Chris
    // improved by: James
    // improved by: Le Torbi
    // improved by: Eli Skeggs
    // bugfixed by: dptr1988
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  revised by: d3x
    //    input by: Brett Zamir (http://brett-zamir.me)
    //    input by: Martin (http://www.erlenwiese.de/)
    //    input by: kilops
    //    input by: Jaroslaw Czarniak
    //        note: We feel the main purpose of this function should be to ease the transport of data between php & js
    //        note: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
    //   returns 1: ['Kevin', 'van', 'Zonneveld']
    //   example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
    //   returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}

    var that = this,
      utf8Overhead = function(chr) {
        // http://phpjs.org/functions/unserialize:571#comment_95906
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





  module.truncate_string = function(str, length) {
   return str.length > length ? str.substring(0, length - 3) + '...' : str
  };




  module.url_encode = function(o){
    return encodeURIComponent(o);
  };

  module.url_decode = function(o){
    return decodeURIComponent(o);
  };


  return module;

};
