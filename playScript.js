//Play the video
console.log('play');
var actualCode = 'document.getElementsByTagName("video")[0].play();';

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
