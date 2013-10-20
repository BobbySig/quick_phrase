{
	var things = ["Derp", "A thing.", "Nope", "LET ME FINISH."];

	function listFormatter(items) {
		var htmlString = "";

		for (i = 0; i < items.length; i++) {
			htmlString += "<div><a id='link' href='#'>" + items[i] + "</a></div><hr>";
		}

		return htmlString;
	}

	//Actions done after page is loaded.
	window.onload = function() {
		document.getElementById('items').innerHTML = listFormatter(things);

		//Perform action on all links in document.
		var allPhrases = document.links;
		for (i = 0; i < allPhrases.length; i++) {
			//Send clipped text to background scripts for copying.
			allPhrases[i].onclick = function() {
				var clipText = this.innerText;
				chrome.runtime.sendMessage({type: "action-copy", clip: clipText});
			}
		}
	}
}

//<div><a id="link" href="#">This is copied to the clipboard on click. Test me. I dare you.</a></div><hr>