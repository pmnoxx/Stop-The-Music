//Pause the video
console.log("pause")
var actualCode = 'document.getElementsByTagName("video")[0].pause(); document.getElementsByTagName("video")[0].textTracks[0].mode = "disabled" ';

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
