var path = require('path');
var fs = require('fs');
var moment = require('moment');
var util = require('util');

var dataDirectory = '/home/gsingh/testData';

var scriptFile = '/home/gsingh/genData.sh'

var fileDatestamp = moment("2012-07-01 4:30", "YYYY-MM-DD HH:mm");

var writeString = '';
var checkDate =moment().subtract(2, 'years');
console.log('- 2years = ' + checkDate.format('YYYY-MM-DD'));



while (fileDatestamp.isBefore("2012-09-05 4:30"))	{
	writeString += 'date ' + fileDatestamp.format('MMDDhhmmYYYY')  + '\n';
	writeString += 'touch -t ' + fileDatestamp.format('YYYYMMDDhhmm') + ' ./testData/' + fileDatestamp.format('YYYYMMDD') + '.txt' + '\n';
	fileDatestamp = fileDatestamp.add(1,'days');
}


fs.writeFile(scriptFile, writeString, function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});


