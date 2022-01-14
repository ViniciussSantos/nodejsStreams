
module.exports = {
  getQuoteChar : getQuoteChar, 
  removeQuote : removeQuote,  
  convertArray : convertArray,
  toObjectGen: toObjectGen 
}

function removeQuote(str){
  if(str){
      return String(str).trim().replace(/^["|'](.*)["|']$/, '$1');
  }
  return "";
}

function getQuoteChar(q){
  if(typeof(q) === "string"){
    return q;
  }else if(q === true){
    return '"';
  }
  return null;
}

function convertArray(str, delimiter, quote) {
  if(quote && str.indexOf(quote) !== -1){
    return csvToArray(str, delimiter, quote);
  }
  var output = [];
  var arr = str.split(delimiter);
  arr.forEach(function(val) {
      var trimmed = val.trim();
      output.push(trimmed);
  });
  return output;
}

function removeQuote(str){
  if(str){
      return String(str).trim().replace(/^["|'](.*)["|']$/, '$1');
  }
  return "";
}


function toObjectGen(data, opts){

  opts = opts || { };

  var delimiter = (opts.delimiter || ',');
  var quote = getQuoteChar(opts.quote);
  var content = data;
  var headers = null;

  if(typeof(content) !== "string"){
      throw new Error("Invalid input, input data should be a string");
  }

  content = content.split(/[\n\r]+/ig);

  if(typeof(opts.headers) === "string"){
      headers = opts.headers.split(/[\n\r]+/ig);
      headers = quote ?
              convertArray(headers.shift(), delimiter, quote) :
              headers.shift().split(delimiter);
  }else{
      headers = quote ?
              convertArray(content.shift(), delimiter, quote) :
              content.shift().split(delimiter);
  }

  var hashData = [ ];
  content.forEach(function(item){
      if(item){
        item = quote ?
              convertArray(item, delimiter, quote) :
              item.split(delimiter);
        var hashItem = { };
        headers.forEach(function(headerItem, index){
            hashItem[headerItem] = removeQuote(item[index]);
        });
        hashData.push(hashItem);
      }
  });
  return hashData;
}