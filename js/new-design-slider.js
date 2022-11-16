
"use strict"

const galleryLayer = document.getElementById('gallery-layer');
const singleLayer = document.getElementById('single-layer');
const lightboxPreview = document.querySelector('.slider-preview-box');
const iconClose = document.getElementById('close');
const effect = document.getElementsByClassName('for-effects');
const pageScroll = document.getElementsByTagName('body')[0]; 

const emuleLoad = document.getElementById('load');
const loadingIcon = document.getElementById('loading-icon');

let onEffect = 
    function () {
      for (let i = 0; i < effect.length; i++) {
       effect[i].classList.add('filter-blur-grayscale');
      }  
    };
    
let offEffect = 
    function () {
      for (let i = 0; i < effect.length; i++) {
       effect[i].classList.remove('filter-blur-grayscale');
      }  
    };

// page scroll disable function (body):
function disablePageScrolling () {
	 pageScroll.style.overflowY = "hidden";
}

// page scroll enable function (body):
function enablePageScrolling () {
	 pageScroll.style.overflowY = "visible"; // instead of visible - auto or ""
}
                   
function showGallery() {  
  galleryLayer.style.display = "block";
  iconClose.style.display = "block";  
  onEffect();
  disablePageScrolling();
  lightboxCentering(); 
  lightboxPreview.classList.add('slider-preview-box-opacity');   
   
  addEventListener("resize", rotationProcessing);         
}

function rotationProcessing() {
  setTimeout(lightboxCentering, 1500);    
  galleryLayer.style.visibility = 'hidden';
  emuleLoad.classList.add('emule-load');
  loadingIcon.style.display = 'block';
}

/////TODO
iconClose.addEventListener('click', hideGallery);
function hideGallery() {	
  galleryLayer.style.display = "none";
  iconClose.style.display = "none"; 
  offEffect(); 
  enablePageScrolling(); 
  lightboxPreview.classList.remove('slider-preview-box-opacity'); 
  
  removeEventListener("resize", rotationProcessing);
}
////////////////

/////TODO
galleryLayer.addEventListener('click', closeLayer);
function closeLayer() {
  let clickedСlass = event.target.className; 
  //console.log(clickedСlass);
  if (clickedСlass === 'gallery-layer') {
    galleryLayer.style.display = "none";  
    iconClose.style.display = "none";  
    offEffect(); 
    enablePageScrolling(); 
    lightboxPreview.classList.remove('slider-preview-box-opacity');
    removeEventListener("resize", rotationProcessing);
  }    
}
////////////////

function showSingleImg() {  
  singleLayer.style.display = "block";
  onEffect(); 
  disablePageScrolling();    
}

/////// варианты назначения обработчика на иконку закрытия///////

// TODO - syntax variant
//const clickedClass = event.target.className;
document.addEventListener('click', (event) => {
  const clickedClass = event.target.className;
  console.log(clickedClass);
  if (clickedClass === 'icon-close-img far fa-times-circle') {    
    singleLayer.style.display = "none";     
    offEffect();
    enablePageScrolling();   
  }
});


/*
// TODO - syntax variant
const withСlass = document.querySelectorAll('.icon-close-img');
for (let i = 0; i < withСlass.length; i++) {
  // or
  withСlass[i].addEventListener('click', hiddeSingleImg); 
  //console.log([i]);
  
  // or
  //withСlass[i].onclick = hiddeSingleImg;   
  //console.log([i]);
  
  // or
  //withСlass[i].onclick = function(){
   //hiddeSingleImg(); 
   //console.log([i]);
  //};
  
}

function hiddeSingleImg() {	
  singleLayer.style.display = "none";     
  offEffect();
  enablePageScrolling();   
}

*/
////////////////////////////////////////////////

singleLayer.addEventListener('click', closeSingleLayer);
function closeSingleLayer() {
  let clickedСlass = event.target.className;
  console.log(clickedСlass);
  if (clickedСlass === 'single-layer' || clickedСlass === '') {
  singleLayer.style.display = "none";  
  offEffect();
  enablePageScrolling();
  } 
}


/////////////////////////////////////////////

// TODO - lightbox
const btn1 = document.querySelector('.prev');
const btn2 = document.querySelector('.next');

/* // TODO - syntax variant:
btn1.addEventListener('click', () => plusSlides(-1) );
btn2.addEventListener('click', () => plusSlides(1) );
*/

// TODO - syntax variant:
btn1.addEventListener('click', function() {
  plusSlides(-1);
});

btn2.addEventListener('click', function() {
  plusSlides(1);
});

btn1.addEventListener('click', function() {
  currentSlide(imagesIndex)
});

btn2.addEventListener('click', function() {
  currentSlide(imagesIndex)
});


let imagesIndex = 1;
viewSlides(imagesIndex); 
lightboxCentering();

function plusSlides(num) {
  viewSlides(imagesIndex += num); 
  lightboxCentering();
}

function currentSlide(num) {
  viewSlides(imagesIndex = num); 
  lightboxCentering();
}

function viewSlides(num) {
  const img = document.getElementsByClassName('slider-images-box');
  const dots = document.getElementsByClassName("dot");
  let i;
 
  if (num > img.length) {
    imagesIndex = 1
  }      
  
  if (num < 1) {
    imagesIndex = img.length
  }
  
  for (i = 0; i < img.length; i++) {
      img[i].style.display = "none";  
  }
  
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
    
  img[imagesIndex-1].style.display = "block";
  dots[imagesIndex-1].className += " active";  
  
}


//////// lightbox centering /////////

function lightboxCentering() {
  const slides = document.getElementsByClassName('slideshow-container')[0];   
  const sizeLayer = document.getElementById('gallery-layer'); 
  let heightLayer = sizeLayer.offsetHeight;                                     
  let widthLayer = sizeLayer.offsetWidth;
  let heightGallery = slides.offsetHeight;
  let widthGallery = slides.offsetWidth;
  //console.log(heightLayer);
  //console.log(heightGallery);
  
  // centering algorithm:
  let differenceLayerGallery = heightLayer - heightGallery;
  let remainder = differenceLayerGallery / 2;
  slides.style.top = remainder + "px";
  //console.log(remainder); 
  //console.log(heightLayer); 
  //console.log(heightGallery); 
  
  //const emuleLoad = document.getElementById('load');
  //const loadingIcon = document.getElementById('loading-icon');

  /*const landscapeImg = document.getElementsByClassName('slider-images');
  let landscape = 'landscape';
    for (let i = 0; i < landscapeImg.length; i++) {
      if (landscapeImg[i].height < landscapeImg[i].width) {
        slides.style.top = remainder + "px"; 
        console.log(landscape);         
      }
    }*/
  
  // отслеживание вертикальных изображений:  
  const portraitImg = document.getElementsByClassName('slider-images');
  //let portrait = 'portrait';
  for (let i = 0; i < portraitImg.length; i++) {
  //console.log(`${sizeImg[i].naturalWidth} x ${sizeImg[i].naturalHeight}`); // фактический размер 
                                                                             // изображения
                                                                                   
  //console.log(`${sizeImg[i].width} x ${sizeImg[i].height}`); // отображает размер <img> элемента  
          
    setTimeout(function recalculation() {        
      const slides = document.getElementsByClassName('slideshow-container')[0]; 
      const sizeLayer = document.getElementById('gallery-layer'); 
      let heightLayer = sizeLayer.offsetHeight;                                      
      let widthLayer = sizeLayer.offsetWidth;
      let heightGallery = slides.offsetHeight;  
      let widthGallery = slides.offsetWidth;
  
      // centering algorithm:
      let differenceLayerGallery = heightLayer - heightGallery;
      let remainder = differenceLayerGallery / 2;
      slides.style.top = remainder + "px";
      
      //emuleLoad.classList.setTimeOut(remove('emule-load'), 2000);
      galleryLayer.style.visibility = 'visible';
      emuleLoad.classList.remove('emule-load');
      loadingIcon.style.display = 'none';
             
    }, 1500);    

    if (portraitImg[i].height > portraitImg[i].width && widthLayer > heightLayer) {
            
      portraitImg[i].style.height = heightLayer + 'px';
      portraitImg[i].style.width = 'auto';
      //portraitImg[i].style.width = '42%';  
      portraitImg[i].style.margin = 'auto';
      slides.style.background = 'gray';             
      //console.log('if');
      
      
                   
    } else if (widthLayer < heightLayer) {
                                      
      /*setTimeout(function recalculation() {        
        const slides = document.getElementsByClassName('slideshow-container')[0]; 
        const sizeLayer = document.getElementById('gallery-layer'); 
        let heightLayer = sizeLayer.offsetHeight;                                       
        let widthLayer = sizeLayer.offsetWidth;
        let heightGallery = slides.offsetHeight;  
        let widthGallery = slides.offsetWidth;
        
        // centering algorithm:
        let differenceLayerGallery = heightLayer - heightGallery;
        let remainder = differenceLayerGallery / 2;
        slides.style.top = remainder + "px"; 
      }, 1500);*/
         
        //setTimeout(1500);
        portraitImg[i].style.height = 'auto';  
        portraitImg[i].style.width = '100%';                
        //console.log('else if');
                  
      } // else if
      
  } // for
  
  //    

} // lightboxCentering end

// Отслеживание изменения ориентации экрана:
//const emuleLoad = document.getElementById('load');
//const loadingIcon = document.getElementById('loading-icon');

// Window: resize event (https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event#event_type),
// https://developer.mozilla.org/ru/docs/Web/API/Window/resize_event - Last modified: 07 november 2022:
/*
// TODO - syntax variant
window.onresize = function () {
  setTimeout(lightboxCentering, 1500);
  const emuleLoad = document.getElementById('load');    
  galleryLayer.style.visibility = 'hidden';
  emuleLoad.classList.add('emule-load');
  loadingIcon.style.display = 'block';
}
*/
/* TODO - syntax variant
addEventListener("resize", function () {
  setTimeout(lightboxCentering, 1500);
  const emuleLoad = document.getElementById('load');    
  galleryLayer.style.visibility = 'hidden';
  emuleLoad.classList.add('emule-load');
  loadingIcon.style.display = 'block';
});
*/
///////////////////////

/*
let thj = window.matchMedia('(orientation: landscape)');
console.log(thj);
*/
/* TODO - Deprecated!
const around = 
  addEventListener("orientationchange", function () {
    //lightboxCentering();
    setTimeout(lightboxCentering, 1500);
    const emuleLoad = document.getElementById('load');    
    galleryLayer.style.visibility = 'hidden';
    emuleLoad.classList.add('emule-load');
    loadingIcon.style.display = 'block';
  });
*/

/////////////////////////////////////////////

// TODO - single image

let imgIndex = 1;
showImg(imgIndex);

function counterImg(w) {
  showImg(imgIndex = w);
}

function showImg(w) {
  const bigImg = document.getElementsByClassName('single-image');
  let i;
   
  if (w > bigImg.length) {
      imgIndex = 1
  }
    
  if (w < 1) {
      imgIndex = bigImg.length
  }
    
  
  for (i = 0; i < bigImg.length; i++) {
      bigImg[i].style.display = "none";
  }
    
  
  bigImg[imgIndex-1].style.display = "block";  

  //////// single image centering /////////   
  const sizeSingleLayer = document.getElementById('single-layer'); 
  let heightSingleLayer = sizeSingleLayer.offsetHeight;                                     
  //console.log(heightSingleLayer);

  let heightBigImg = bigImg[imgIndex-1].offsetHeight;
  //console.log(heightBigImg);
  
  // centering algorithm:
  let differenceLayerImg = heightSingleLayer - heightBigImg;
  let remain = differenceLayerImg / 2;
  
  if (heightBigImg < heightSingleLayer) {
      bigImg[imgIndex-1].style.top = remain + "px"; 
  } else if (heightBigImg > heightSingleLayer) {
      bigImg[imgIndex-1].style.top = 0 + "px";
  }

}


// Отслеживание изменения ориентации экрана:
addEventListener("resize", function () {
  showImg();
});


