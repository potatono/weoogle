console.log("Inspect results loaded.");

(new function() {	
	function extractSearchResults() {
		var elements = document.getElementsByClassName("g");
		var mapped = [];
		for (var i=0; i<elements.length; i++) {
			mapped.push({
				title: elements[i].getElementsByTagName("a")[0].innerText,
				url: elements[i].getElementsByTagName("a")[0].href,
				description: elements[i].getElementsByClassName("st")[0].innerText,
				html: elements[i].outerHTML
			});
		}
		
		return mapped;
	}
	
	function sendSearchResults(results) {
		console.log("Calling sendRequest");
		var id = window.location.href.replace(/.*&sid=(\d+)/,"$1");
		chrome.extension.sendRequest({ cmd:'results', data:results, sid:id });
	}
	
	sendSearchResults(extractSearchResults());
	window.close();
}());

