var playing = true;
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
      title: "Set keyboard shortcut",
      contexts: ["browser_action"],
      onclick: function() {
        chrome.tabs.create({url:'chrome://extensions/configureCommands'});
      }
});


function process() {
	chrome.tabs.query( {url: "https://*/*"} , function (tabs) {
		if (playing)
		{	//If we're playing, stop all videos, change the icon to the "play" icon, and set playing to false
			chrome.browserAction.setIcon({path: "playIcon.png"});
			for (var i = 0; i  <tabs.length; i++) {
				chrome.tabs.executeScript(tabs[i].id, {
                    "file": "pauseScript.js",
                    "allFrames": true
                }, function () {} );
			}
			playing=false;
		} else {	//If we're not playing, start the first youtube video there is and change the icon
			chrome.browserAction.setIcon({path: "stopIcon.png"});
			for (var i = 0; i  <tabs.length; i++) {
                chrome.tabs.executeScript(tabs[tabs.length-1].id, {
                    "file": "playScript.js",
                    "allFrames": true
                }, function () {} );
            }
			playing=true;
		}
	});
}

chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    process();
});
chrome.commands.onCommand.addListener(function(command) {	//Fired when user presses hotkey
    process();
});
