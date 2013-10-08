{
	chrome.browserAction.onClicked.addListener(function() {
        	chrome.windows.create({'url':'thing.html', 'type': 'panel'}, function(window) { });
    	});
}
