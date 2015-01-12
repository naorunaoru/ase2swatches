var ase = require('adobe-swatch-exchange');
var admZip = require('adm-zip');
var one = require('onecolor');

var ase2swatches = function(buffer, filename) {
  var extractedData = ase.decode(buffer);

  var swatches = [];

  extractedData.colors.forEach(function(item) {
    color = item.color.splice(0);

    color.unshift(item.model);
    var parsedColor = one(color).hsv();

    swatches.push({
      hue: parsedColor._hue,
      brightness: parsedColor._value,
      saturation: parsedColor._saturation
    });
  });

  var result = [];

  for (var i = 0; i < swatches.length; i++) {
    var part = Math.ceil((i + 1) / 30) - 1;

    if (!result[part])
      result[part] = [];

    result[part].push(swatches[i]);
  };

  for (var j = 0; j < result.length; j++) {
    result[j] = {
      name: [filename.substr(0, filename.lastIndexOf(".")), j + 1].join(' '),
      swatches: result[j]
    }
  };

  var zip = new admZip();

  zip.addFile('Swatches.json', new Buffer(JSON.stringify(result)));

  return zip.toBuffer();
};

module.exports = ase2swatches;
