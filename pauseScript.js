//Pause the video
var actualCode = 'document.getElementsByTagName("video")[0].pause();';

console.log("pause")
var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
