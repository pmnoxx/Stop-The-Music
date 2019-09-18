//Play the video
console.log('play');
var actualCode = 'document.getElementsByTagName("video")[0].play();document.getElementsByTagName("video")[0].style.zIndex = 333;document.getElementsByTagName("video")[0].controls = true;document.getElementsByTagName("video")[0].playbackRate = 1.4;';


var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
