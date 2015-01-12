var ase = require('adobe-swatch-exchange');
var admZip = require('adm-zip');
var one = require('onecolor');

var ase2swatches = function(stream, filename) {
  var extractedData = ase.decode(stream);

  var swatches = [];

  extractedData.colors.forEach(function(item) {
    var parsedColor = one([item.model, item.color[0], item.color[1], item.color[2], item.color[3]]).hsv();

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
