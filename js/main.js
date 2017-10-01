window.addEventListener("load", start);

var storeName;
var storeId;

function start(){
	document.getElementById("submitButton").addEventListener("click",checkInput);
	// function in blockchainConnector;
	console.log("searching...");
	getCurrentTabUrl(display);
}

function checkInput(){
	var content = document.getElementById("content").value;
	var score = document.getElementById("score").value;
	submitReview(storeId, content, score);
	// function in blockchainConnector;
}

function display(){
	console.log("In display function: " + storeId);

	// check if store exists
	if (storeExist(storeId)){
		document.getElementById("storeName").innerHTML = storeName;
		document.getElementById("newReview").style.display = "block";

		// get blockchain data
		readReviews(storeId, function(reviews){
			if (reviews.length == 0){
				document.getElementById("noReview").style.display = "block";
			} else{
				console.log("display reviews");
				var tbody = document.getElementById("reviews");
				var td;
				var node;
				for (var i=0; i<reviews.length; i++){
					var tr = document.createElement("tr");
					// indexing
					td = document.createElement("td");
					node = document.createTextNode(i+1);
					td.appendChild(node);
					tr.appendChild(td);
					// reviewer
					td = document.createElement("td");
					node = document.createTextNode(reviews[i].reviewer);
					td.appendChild(node);
					tr.appendChild(td);
					// content
					td = document.createElement("td");
					node = document.createTextNode(reviews[i].content);
					td.appendChild(node);
					tr.appendChild(td);
					// score
					td = document.createElement("td");
					node = document.createTextNode(reviews[i].score);
					td.appendChild(node);
					tr.appendChild(td);
					tbody.appendChild(tr);
				}
			}
		});
		
		document.getElementById("storeScore").innerHTML = readOverallScore(storeId);

	} else {
		document.getElementById("createStore").style.display = "block";
		document.getElementById("createStore").addEventListener("click",createStore(storeId));
	}

}

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

	if (web3IsConnected()){
		document.getElementById("storeName").innerHTML = "No store to display now!";
		document.getElementById("switchAccount").style.display = "block";
		if (getStoreFromUrl(url)){
	    	callback();
	    }
	}
    
  });
}

function getStoreFromUrl(url){
	if (url.match("https://www.google.com.sg/maps/place/")){
		results = url.split("/");
		storeName = results[5].split('+').join(' ');
		storeId = results[5].split('+').join('') + results[6];
		return true;
	} else {
		return false;
	}
}
