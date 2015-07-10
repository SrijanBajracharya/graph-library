;(function(){
	'use strict';

	function MainContainer(){
		var that = this;

		var mainContainerProps = {
			width:1200
		};
		this.container = document.createElement('div');
		this.container.style.width = mainContainerProps.width + 'px'; 
		this.container.style.paddingBottom = '20px';
		//this.mainContainer.style.background = 'url(images/main-back.png)';
		this.container.style.background = '#a1a9da';
		this.container.style.overflow = 'auto';	
	};


	function Option(){
		var that = this;
		var optionProps = {
			width:355
		};
		this.element = document.createElement('div');
		this.element.style.width = optionProps.width + 'px';
		this.element.style.float = 'left';

		this.createForm = function(){
			var that = this;

			this.label1 = document.createElement('label');
			this.label1.setAttribute('for','name');
			this.label1.innerHTML = 'Name';

			this.inputElement1 = document.createElement('input');
			this.inputElement1.setAttribute('id','data1');
			this.inputElement1.setAttribute('placeholder', 'Name');
			this.inputElement1.setAttribute('type','text');

			this.label2 = document.createElement('label');
			this.label2.setAttribute('for','data');
			this.label2.innerHTML = 'Data';

			this.inputElement2 = document.createElement('input');
			this.inputElement2.setAttribute('id','data2');
			this.inputElement2.setAttribute('placeholder','Value');
			this.inputElement2.setAttribute('type','number');

			this.btnSave = document.createElement('input');
			this.btnSave.setAttribute('type','button');
			this.btnSave.setAttribute('value', 'Add Data');
			this.btnSave.setAttribute('id','btnSave');

			this.btnCancel = document.createElement('input');
			this.btnCancel.setAttribute('type','button')
			this.btnCancel.setAttribute('value','Cancel');
			this.btnCancel.setAttribute('id','btnCancel');

			this.btnPiChart = document.createElement('input');
			this.btnPiChart.setAttribute('type', 'button');
			this.btnPiChart.setAttribute('value','Pichart');
			this.btnPiChart.setAttribute('id','btnPiChart');

			this.btnBarDiagram = document.createElement('input');
			this.btnBarDiagram.setAttribute('type','button');
			this.btnBarDiagram.setAttribute('value','BarDiagram');
			this.btnBarDiagram.setAttribute('id','btnBarDiagram');

			this.element.appendChild(this.label1);
			this.element.appendChild(this.inputElement1);
			this.element.appendChild(this.label2);
			this.element.appendChild(this.inputElement2);
			this.element.appendChild(this.btnSave);
			this.element.appendChild(this.btnCancel);	
		};	
	};



	function Canvas(){
		var that = this;
		var canvasProps = {
			width:600,
			height:300
		};

		this.canvas = document.createElement('canvas');
		this.canvas.style.width = canvasProps.width + 'px';
		this.canvas.style.height = canvasProps.height + 'px';
		//this.canvas.style.border = '1px solid black';
		this.canvas.style.float = 'left';
		this.canvas.setAttribute('id','can');

		this.createBarDiagram = function(dataStack){
			var that = this;
			var minValue, xScalar;
			var maxValue = 0;
			var dataName = [];
			var dataValue = [];
			this.yScalar;
			this.y;
			var colHead = 50;
			var rowHead = 60;
			var margin = 10;
			var header = 'units';

			for (var i=0; i<dataStack.length; i++){
				dataName.push(dataStack[i].subject);
				dataValue.push(dataStack[i].score);
			};

			for(var i=0;i<dataValue[i];i++){
				if(dataValue[i]>maxValue){
					maxValue = dataValue[i];
				}
			};
	
			var canvas = document.getElementById('can');
			var ctx = canvas.getContext('2d');
			var numSamples = dataStack.length;

			var stepSize = Math.ceil(maxValue/dataStack.length);
			
			
			ctx.fillStyle = 'green';
			this.yScalar = (canvas.height - colHead - margin) / (maxValue);
            xScalar = (canvas.width - rowHead) / (numSamples + 1);
            //ctx.strokeStyle = "rgba(128,128,255, 0.5)"; // light blue line
            ctx.beginPath();
            ctx.font = "14pt Helvetica";
            ctx.fillText(header, 0, colHead - margin);
            //ctx.font = "12pt Helvetica";
            var count =  0;

            for (var scale = maxValue; scale >= 0; scale -= stepSize) {
                that.y = colHead + (that.yScalar * count * stepSize);
                ctx.fillText(scale, margin,that.y + margin);
                ctx.moveTo(rowHead, that.y);
                ctx.lineTo(canvas.width, that.y);
                count++;
                ctx.stroke();
            };

            
            // label samples
            //ctx.font = "14pt Helvetica";
            //ctx.textBaseline = "middle";
            for (var i = 0; i < numSamples; i++) {
                calcY(dataValue[i]);
                //console.log(dataName[i]);
                //ctx.fillText(dataName[i], xScalar * (i + 1), that.y - margin);
                ctx.fillText(dataName[i], xScalar * (i+1), colHead - margin);
                //ctx.fillText(dataName[i], xScalar * (i+1), colHead-that.y);
           
            };

            // set a color and a shadow

            //ctx.fillStyle = "green";
            ctx.shadowColor = 'rgba(128,128,128, 0.5)';
            ctx.shadowOffsetX = 5;
            //ctx.shadowOffsetY = 5;

            // translate to bottom of graph and scale x,y to match data

            ctx.translate(0, canvas.height - margin); //translate(x,y); x= value to add to x coordinate and y= ycoordinate
            ctx.scale(xScalar, -1 * this.yScalar); //scale(scalewidth, scaleheight);

            // draw bars
            
            for (var i = 0; i < numSamples; i++) {
            	var grd=ctx.createLinearGradient(i+1,that.yScalar,0.5,dataValue[i]);
				grd.addColorStop(0,"green");
				grd.addColorStop(1,"black");
                ctx.fillRect(i + 1, 0, 0.5, dataValue[i]); //fillrect(x,y, width,height);
                ctx.fillStyle = grd;
            };

        };

        function calcY(value) {
            that.y = canvas.height - value * that.yScalar;
            console.log(that.y);
        };


        this.createPiChart = function(dataStack){
        	var canvas = document.getElementById('can');
			var ctx = canvas.getContext('2d');
			var dataValue = [];
			var dataName = [];

			/*var propPiChart = {
				height:200,
				width:300
			}; 
*/
			for (var i=0; i<dataStack.length; i++){
				dataValue.push(dataStack[i].score);
				dataName.push(dataStack[i].subject);
			}

			console.log(dataValue);

			var colors = ["#7E3817", "#C35817", "#EE9A4D", "#A0C544", "#348017", "#307D7E"];
			var center = [canvas.width / 2, canvas.height / 2];
			var radius = Math.min(canvas.width, canvas.height) / 2;
			var lastPosition = 0, total = 0;
 			for(var i in dataValue) { total += dataValue[i]; 
 				console.log(i, dataValue[i]);}
				for (var i = 0; i < dataValue.length; i++) {
					var outerRadius = lastPosition+(Math.PI*2*(dataValue[i]/total))
					var labX = center[0] + Math.cos(outerRadius) * radius * 1.4;

                	var labY = center[1] + Math.sin(outerRadius) * radius * 1.4;

					ctx.fillStyle = colors[i];
					
					ctx.beginPath();
					ctx.moveTo(center[0],center[1]);
					ctx.arc(center[0],center[1],radius,lastPosition,lastPosition+(Math.PI*2*(dataValue[i]/total)),false);
					ctx.lineTo(center[0],center[1]);
					ctx.fill();


	/*					ctx.drawImage(img,0,0,img.width,img.height,
    left,
    10,
    (300-(right-left))/1,
    300-(right-left)/1.5);
*/
					//ctx.translate(100,100);
					//ctx.rotate(.3);
					//ctx.translate(-100,-100);
					//ctx.translate(0,200 * (1/3) / 2) // move by half of the 1/3 space to center it
					//ctx.scale(1, 2/3); // squish it to 2/3 vertical size

					//ctx.drawImage(img, 0,0);
					//ctx.fillText(dataName[i],labX,labY);
					lastPosition += Math.PI*2*(dataValue[i]/total);
				}
		};
	};



	function PiChart(){
		var that = this;
		var piChartProps = {
			height:70,
			width:165
		};

		this.piChart = document.createElement('div');
		this.piChart.style.height = piChartProps.height + 'px';
		this.piChart.style.width = piChartProps.width + 'px';
		this.piChart.style.background = 'url(images/button.png)';
		this.piChart.innerHTML = 'PiChart';
		this.piChart.style.color = 'AliceBlue';
		this.piChart.style.fontFamily = 'Open Sans';
		this.piChart.style.lineHeight = '80px';
		this.piChart.style.textAlign = 'center';
		this.piChart.style.paddingBottom = '10px';
		this.piChart.style.cursor = 'pointer';
		this.piChart.style.marginLeft = '75px';
		this.piChart.style.marginTop = '20px';
	};



	function BarDiagram(){
		var that = this;
		var barDiagramProps = {
			height:70,
			width:165
		};

		this.barDiagram = document.createElement('div');
		this.barDiagram.style.height = barDiagramProps.height + 'px';
		this.barDiagram.style.width = barDiagramProps.width + 'px';
		this.barDiagram.style.background = 'url(images/button.png)';
		this.barDiagram.innerHTML = 'BarDiagram';
		this.barDiagram.style.color = 'AliceBlue ';
		this.barDiagram.style.fontFamily = 'Open Sans';
		this.barDiagram.style.lineHeight = '70px';
		this.barDiagram.style.textAlign = 'center';
		this.barDiagram.style.paddingTop = '10px';
		this.barDiagram.style.cursor = 'pointer';
		this.barDiagram.style.marginLeft = '75px';
		this.barDiagram.style.marginBottom = '20px';
	};

	function Choose(){
		var that = this;
		var fileUploadProps = {
			height:70,
			width:165
		};

		this.fileUpload = document.createElement('input');
		//this.fileUpload.style.height = fileUploadProps.height + 'px';
		//this.fileUpload.style.width = fileUploadProps.width + 'px';
		//this.fileUpload.style.background = 'url(images/button.png)';
		this.fileUpload.innerHTML = 'choose file';
		this.fileUpload.setAttribute('type','file');
		this.fileUpload.setAttribute('id','fileUpload');
	};

	function Upload(){
		var that = this;
		this.upload = document.createElement('input');
		this.upload.setAttribute('type','button');
		this.upload.setAttribute('id','upload');
		this.upload.setAttribute('value','upload');
	};



	function Table(){
		var that = this;
		var tableProps = {
			width:355
		};
		this.table = document.getElementById('table1');
		this.table.style.width = tableProps.width + 'px';
	};



	var DataHandler = function() {
		var that = this;

		var table = document.getElementById('table1');

		var counter = 0;
		var toEditContact;

		this.dataStack = [
			{id: 1, subject: 'Maths', score: 60},
			{id: 2, subject: 'Physics', score: 50},
			{id: 3, subject: 'Nepali', score: 100},
			{id: 4, subject: 'Chemistry', score:88},
			{id: 5, subject: 'Chemistry', score:88},
			{id: 6, subject: 'Chemistry', score:88}
		];

		var findContactById = function(id) {
			for (var i=0; i<that.dataStack.length; i++) {
				if (that.dataStack[i].id === id)
					return that.dataStack[i];
			};
		};

		var editAction = function(toEdit){
			document.getElementById('data1').value = toEdit.subject;
			document.getElementById('data2').value = toEdit.score;
			document.getElementById('btnSave').value = 'Edit';
		};

		var updateEditRow = function(){
			var td1 = document.getElementById('td-' +toEditContact.id +'-1');
			var td2 = document.getElementById('td-' + toEditContact.id + '-2');
			td1.innerHTML = toEditContact.subject;
			td2.innerHTML = toEditContact.score;
		};

		var updateSerialNumber = function(){
			for(var i=0; i<that.dataStack.length;i++){
				var td = document.getElementById('td-' + that.dataStack[i].id + '-0');
				td.innerHTML = i+1;
			};
		};

		var deleteContact = function(deleteId){
			for(var i=0;i<that.dataStack.length;i++){
				if(that.dataStack[i].id === deleteId){
					that.dataStack.splice(i,1);
					table.removeChild(document.getElementById('row-'+ deleteId));
				}
			};

			updateSerialNumber();
		};

		var deleteAction = function(toDelete){
			console.log('deleteAction');
			var deleteId = toDelete.id;
			deleteContact(deleteId);
		};

	    this.updateCancel = function(){
	    	document.getElementById('btnSave').value = 'Add Data';
	    	document.getElementById('data1').value ='';
	    	document.getElementById('data2').value = '';
	    }

		this.updateEdit = function(){
			console.log('updateEdit');
			var data1 = document.getElementById('data1').value;
			var data2 = document.getElementById('data2').value;
			document.getElementById('btnSave').value = 'Add Data';
			for(var i=0; i<that.dataStack.length;i++){
				if(that.dataStack[i].id === toEditContact.id){
					that.dataStack[i].subject = data1;
					that.dataStack[i].score = data2;
				}
			};
			document.getElementById('data1').value = '';
			document.getElementById('data2').value = '';
			updateEditRow();
		};

		var displayInTable = function(data){
			
			var tr = document.createElement('tr');
			tr.setAttribute('id', 'row-' + data.id);

			var td0 = document.createElement('td');
			td0.setAttribute('id','td-' +data.id+'-0');
			
			var td1 = document.createElement('td');
			td1.setAttribute('id','td-' +data.id + '-1');
			
			var td2 = document.createElement('td');
			td2.setAttribute('id','td-' +data.id + '-2');
			
			var td3 = document.createElement('td');
			
			var td4 = document.createElement('td');

			var btnEdit = document.createElement('input');
			btnEdit.setAttribute('value','Edit');
			btnEdit.setAttribute('type','button');

			btnEdit.onclick = function(){
				return function(){
				var id = data.id;
				var toEdit = findContactById(id);
				toEditContact = toEdit;
				editAction(toEdit);
				};
			}();

			var btnDelete = document.createElement('input');
			btnDelete.setAttribute('value','Delete');
			btnDelete.setAttribute('type','button');

			btnDelete.onclick = (function(){
				return function(){
					var id = data.id;
					if(confirm('Are you sure you want to delete the record of id' +''+id + '?') === true){
						console.log(id);
						var toDelete = findContactById(id);
						console.log(toDelete);
						deleteAction(toDelete);	
					}	
				};
			})();

			td0.innerHTML = counter + 1;
			td1.innerHTML = data.subject;
			td2.innerHTML = data.score;

			td3.appendChild(btnEdit);
			td4.appendChild(btnDelete);

			tr.appendChild(td0);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);

			table.appendChild(tr);
			counter++;
		};

		this.getNewId = function() {
			console.log('getNewId');
			var max = 0;
			for (var i=0; i<that.dataStack.length; i++) {
				if (that.dataStack[i].id > max)
				max = that.dataStack[i].id;
			};
			return max + 1;
		};

		this.loadData = function(){

			table.innerHTML = '';
			counter = 0;
			
			for(var i=0;i<that.dataStack.length;i++){
				var data = that.dataStack[i];
				displayInTable(data);
			};
		};


		this.addAction = function(){
			console.log('here');
			var data1 = document.getElementById('data1').value;
			var data2 = document.getElementById('data2').value;

			//data2 = parseInt(data2);
			console.log(data1, data2);
			var id = that.getNewId();
			var data = {id: id, subject:data1, score:parseInt(data2)};
			that.dataStack.push(data);
			
			displayInTable(data);
			//new PiChart().createPiChart(that.dataStack);
			//new BarDiagram().createBarDiagram(that.dataStack);
		};
	};


	function Chart(mainDiv_){
		var mainDiv = mainDiv_;
		var mainContainer = new MainContainer();
		var option = new Option();
		var canvas = new Canvas();
		var btnPiChart = new PiChart();
		var btnBarDiagram = new BarDiagram();
		var choose = new Choose();
		var upload = new Upload();
		var table = new Table();
		var dataHandler = new DataHandler();
		var chartProps = {
			height:1000,
			width:1200
		};

		var chartSetup = function(){
			mainDiv.style.height = chartProps.height + 'px';
			mainDiv.style.width = chartProps.width + 'px';
			mainDiv.style.border = '1px solid black';
			mainDiv.style.margin = '0 auto';
			option.createForm();

			mainDiv.appendChild(mainContainer.container);
			mainContainer.container.appendChild(option.element);
			mainContainer.container.appendChild(canvas.canvas);
			option.element.appendChild(table.table);
			option.element.appendChild(btnPiChart.piChart);
			option.element.appendChild(btnBarDiagram.barDiagram);
			option.element.appendChild(choose.fileUpload);
			option.element.appendChild(upload.upload);
			
		};

		chartSetup();
		dataHandler.loadData();
		btnSave.onclick = function(){
			if(btnSave.value === 'Add Data'){
				dataHandler.addAction();
			}
			else if(btnSave.value === 'Edit'){
				console.log(btnSave.value);
				dataHandler.updateEdit();
			}
		};

		btnCancel.onclick = function(){
				console.log(btnCancel.value);
				dataHandler.updateCancel();
		};

		btnPiChart.piChart.onclick = function(){
			console.log('piChart');
			canvas.createPiChart(dataHandler.dataStack);
		};

		btnBarDiagram.barDiagram.onclick = function(){
			console.log('barDiagram');
			canvas.createBarDiagram(dataHandler.dataStack);
		};

		upload.upload.onclick = function(){
			console.log('button clicked');
			var fileUpload = document.getElementById('fileUpload');
			console.log(upload);
			var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
				if (typeof (FileReader) != "undefined") {
					var reader = new FileReader();
					reader.onload = function (e) {
						var rows = e.target.result.split("\n");
                		for (var i = 0; i < rows.length; i++) {
                    		var cells = rows[i].split(",");
                    		console.log(cells);
                    		var id =  dataHandler.getNewId();
                    		dataHandler.dataStack.push({id: id, subject:cells[0],score:parseInt(cells[1])});
                    		console.log(cells[0]);
                    		console.log(cells[1]);
                    		console.log(dataHandler.dataStack);
                		};
						dataHandler.loadData();
					}
					reader.readAsText(fileUpload.files[0]);
            		console.log(fileUpload.files[0]);
				}
				else {
            			alert("This browser does not support HTML5.");
        		}
			}
		};
	window.Chart = Chart;
})();