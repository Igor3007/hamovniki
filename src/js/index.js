import "./import/modules";
import "./import/components";
import svgPolyfill from "../../node_modules/svg4everybody/dist/svg4everybody.js";
import Swiper, {
  Pagination,
  Navigation,
  Thumbs,
  Autoplay,
} from 'swiper';
import 'jquery.inputmask/dist/jquery.inputmask.bundle';

import $ from 'jquery';
import './import/jquery.fancybox.min';

svgPolyfill();
Swiper.use([Pagination, Navigation]);



$(document).ready(function () {

  // .swiper-container

var region = new Swiper('[data-swiper="region"]', {

  slidesPerView: 4,
  spaceBetween: 27,
  observer: true,
  centeredSlides: 'auto',
  loop: true,
  observeParents: true,
  navigation: {
    nextEl: '.slider-slider-nav__next',
    prevEl: '.slider-slider-nav__prev',
  },

  breakpoints: {
    0: {
      spaceBetween: 5,
      slidesPerView: 1,
    },
    480: {
      spaceBetween: 5,
    },
    
    580: {
      spaceBetween: 15,
    },
    767: {
      spaceBetween: 15,
    },
    1024: {
      spaceBetween: 15,
    },
    1280: {
      spaceBetween: 27,
    },
  },

});


// .swiper-container current-offers

var curroff = new Swiper('[data-swiper="current-offers"]', {

  slidesPerView: 1.48,
  spaceBetween: 43,
  //observer: true,
  loop: true,
  centeredSlides: 'auto',
  //observeParents: true,
  navigation: {
    nextEl: '[data-swiper-next="current-offers"]',
    prevEl: '[data-swiper-prev="current-offers"]',
  },

  breakpoints: {
    0: {
      spaceBetween: 5,
      slidesPerView: 1,
    },
    480: {
      spaceBetween: 5,
    },
    
    580: {
      spaceBetween: 15,
    },
    767: {
      spaceBetween: 15,
    },
    1024: {
      spaceBetween: 15,
    },
    1280: {
      spaceBetween: 27,
    },
  },

  on: {
    afterInit: function () {

      var curroff = new Swiper('[data-swiper="current-offers-item"]', {

        slidesPerView: 4,
        spaceBetween: 0,
        direction: "vertical",
      
      });

    },
  },

});


// .swiper-container specialists

var specialist = new Swiper('[data-swiper="specialists"]', {

  slidesPerView: 1.2,
  spaceBetween: 40,
  //observer: true,
  loop: true,
  centeredSlides: 'auto',
  //observeParents: true,
  navigation: {
    nextEl: '[data-swiper-next="specialists"]',
    prevEl: '[data-swiper-prev="specialists"]',
  },

  breakpoints: {
    0: {
      spaceBetween: 5,
      slidesPerView: 1,
    },
    480: {
      spaceBetween: 5,
    },
    
    580: {
      spaceBetween: 15,
    },
    767: {
      spaceBetween: 15,
    },
    1024: {
      spaceBetween: 15,
    },
    1280: {
      spaceBetween: 27,
    },
  },

 

});

//event

 
/* ======================================================
======================================================*/

$(document).on('click', '[data-gallery="current-thumb"] li a', function(event){
  
  event.preventDefault()

  $(this).parents('ul').find('li').removeClass('active')
  $(this).parent().addClass('active')

  let link = $(this).attr('href')

  $(this).parents('.item-offer').find('[data-gallery="current-full"] .bgimage').css({
    'background-image': 'url('+link+')',
  })
  
})

$(document).on('click', '[data-gallery="current-full"] a', function(event){

  event.preventDefault()
  
  const images = $(this).parents('.item-offer').find('[data-gallery="current-thumb"] li');
  const imagesArr = [];

  images.each(function(){

    imagesArr.push({
      src  : $(this).find('a').attr('href'),
      type : 'image' 
    })

  })

  $.fancybox.open(imagesArr, {
    loop : false,
    animationEffect: "zoom",
  });

  const activeSlide = $(this).parents('.item-offer').find('[data-gallery="current-thumb"] li.active').index()


  $.fancybox.getInstance().jumpTo(activeSlide);
  
})
  

}); //ready