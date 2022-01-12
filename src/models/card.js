export default class Card{

    constructor(){

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

    TrainCardRotate(i,cardInfo,back = false, state){
        
        if(i == 0){

            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            state ? cardHeader.classList.add('none') : cardHeader.classList.remove('none');
            !back ? cardHeader.innerHTML = cardInfo.word : cardHeader.innerHTML = cardInfo.translation;
            return cardHeader;

        }else if(i == 1){

            const button = document.createElement('div');
            button.classList.add('button-rotate');
            state ? button.classList.add('none') : button.classList.remove('none');
            return button;

        }
        
    }

    createTrainCard(content, count, state){

        const cardInfo = content[count];
        const card3d = document.createElement('div');
        card3d.classList.add('t3d');
        const card = document.createElement('div');
        card.classList.add('rotate');
        const frontCard = document.createElement('div');
        frontCard.classList.add('front');
        state ? frontCard.style.backgroundSize = 'cover' : frontCard.style.backgroundSize = 'contain';
        frontCard.style.backgroundImage = `url(${cardInfo.image})`;

        for(let i = 0; i < 2; i++){
            frontCard.insertAdjacentElement('beforeend',this.TrainCardRotate(i,cardInfo, false, state));
        }

        card.insertAdjacentElement('beforeend',frontCard);
        const backCard = document.createElement('div');
        backCard.classList.add('back');
        backCard.style.backgroundImage = `url(${cardInfo.image})`;
        backCard.insertAdjacentElement('beforeend',this.TrainCardRotate(0,cardInfo, true));
        card.insertAdjacentElement('beforeend',backCard);
        card3d.insertAdjacentElement('beforeend',card);
        return card3d;
    }
}