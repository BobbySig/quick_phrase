{
	var things = ["Derp", "A thing.", "Nope", "LET ME FINISH."];

	//Generates HTML for list of clippable phrases.
	function listFormatter(items) {
		var htmlString = "";

		//Generates HTML for each phrase.
		for (i = 0; i < items.length; i++) {
			htmlString += "<a id='phrase' href='#'><div>" + items[i] + "</div></a><hr>";
		}

		//Generates HTML for "Create New Phrase" button.
		htmlString += "<form id='create'><input id='new-phrase'><button type='button' id='create-new'>Add</button></form>";

		return htmlString;
	}

	function addToList(items, s) {
		items.push(s);
		return items;
	}

	//Displays the list of phrases.
	function displayPhraseList() {
		document.getElementById('items').innerHTML = listFormatter(things);

		//Perform action on all links in document.
		var allPhrases = document.links;
		for (i = 0; i < allPhrases.length; i++) {
			//Sends clipped text to background scripts for copying on click.
			if (allPhrases[i].id = "phrase") {
				allPhrases[i].onclick = function() {
					var clipText = this.innerText;
					chrome.runtime.sendMessage({type: "action-copy", clip: clipText});
				}
			}
		}

		//Set action for 'create-new' button.
		document.forms['create']['create-new'].onclick = function() {
			var newPhrase = document.forms['create']['new-phrase'].value;
			if (newPhrase != "" && newPhrase != null) {
				things = addToList(things, newPhrase);
				document.forms['create']['new-phrase'].value = "";
				displayPhraseList();
			}
		}
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
				}
			}
		}

		//Set action for 'create-new' button.
		document.forms['create']['create-new'].onclick = function() {
			var newPhrase = document.forms['create']['new-phrase'].value;
			if (newPhrase != "" && newPhrase != null) {
				things = addToList(things, newPhrase);
				document.forms['create']['new-phrase'].value = "";
				displayPhraseList();
			}
		}
	}
}