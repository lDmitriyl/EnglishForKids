export default class MainBox{

    constructor(card){
        this.card = card;
        this.text = card[0];
        this.images = card[1];
    }

    createMainCard(img, text){

        const card = document.createElement('a');
        card.classList.add('main-card');
        const images = document.createElement('img');
        images.setAttribute('src',img);
        images.setAttribute('alt',text);
        card.insertAdjacentElement('beforeend',images);
        card.append(text);
        return card;

    }

    cardContainerContent(i){

        if(i == 0){

            const rating = document.createElement('div');
            rating.classList.add('rating','none'); 
            return rating;

        }else if(i == 1){

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('btns'); 
            const button = document.createElement('button');
            button.classList.add('btn','none'); 
            button.innerHTML = 'Start Game'; 
            buttonContainer.insertAdjacentElement('beforeend',button);
            return buttonContainer;

        }
    }

    render(main = false){

        if(!main){

            const mainContainer = document.createElement('div');
            mainContainer.classList.add('main-container');
            return mainContainer;

        }else{

            const mainContainer = document.createElement('div');
            mainContainer.classList.add('card-container','none');

            for(let i = 0; i < 2; i++){
                mainContainer.insertAdjacentElement('beforeend',this.cardContainerContent(i));
            }
            
            return mainContainer;
        }




       /* if(content == this.text[0]){
            for(let i = 0;i < this.images.length; i++){
                mainContainer.insertAdjacentElement('beforeend',this.createMainCard(this.images[i], this.text[i+1]))
            }
        }else{
            for(let i = 0;i < this.images.length; i++){
                mainContainer.insertAdjacentElement('beforeend',this.createTrainCard(this.card[this.text.indexOf(content) + 1],i))
            }  
        }
        return mainContainer;*/
    }
}