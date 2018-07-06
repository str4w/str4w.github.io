if (document.images) {
prodOff = new Image();
prodOff.src = origimage;   // your original picture

prod1on = new Image();
prod1on.src = "image/main_on.gif";   // change these to highlight file names

prod2on = new Image();
prod2on.src = "image/interests_on.gif";

prod3on = new Image();
prod3on.src = "image/publications_on.gif";

prod4on = new Image();
prod4on.src = "image/sketches_on.gif";

prod5on = new Image();
prod5on.src = "image/poems_on.gif";

prod6on = new Image();
prod6on.src = "image/code_on.gif";

prod7on = new Image();
prod7on.src = "image/links_on.gif";

prod8on = new Image();
prod8on.src = "image/photo_on.gif";

function rollon(x) {
	imgOn = eval('prod' + x +"on.src");
	document.images['prod'].src = imgOn;
}

function rolloff() {
	document.images['prod'].src = prodOff.src;
}
}
function showHide(elementID){
var element = document.getElementById(elementID)
//alert(element.style.display)
if (element.style.display == "block") element.style.display = "none"
else element.style.display = "block"
}  
function popwin(file,h,v) {
        isthereapopup=1;
	if (v > screen.height) {v = screen.height-50;}
	aPopup = window.open(file,"win",
		"toolbar=0,status=0,scrollbars=1,location=0,resize=0,menubar=0,screenx=0,screeny=0,width=" + h +",height=" + v);
	if (window.focus) {aPopup.focus()}
}

isthereapopup =0;

function killpopup()
{if (isthereapopup == 1){if (aPopup.location) {aPopup.close();isthereapopup = 0;}}} 






