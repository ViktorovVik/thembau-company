export class WorkProcessManager {
   constructor() {
      this.buttons = document.querySelectorAll('.process__button');
      this.descriptionParagraph = document.querySelector("[data-js-text]");
      this.textsData = [];
   }


   async fetchData() {
      try {
          const response = await fetch('../js/data/text.json');

          if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
         }

         const textData = await response.json();
         this.textsData = textData;
          
      } catch(error) {
         this.descriptionParagraph.textContent = 'Sorry, we couldn`t find enough words...'
          throw error;
      }
     
   }
}


