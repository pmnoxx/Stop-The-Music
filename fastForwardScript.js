//Play the video
console.log('rewind');
var actualCode = 'document.getElementsByTagName("video")[0].currentTime += 10;';


var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
