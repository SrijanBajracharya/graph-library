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
		var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    	if (regex.test(fileUpload.value.toLowerCase())) {
        	if (typeof (FileReader) != "undefined") {
            	var reader = new FileReader();
           		reader.onload = function (e) {
                	var table = document.createElement("table");
                	var rows = e.target.result.split("\n");
                	for (var i = 0; i < rows.length; i++) {
                    	var row = table.insertRow(-1);

                    	var cells = rows[i].split(",");
                    	console.log(cells);
                    	dataStack.push({subject:cells[0],score:cells[1]});
                    	console.log(cells[0]);
                    	console.log(cells[1]);
                    	console.log(dataStack);
                    	for (var j = 0; j < cells.length; j++) {
                       		var cell = row.insertCell(-1);
                       		//console.log(cell + 'row');
                       		cell.innerHTML = cells[j];

                    	}
                	}
                	var dvCSV = document.getElementById("dvCSV");
                	dvCSV.innerHTML = "";
                	dvCSV.appendChild(table);
            	}
            	reader.readAsText(fileUpload.files[0]);
            	console.log(fileUpload.files[0]);
        	} else {
            	alert("This browser does not support HTML5.");
        	}
   		} else {
        alert("Please upload a valid CSV file.");
    	}
    }
	window.Read = Read;

})();
	