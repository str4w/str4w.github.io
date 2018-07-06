//*************************************************************
// These are the functions which will allow the construction
// of a small panorama window which can be dragged to view 
// different view angles into a panoramic picture.
//
// Rupert Brooks www.cyberus.ca/~rbrooks
// Version 1.0 July, 2003
//
// This relies on the Dynapi cross browser library, available from
// dynapi.sourceforge.net  It was developed using version 2.5.6 of
// dynapi.
//
// This code is tested and seems to work under recent IE, Mozilla,
// and Netscape browsers.  It does not work under Opera because 
// dynapi does not.
//
// You may use this code for whatever you like.  I'd appreciate an
// acknowledgement, and any bug fixes you may have, but its not
// a requirement.
//
// to use - first preload the images you want in the background
// use lines like this in your header.
//       panimage1=new Image();
//       panimage1.src="sinewave.png";
// then put a spacer in your text that will be the size of your viewing
// window, and name it something unique.
//
// then call buildPanorama as follows
//
// buildPanorama(imagename,panimage,mode) {
// where imagename is the string name of the spacer image
//       panimage is the preloaded image for panning
//       mode is whether or not to treat the image as though
//            it is a closed loop.  0 treats the image as though it
//            has an end.  1 treats it as though you can spin 
//            around an arbitrary number of times.
//
function getXYcoord ( nvn ) {
   var elm = document.images[nvn];
   if ( document.layers ) return elm;
           // NS4 images contain x and y values
   var rd = { x:0 ,y:0 };
   do { rd.x += parseInt( elm.offsetLeft );
        rd.y += parseInt( elm.offsetTop );
        elm = elm.offsetParent;
   } while ( elm );
   return rd
}; //end getXYcoord ( string ) -> object{x,y}


function adjustPanImage(layer) {
	x=layer.getX()
        if (x>0) {
           layer.setX(x-layer.panimgw)
        } else if (x<-layer.panimgw){
           layer.setX(x+layer.panimgw)
        }
}

function buildPanorama(imagename,panimage,mode) {
        // what are the height and width of the pan image
        panimgh=panimage.height
        panimgw=panimage.width

        // we call the spacer pan image the target
        targvar=getXYcoord(imagename);
        targh=document.images[imagename].height
        targw=document.images[imagename].width
        targt=targvar.y
        targb=targt+targh
        targl=targvar.x
        targr=targl+targw

	myLayer=new DynLayer(null,targl,targt,targw,targh,'#c0c0c0')
	panImage=new DynLayer(null,0,0,panimgw*2,panimgh)
        panImage.setBgImage(panimage.src)
        myLayer.addChild(panImage)
        DynAPI.document.addChild(myLayer)
        panImage.panimgh=panimgh;
        panImage.panimgw=panimgw;
        if (mode) {

           myListener=new EventListener(panImage)
	   myListener.ondragmove=function(e){
                adjustPanImage(e.getTarget())
	   }
	   myListener.ondragend=function(e){
                adjustPanImage(e.getTarget())
           }
	   panImage.addEventListener(myListener)

	   DragEvent.setDragBoundary(panImage,0,2.5*panimgw,targh,-2*panimgw)
        } else {
	   DragEvent.setDragBoundary(panImage,0,2*panimgw,targh,-1*panimgw+targw)
        }
	DragEvent.enableDragEvents(panImage)

} 


