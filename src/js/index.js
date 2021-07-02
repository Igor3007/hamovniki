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
import 'overlayscrollbars/js/jquery.overlayScrollbars';

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
  //observeParents: true,
  navigation: {
    nextEl: '.slider-slider-nav__next',
    prevEl: '.slider-slider-nav__prev',
  },

  breakpoints: {
    0: {
      spaceBetween: 10,
      slidesPerView: 1,
      slidesPerView: 1.2,
      centeredSlides: false,
    },
    480: {
      spaceBetween: 10,
      centeredSlides: 'auto',
      
    },
    
    580: {
      spaceBetween: 20,
      slidesPerView: 1.8,
      centeredSlides: 'auto',
    },
    767: {
      spaceBetween: 20,
      slidesPerView: 2.5,
      centeredSlides: 'auto',
    },
    1024: {
      spaceBetween: 20,
      slidesPerView: 3.5,
      centeredSlides: 'auto',
    },
    1280: {
      spaceBetween: 27,
      centeredSlides: 'auto',
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
      spaceBetween: 15,
      slidesPerView: 1,
    },
    480: {
      spaceBetween: 15,
      slidesPerView: 1,
    },
    
    580: {
      spaceBetween: 25,
      slidesPerView: 1,
    },
    767: {
      spaceBetween: 25,
      slidesPerView: 1,
    },
    1024: {
      spaceBetween: 30,
      slidesPerView: 1.48,
    },
    1280: {
      spaceBetween: 30,
      slidesPerView: 1.48,
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
    1280: {
      spaceBetween: 27,
    },
  },

 

});

// .swiper-container gallery

var gallery = new Swiper('[data-swiper="gallery"]', {

  slidesPerView: 1.6,
  spaceBetween: 40,
  //observer: true,
  loop: true,
  centeredSlides: 'auto',
  //observeParents: true,
  //resizeObserver: true,
  navigation: {
    nextEl: '[data-swiper-next="gallery"]',
    prevEl: '[data-swiper-prev="gallery"]',
  },

  breakpoints: {
    0: {
      spaceBetween: 5,
      slidesPerView: 1,
    },
    360: {
      spaceBetween: 10,
      slidesPerView: 1.3,
    },

    768: {
      spaceBetween: 25,
    },

    1280: {
      spaceBetween: 30,
    },
  },

  on: {
    resize: function (event) {
      $('.swiper-gallery-nav').width(((event.height/0.65) + 220))
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

/* ================================================== */
//mask


/* ================================== */
/* ================================== */

$('.select-complex').on('click', function(event){
  
  $('.select-jk').toggleClass('open')
  $('html').toggleClass('hidden')
  
})

$('.select-jk input').on('change', function(event){
  
  let count = $('.select-jk input:checked').length

  $('[data-select-jk="select"] span').text(count)
  
})

$('[data-select-jk="close"], [data-select-jk="select"]').on('click', function(event){
  
  $('.select-complex').trigger('click')
  
})

$('.select-jk__wrp').overlayScrollbars({
  className: 'jk-scrollbar os-theme-dark'
});


//===================

const defaultText = $('[data-filter="toggleMoreParams"]').text()
const activeText = $('[data-filter="toggleMoreParams"]').data('active')

$(document).on('click', '[data-filter="toggleMoreParams"]', function(event){
  
  $('.catalog-filter__more').slideToggle(300)
  $(this).toggleClass('open')

  if($(this).hasClass('open')){
    $('[data-filter="toggleMoreParams"]').text(activeText)
  }else {
    $('[data-filter="toggleMoreParams"]').text(defaultText)
  }
  
})

/* =============== */



var minicard = new Swiper('[data-swiper="minicard"]', {

  slidesPerView: 1,
  spaceBetween: 5,
  observer: true,
  loop: true,
  observeParents: true,
  pagination: {
    el: '[data-swiper-dots="minicard"]',
    dynamicBullets: true,
  },

});

// ===========================

$(document).on('mouseenter', '.minicard__desc', function(event){
  
  $(this).parents('.minicard').addClass('hover')
  
})

$(document).on('mouseleave', '.minicard', function(event){
  
  $(this).removeClass('hover')
  
})

$(document).on('click', '[data-toggle]', function(event){
  var elem = $(this).attr('data-toggle')
  $('[data-toggle-elem="'+elem+'"]').toggleClass('active')
  $(this).toggleClass('active')
  
})

}); //ready