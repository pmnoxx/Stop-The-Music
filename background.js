var playing = true;
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
      title: "Set keyboard shortcut",
      contexts: ["browser_action"],
      onclick: function() {
        chrome.tabs.create({url:'chrome://extensions/configureCommands'});
      }
});

function is_good_url(url) {
    return url.startsWith("https://animenetzone.com")
        || url.startsWith("https://hidive.com")
        || url.startsWith("https://www.hidive.com")
        || url.startsWith("https://www.audible.co.jp")
        || url.startsWith("https://www.crunchyroll.com")
        || url.startsWith("https://www.dailymotion.com")
        || url.startsWith("https://www.nikoniko.jp")
        || url.startsWith("https://www5.gogoanime.io")
        || url.startsWith("https://www.youtube.com")
        || url.startsWIth("https://www.funimation.com")
;
}


function process() {
	chrome.tabs.query( {url: "https://*/*"} , function (tabs) {
		if (playing)
		{	//If we're playing, stop all videos, change the icon to the "play" icon, and set playing to false
			chrome.browserAction.setIcon({path: "playIcon.png"});
            for (var i = 0; i < tabs.length; i++) {
                if (!is_good_url(tabs[i].url)) continue;
                chrome.tabs.executeScript(tabs[i].id, {
                        "file": "pauseScript.js",
                        "allFrames": true
                    }, function () {} );
            }
            playing=false;
		} else {	//If we're not playing, start the first youtube video there is and change the icon
			for (var i = 0; i < tabs.length; i++) {
                if (!is_good_url(tabs[i].url)) continue;

                chrome.browserAction.setIcon({path: "stopIcon.png"});
                chrome.tabs.executeScript(tabs[i].id, {
                        "file": "playScript.js",
                        "allFrames": true
                    }, function () {} );
                break;
            }
            playing=true;
		}
	});
}

function rewind() {
	chrome.tabs.query( {url: "https://*/*"} , function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (!is_good_url(tabs[i].url)) continue;

            chrome.tabs.executeScript(tabs[i].id, {
                    "file": "rewindScript.js",
                    "allFrames": true
                }, function () {} );
            break;
        }
	});
}

function fastForward() {
	chrome.tabs.query( {url: "https://*/*"} , function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (!is_good_url(tabs[i].url)) continue;

            chrome.tabs.executeScript(tabs[i].id, {
                    "file": "fastForwardScript.js",
                    "allFrames": true
                }, function () {} );
            break;
        }
	});
}
chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    process();
});
chrome.commands.onCommand.addListener(function(command) {	//Fired when user presses hotkey
    if (command == "stop-the-music") {
        process();
    }
    else if (command == "rewind") {
        rewind();
    }
    else if (command == "fastforward") {
        fastForward();
    }
});
