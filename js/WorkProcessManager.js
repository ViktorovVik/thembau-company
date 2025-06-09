export class WorkProcessManager {
    constructor() {
        this.buttons = null; 
        this.descriptionParagraph = null;
        this.textsData = [];
    }

    async fetchData() {
        if (!this.descriptionParagraph) {
            return; 
        }

        try {
            const jsonPath = 'js/data/text.json';
            const response = await fetch(jsonPath);

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const textData = await response.json();
            this.textsData = textData;

        } catch (error) {
            this.descriptionParagraph.textContent = 'Sorry, we couldn`t find a word...'; 
        }
    }

    async init() {
        this.buttons = document.querySelectorAll('.process__button');
        this.descriptionParagraph = document.querySelector('[data-js-text]');

        if (!this.descriptionParagraph) {
            return; 
        }

        await this.fetchData();

        if (this.textsData && this.textsData.length > 0) {
            this.setInitialText(); 
            if (this.buttons && this.buttons.length > 0) {
                this.initEventListeners();
            }
        } else {
            this.descriptionParagraph.textContent = 'Sorry, we couldn`t find a word...';
        }
    }

    setInitialText() {
        if (!this.descriptionParagraph) return; 

        const initialItem = this.textsData.find(item => item.id === 'search-idea');
        if (initialItem) { 
            this.descriptionParagraph.textContent = initialItem.text;
            this.descriptionParagraph.classList.add('is-visible');
        } else {
            this.descriptionParagraph.textContent = 'Sorry, initial text not found...';
            this.descriptionParagraph.classList.add('is-visible');
        }
    }

    initEventListeners() {
        if (!this.buttons || this.buttons.length === 0) return; 

        this.buttons.forEach(button => {
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });
    }

    handleButtonClick(e) {
        if (!this.descriptionParagraph) return;

        const clickedId = e.target.dataset.id;
        const foundItem = this.textsData.find(item => item.id === clickedId);

        if (foundItem) {
            this.descriptionParagraph.classList.remove('is-visible');
            const transitionEndPromise = new Promise(resolve => {
                const onTransitionEnd = () => {
                    this.descriptionParagraph.removeEventListener('transitionend', onTransitionEnd);
                    resolve();
                };
                this.descriptionParagraph.addEventListener('transitionend', onTransitionEnd);
                setTimeout(() => {
                    resolve();
                }, 300); 
            });

            transitionEndPromise.then(() => {
                this.descriptionParagraph.textContent = foundItem.text;
                setTimeout(() => {
                    this.descriptionParagraph.classList.add('is-visible');
                }, 10);
            });

        } else {
            this.descriptionParagraph.textContent = 'Sorry, we couldn`t find a word...';
            this.descriptionParagraph.classList.add('is-visible');
        }
    }
}

