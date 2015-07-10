;(function(){
	'use strict';
	var dataStack = [
		{id: 1, subject: 'Maths', score: 60},
		{id: 2, subject: 'Physics', score: 50},
		{id: 3, subject: 'Nepali', score: 100},
		{id: 4, subject: 'Chemistry', score:88},
		{id: 5, subject: 'Chemistry', score:88},
		{id: 6, subject: 'Chemistry', score:88}
	];

	function Read(fileUpload_){
		var fileUpload = fileUpload_;
		console.log(fileUpload);
		var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
		if (regex.test(fileUpload.value.toLowerCase())) {
        	if (typeof (FileReader) != "undefined") {
        		var reader = new FileReader();
        		reader.onload = function (e) {
        			var rows = e.target.result.split("\n");
        			console.log(rows);
        		}
        	}else {
            	alert("This browser does not support HTML5.");
        	}
   		} else {
        alert("Please upload a valid CSV file.");
    	}
        
	};

	window.Read = Read;
})();