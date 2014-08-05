var path = require('path');
var fs = require('fs');
var moment = require('moment');
var util = require('util');

//read config file

var retentionConfig =  path.join( __dirname , '../config/retentionConfig.json');	

var fileContents = fs.readFileSync(retentionConfig, 'utf8');  	    
var folders = JSON.parse(fileContents);

//Loop through each directory folder
for ( var i = 0; i < folders.length; i++ ) {
   	var obj = folders[i];    	
	var logPath = path.join(__dirname, obj.logPath);
	var logFile = path.join(logPath,moment().format("YYYYMMDD"));
	logFile += '.txt';  
		
	//Validate Rentention Period
	var pattMonth = /months?/i;
	var pattYear = /years?/i;    	
   	if (pattMonth.test(obj.retentionPeriodUnit))	{ var retentionPeriodUnit = 'month'; }    	    	
   	else if (pattYear.test(obj.retentionPeriodUnit))	{ var retentionPeriodUnit = 'year'; }
   	else {var retentionPeriodUnit = null; }
	//Validate Rentention Unit		
   	if(obj.retentionPeriodValue>0)	{
		var retentionPeriodValue = obj.retentionPeriodValue; }			
	else { var retentionPeriodValue = null; }
						
	var filePath = obj.path; 			

    if (retentionPeriodUnit && retentionPeriodValue && fs.existsSync(filePath))	{    		
		//calculate (date now - rentention period)
		retentionDate = moment().subtract(retentionPeriodValue, retentionPeriodUnit);    	
		
		//log the scan details
		logString = 'Deleting files in : ' + filePath + ' older then ' + retentionPeriodValue + ' ' +  retentionPeriodUnit + '(' + moment(retentionDate).format('YYYY-MM-DD') + ')';
		fs.appendFile(logFile, moment().format("YYYY-MM-DD HH:mm:ss.SSS") + ' ' + logString + '\n', function (err) {
		});	

		var files = fs.readdirSync(filePath);

		if(!files)	{
			logString = 'Directory: ' + filePath + ' does not exist';
			fs.appendFile(logFile, moment().format("YYYY-MM-DD HH:mm:ss.SSS") + ' ' + logString + '\n', function (err) {
  			if (err) throw err;
  			//TODO email error:
			});				
		}			
			//loop through every file in folder			
		var fileCount =0;
		var deleteCount = 0;
				
		for (var file in files) { 				 				  			
  			fileCount++;
  			var fullFilePath = path.join(filePath, files[file]);  			  			

  			fileStats = fs.statSync(fullFilePath);
  				
  			if(moment(fileStats.ctime).isBefore(retentionDate))	{
				fs.unlinkSync(fullFilePath); //Async version does not work properly
				deleteCount++;
				logString = 'Deleting: ' + fullFilePath + ' created ' + moment(fileStats.ctime).format('YYYY-MM-DD HH:mm:ss.SSS');
				fs.appendFile(logFile, moment().format("YYYY-MM-DD HH:mm:ss.SSS") + ' ' + logString + '\n', function (err) {
  					if (err) throw err;
				});
			}  				
		}		
    	logString = 'Checked files: ' + fileCount + ' Deleted: ' + deleteCount;
		fs.appendFile(logFile, moment().format("YYYY-MM-DD HH:mm:ss.SSS") + ' ' + logString + '\n', function (err) {
  			if (err) throw err;
		});
    }
    else	{
    	logString = 'ERROR: ' + filePath + ' ' + retentionPeriodUnit + ' ' + retentionPeriodValue;
		fs.appendFile(logFile, moment().format("YYYY-MM-DD HH:mm:ss.SSS") + ' ' + logString + '\n', function (err) {
  			if (err) throw err;  			
		});		
    }
}//end if loop