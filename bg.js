{
	//Creates the panel when browserAction is clicked.
	chrome.browserAction.onClicked.addListener(function() {
        	chrome.windows.create({'url':'thing.html', 'type': 'panel'}, function(window) { });
    	});

	//Executes clipText when message is sent from content scripts.
	chrome.runtime.onMessage.addListener(
		function(msg, sender, sendResponse) {
        	clipText(msg.clip);
	});

	//Copies passed in String to the clipboard.
	function clipText(s) {
		console.log("In clipText method.");
		area = document.getElementById('clip-temp');
		area.value = s;
		area.focus();
		area.select();
		document.execCommand('copy', false, null);
	}
}