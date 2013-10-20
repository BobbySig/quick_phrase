{
	//Actions done after page is loaded.
	window.onload = function() {
		var a = document.getElementById('link');

		//Send clipped text to background scripts for copying.
		a.onclick = function() {
			var clipText = a.innerText;
			chrome.runtime.sendMessage({type: "action-copy", clip: clipText});
		}
	}
}