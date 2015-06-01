{
	var things = [];

	//Generates HTML for list of clippable phrases.
	function listFormatter(items) {
		var htmlString = "";

		htmlString += "<div style='max-height: " + window.innerHeight + ";'>"

		//Generates HTML for each phrase.
		for (i = 0; i < items.length; i++) {
			htmlString += "<a id='phrase' href='#'>";
			htmlString += "<div>";
			htmlString += items[i] + "</div></a><hr>";
		}

		htmlString += "</div>";

		//Generates HTML for "Create New Phrase" button.
		//htmlString += "<form id='create'><input id='new-phrase'><button type='button' id='create-new'>Add</button></form>";

		return htmlString;
	}

	function addToList(items, s) {
		items.push(s);
		return items;
	}

	function showRClickMenu(control, e) {
		var mouseX = e.clientX + window.pageXOffset + 'px'; //Mouse X.
		var mouseY = e.clientY + window.pageYOffset + 'px'; //Mouse Y.
		document.getElementById(control).style.position = 'absolute';
		document.getElementById(control).style.display = 'inline';
		document.getElementById(control).style.left = posx;
		document.getElementById(control).style.top = posy;
	}

	//Actions done after page is loaded.
	window.onload = function() {
		document.getElementById('items').innerHTML = listFormatter(things);

		//Perform action on all links in document.
		var allPhrases = document.links;
		for (i = 0; i < allPhrases.length; i++) {
			//Sends clipped text to background scripts for copying on click.
			if (allPhrases[i].id = "phrase") {
				allPhrases[i].onclick = function() {
					var clipText = this.innerText;
					chrome.runtime.sendMessage({type: "action-copy", clip: clipText});
					return false;
				}
				
				allPhrases[i].oncontextmenu = function() {
					var mouseX = window.event.clientX + window.pageXOffset + 'px'; //Mouse X.
					var mouseY = window.event.clientY + window.pageYOffset + 'px'; //Mouse Y.
					document.getElementById('contextMenu').style.position = 'absolute';
					document.getElementById('contextMenu').style.display = 'inline';
					document.getElementById('contextMenu').style.left = mouseX;
					document.getElementById('contextMenu').style.top = mouseY;
				}
			}
		}

		document.forms['create'].onsubmit = function() {
			document.forms['create']['create-new'].click();
			return false;
		}

		//Set action for 'create-new' button.
		document.forms['create']['create-new'].onclick = function() {
			var newPhrase = document.forms['create']['new-phrase'].value;
			if (newPhrase != "" && newPhrase != null) {
				things = addToList(things, newPhrase);
				document.forms['create']['new-phrase'].value = "";
				window.onload();
			}
		}

		document.body.oncontextmenu = function() {
			return false;
		}

		document.onmousedown = function() {
			document.getElementById('contextMenu').style.display = 'none';
		}

		document.onmouseup = function() {
			document.getElementById('contextMenu').style.display = 'none';
		}
	}
}