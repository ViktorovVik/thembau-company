import {MobileMenu} from './MobileMenu.js'

const mobileNav = new MobileMenu();

const swiperHEader = new Swiper('.swiper-header', {
   loop: true,
   speed: 1000,
   keyboard: {
      enabled: true
   },
   slidesPerView: 1,
   spaceBetween: 0,

   pagination: {
      el: '.header-bottom__slider-controls-count',
      type: 'fraction',

      formatFractionTotal: function (total) {
        return String(total).padStart(2, '0');
      },
      formatFractionCurrent: function (current) {
        return String(current).padStart(2, '0');
      },
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
               '<span class="custom-swiper-line"></span>' + 
               '<span class="' + totalClass + '"></span>';
      }
   },

  navigation: {
    nextEl: '#sliderNext',
    prevEl: '#sliderPrev',
  },
});

