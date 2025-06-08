import {MobileMenu} from './MobileMenu.js';
import {WorkProcessManager} from './WorkProcessManager.js';

const mobileNav = new MobileMenu();
const work = new WorkProcessManager();
await work.init()

const swiperHeader = new Swiper('.swiper-header', {
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

const valuesSwiper = new Swiper(".swiper-values", {
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: false,
    scrollbar: {
      el: '.swiper-scrollbar',
      clickable: true,
    },
    breakpoints: {
      760: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
    }
});

