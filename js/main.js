window.onload = function(){ 
    document.getElementById("search").addEventListener("click", search);
}

var storeName;

function search(){
	console.log("searching...");
	getCurrentTabUrl(httpGetAsync);
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

    callback(createPlaceSearchUrl(url), display);
  });
}

// https://maps.googleapis.com/maps/api/geocode/json?address=Ichiban+Boshi+(Jurong+Point)&key=AIzaSyAsgssJTUNy5pje5juQSZmnfOhhAgcLd5s
function httpGetAsync(theUrl, callback) {
	if (theUrl){
		var xmlHttp = new XMLHttpRequest();
    	xmlHttp.onreadystatechange = function() { 
        	if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            	callback(xmlHttp.responseText);
    	}
    	xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    	xmlHttp.send(null);
	} else {
		clearDisplay();
	}
}

function createPlaceSearchUrl(url){
	if (url.match("https://www.google.com.sg/maps/place/")){
		results = url.split("/");
		storeName = results[5].split('+').join(' ');
		return "https://maps.googleapis.com/maps/api/geocode/json?address=" + results[5] + "&key=AIzaSyAsgssJTUNy5pje5juQSZmnfOhhAgcLd5s";
	} else {
		return null;
	}
}

function display(res){
	placeId = JSON.parse(res).results[0].place_id;
	console.log(placeId);
	document.getElementById("storeName").innerHTML = storeName;
}

function clearDisplay(){
	document.getElementById("storeName").innerHTML = "No store to display now!";
}