export class MobileMenu {
   constructor() {
      this.navMenu = document.querySelector('[data-js-nav-menu]');
      this.mobileButton = document.querySelector('[data-js-header-burger-button]');
      this.soc1alIcons = document.querySelector('[data-js-soc1als]');
      this.mobileButton.addEventListener('click', () => {
         this.openNav();
      })
   }

   openNav() {
      this.navMenu.classList.toggle('open');
      this.mobileButton.classList.toggle('active');
      this.soc1alIcons.classList.toggle('open');
   }
}

