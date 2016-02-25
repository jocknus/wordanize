function loadFile(data) {
	var WORD_HTML ='<div class="word"><p>Mössa</p><div class="split"></div></div>';
    var obj = xlsx(data);
	
	var myStringArray = obj.worksheets[0];
	var arrayLength = myStringArray.length;
	
	for (var i = 0; i < arrayLength; i++) {
		var wrapper = $(WORD_HTML);
		var word = decodeURIComponent(escape(obj.worksheets[0][i]));
		wrapper.find("p").text(word);
		createDraggables(wrapper);
		$("#dragzone").append(wrapper);
	}
	
	$("#uploadform").hide();
	$("#savefile").show();
} 

 window.onload = function() {

	var handleFileSelect = function(evt) {
		var files = evt.target.files;
		var file = files[0];

		if (files && file) {
			var reader = new FileReader();

			reader.onload = function(readerEvt) {
				var binaryString = readerEvt.target.result;			
				loadFile(btoa(binaryString));
			};
			
			 reader.readAsBinaryString(file);
		}
	};

	if (window.File && window.FileReader && window.FileList && window.Blob) {
		document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}

}