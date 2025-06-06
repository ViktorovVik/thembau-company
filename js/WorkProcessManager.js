export class WorkProcessManager {
    constructor() {
        this.buttons = document.querySelectorAll('.process__button');
        this.descriptionParagraph = document.querySelector('[data-js-text]');
        this.textsData = [];
    }

    async fetchData() {
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
        await this.fetchData();
        if (this.textsData && this.textsData.length > 0) {
            this.setInitialText(); 
            this.initEventListeners();
        } else {
            this.descriptionParagraph.textContent = 'Sorry, we couldn`t find a word...';
        }
    }

    setInitialText() {
        const initialItem = this.textsData.find(item => item.id === 'search-idea');
        this.descriptionParagraph.textContent = initialItem.text;
        this.descriptionParagraph.classList.add('is-visible');
    }

    initEventListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });
    }

    handleButtonClick(e) {
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


