#!/usr/bin/env node

var ase = require('adobe-swatch-exchange');
var fs = require('fs');
var admZip = require('adm-zip');
var one = require('onecolor');

var convert = function(filename) {
  fs.readFile(filename, function(err, data) {
    if (err) throw err;

    var extractedData = ase.decode(data);

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

    var targetFileName = filename.substr(0, filename.lastIndexOf(".")) + '.swatches';

    zip.addFile('Swatches.json', new Buffer(JSON.stringify(result)));
    zip.writeZip(process.cwd() + '/' + targetFileName);

    console.log('Success:', filename);
  });
}

var filenames = process.argv.slice(2);

if (filenames.length == 0)
  console.log('Bummer: no input files.')

filenames.forEach(function(filename){
  fs.exists(filename, function(exists){
    if (exists) {
      convert(filename)
    }
    else {
      console.log('No such file:', filename)
    }
  });
});
