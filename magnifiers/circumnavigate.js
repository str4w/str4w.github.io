//*************************************************************
// These are the functions which will allow the construction
// of a circumnavigate window which can be dragged to view 
// different view angles onto an object.
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
//       numjesusimages=39;
//       imgprefix='image/jesus';
//       imgsuffix='.jpg';
//       jesusimages=new Array(numjesusimages);
//       for(i=0;i<numjesusimages;i++) {
//          if (i<10) {
//             spacer='000';
//          } else if(i<100) {
//             spacer='00';
//          }
//          jesusimages[i]=new Image();
//          jesusimages[i].src=imgprefix+spacer+i+imgsuffix;
//       }
//
// then put a spacer in your text that will be the size of your viewing
// window, and name it something unique.
//
// then call buildRotate as follows
//
// buildRotate(imagename,panimages,numimages) {
// where imagename is the string name of the spacer image
//       panimage is the preloaded images for panning
//       numimages is the number of images
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
        dx=x-layer.pos;
        layer.pos=layer.getX();
        if (dx>0) {
           layer.counter=(layer.counter+1)%layer.numimages;
	//layer.children[0].setHTML('<font color=white>X is '+x+' counter is '+layer.counter+'</font>')
           layer.setBgImage(layer.panimages[layer.counter].src);
	   layer.setX(0)
        } else if(dx<0) {
           layer.counter=(layer.counter-1)%layer.numimages;
           // for whatever reason the mod operator misbehaves
           if(layer.counter<0) {
              layer.counter+=layer.numimages;
           }
	//layer.children[0].setHTML('<font color=white>X is '+x+' counter is '+layer.counter+'</font>')
           layer.setBgImage(layer.panimages[layer.counter].src);
	   layer.setX(0)
        } else {
	   layer.setX(0)
}
}

function buildRotate(imagename,panimages,numimages) {
        // we call the spacer pan image the target
        targvar=getXYcoord(imagename);
        targh=document.images[imagename].height
        targw=document.images[imagename].width
        targt=targvar.y
        targb=targt+targh
        targl=targvar.x
        targr=targl+targw

	baseLayer=new DynLayer(null,targl,targt,targw,targh,'#c0c0c0')
	panLayer=new DynLayer(null,0,0,targw,targh,'#000000')
        panLayer.setBgImage(panimages[0].src)
        panLayer.panimages=panimages;
        panLayer.numimages=numimages;
        panLayer.counter=0;
        panLayer.pos=0;
        baseLayer.addChild(panLayer);
        DynAPI.document.addChild(baseLayer)
        myListener=new EventListener(panLayer)
	myListener.ondragmove=function(e){
                adjustPanImage(e.getTarget())
	}
	myListener.ondragend=function(e){
                adjustPanImage(e.getTarget())
        }
	panLayer.addEventListener(myListener)

	DragEvent.setDragBoundary(panLayer,0,targw*2,targh,-targw)

	DragEvent.enableDragEvents(panLayer)

} 



