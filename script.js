#!/usr/bin/env node

var ase2swatches = require('./ase2swatches.js');
var fs = require('fs');

var filenames = process.argv.slice(2);

if (filenames.length == 0)
  console.log('Bummer: no input files.')

filenames.forEach(function(filename){
  fs.exists(filename, function(exists){
    if (exists) {
      fs.readFile(filename, function(err, data) {
        if (err) throw err;

        var targetFileName = filename.substr(0, filename.lastIndexOf(".")) + '.swatches';
        fs.writeFile(process.cwd() + '/' + targetFileName, new Buffer(ase2swatches(data, filename)), function(err) {
          if (err) {
            console.log('SHEIT');
          }
          else {
            console.log('SUCCESS!');
          }
        });
      });
    }
  });
});
