import Header from '@models/header';
import MainBox from '@models/mainBox';
import Card from '@models/card';
import './styles/styles.css';

export default class Game {

  constructor(cards,mode){
    this.cards = cards
    this.mode = mode;
    this.images = cards[1];
    this.text = cards[0];
    
  }

  gameStatus = false;
  static header='';
  static count = 0;
  static error = 0;

  init(){

      this.header = new Header(this.cards).render();
      this.burgerMenu = new Header(this.cards).createBurgerMenu();
      this.buttonSwitcher = new Header(this.cards).createButtonSwitcher();

      Array.from(this.header.firstElementChild.children).forEach((elem ,i) => {
        if(i == 0) elem.insertAdjacentElement('beforeend', this.burgerMenu);
        if(i == 1) elem.insertAdjacentElement('beforeend', this.buttonSwitcher);
      });

      this.mainContainer = new MainBox(this.cards).render();
      this.cardContainer = new MainBox(this.cards).render(true);
      document.body.prepend(this.header, this.mainContainer, this.cardContainer);
      return this;
  }

  toggleMenu(menu) {
        menu.classList.toggle('burger-menu_active');
  }

  shuffle(arr){
      let j , temp;

      for(let i = arr.length-1; i > 0; i--){
        j = Math.floor(Math.random()*(i+1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }

      return arr;
  }

  gameSwitch(status, span){

    status ? span.setAttribute('data-on','Train'): span.setAttribute('data-on','');
    status ? span.setAttribute('data-off',''): span.setAttribute('data-off','Play');
    status ? this.mode = 'train': this.mode = 'play';
    status ? this.buttonSwitcher.classList.remove('orange'): this.buttonSwitcher.classList.add('orange');
    status ? this.burgerMenu.firstElementChild.classList.remove('burger-orange'): this.burgerMenu.firstElementChild.classList.add('burger-orange');
    status ? Array.from(this.mainContainer.children).forEach(i => i.classList.remove('orange')):Array.from(this.mainContainer.children).forEach(i => i.classList.add('orange'));
    status ? this.burgerMenu.lastElementChild.classList.remove('orange') : this.burgerMenu.lastElementChild.classList.add('orange');
    status ? this.cardContainer.children[9].lastChild.classList.add('none') : this.cardContainer.children[9].lastChild.classList.remove('none');

    if(status){

      this.trainCard.forEach((item, i) =>{
        item.firstElementChild.children[0].style.backgroundSize = 'contain';
        item.firstElementChild.children[0].style.backgroundPosition = '';
        Array.from(item.firstElementChild.children[0].children).forEach(item =>{
          item.classList.remove('none');
        })
      });

    }else{

      this.trainCard.forEach((item, i) =>{
        item.firstElementChild.children[0].style.backgroundSize = 'cover';
        item.firstElementChild.children[0].style.backgroundPosition = '50%';

        Array.from(item.firstElementChild.children[0].children).forEach(item =>{
          item.classList.add('none');
        })
      });

      this.cardContainer.lastElementChild.firstChild.classList.remove('repeat','none');  
    }    

    Array.from(this.cardContainer.firstElementChild.children).forEach(item => item.remove());
    this.trainCard.forEach(item => item.firstElementChild.firstChild.classList.remove('inactive'));  
    this.gameStatus = false;
  }

  gameEnd(status){

    let game = '';
    status ? game = new Audio('../src/assets/audio/success.mp3'): game = new Audio('../src/assets/audio/failure.mp3');
    game.play();
    status ? document.body.classList.add('success'):document.body.classList.add('failure');
    Array.from(this.cardContainer.firstElementChild.children).forEach(item => item.remove());
    this.cardContainer.firstElementChild.style.justifyContent='center';
    status ? this.cardContainer.firstElementChild.textContent = 'you win!!!': this.cardContainer.firstElementChild.textContent = `you lose(you have ${Game.error} error) `;

    Array.from(this.cardContainer.children).forEach(item => {if(item.classList.contains('t3d')) item.classList.add('none')})
    this.cardContainer.lastElementChild.firstChild.classList.add('none');

    setTimeout(()=> {
      this.cardContainer.firstElementChild.style.justifyContent='flex-end';
      this.cardContainer.firstElementChild.textContent='';
      this.cardContainer.lastElementChild.firstChild.classList.remove('repeat','none');
      
      Array.from(this.cardContainer.children).forEach(item => {if(item.classList.contains('t3d')) item.classList.remove('none')})
      this.cardContainer.classList.add('none');
      status ? document.body.classList.remove('success'):document.body.classList.remove('failure');
      this.mainContainer.classList.remove('none');
    },2000);

    this.gameStatus = false;
  }

  generateLayout(){

    this.mainCard = [];
    this.trainCard = [];

    for(let i=0 ;i < this.images.length; i++){
        const card = new Card().createMainCard(this.images[i], this.text[i+1]);
        this.mainCard.push(card);
        this.mainContainer.insertAdjacentElement('beforeend',card);
    }

    for(let i = 0 ;i < this.text.length-1; i++){
      const card = new Card().createTrainCard('Action (set A)', i, false);
      this.trainCard.push(card);
      this.cardContainer.lastElementChild.before(card);
    }

    this.burgerMenu.firstElementChild.addEventListener('click',(e) =>{
      e.preventDefault();
        this.toggleMenu(this.burgerMenu);
    });

    /*BurgerMenu*/ 

    this.burgerMenu.lastElementChild.addEventListener('click',(e) =>{

      if(e.target.classList.contains('burger-menu__link')){
        Array.from(this.burgerMenu.lastElementChild.children).forEach(el=>{
          el.classList.remove('active');
        });
        Game.header = e.target.text;
        this.cardContainer.lastElementChild.firstChild.classList.remove('repeat');

        if(e.target.text == 'Main Page'){

          this.mainContainer.classList.remove('none');
          this.cardContainer.classList.add('none');
          this.toggleMenu(this.burgerMenu);
          e.target.classList.add('active');

        }else{

          this.mainContainer.classList.add('none');
          this.cardContainer.classList.remove('none');
          this.toggleMenu(this.burgerMenu);
          e.target.classList.add('active');
          this.trainCard.forEach((item, i) =>{

            let card = this.cards[this.text.indexOf(Game.header)+1]

            Array.from(item.firstElementChild.children).forEach((item,count) =>{
              item.style.backgroundImage = `url(${card[i].image})`;
              count == 0 ? item.firstElementChild.textContent = `${card[i].word}`: item.firstElementChild.textContent = `${card[i].translation}`;
            })

          })
        } 
      }  

      this.gameStatus = false;
      Array.from(this.cardContainer.firstElementChild.children).forEach(item => item.remove());
    this.trainCard.forEach(item => item.firstElementChild.firstChild.classList.remove('inactive')); 
    });
    
    /*mainContainer*/ 

    this.mainContainer.addEventListener('click',(e) => {
      
      if(e.target.classList.contains('main-card')||e.target.tagName =='IMG'){

        Array.from(this.burgerMenu.lastElementChild.children).forEach(el=>{

          el.classList.remove('active');
          if(el.text == e.target.text || el.text == e.target.alt) el.classList.add('active');

        });

        e.target.classList.contains('main-card') ? Game.header = e.target.text : Game.header = e.target.alt;
        this.mainContainer.classList.add('none');
        this.cardContainer.classList.remove('none');

        this.trainCard.forEach((item, i) =>{

          let card = this.cards[this.text.indexOf(Game.header)+1]

          Array.from(item.firstElementChild.children).forEach((item,count) =>{

            item.style.backgroundImage = `url(${card[i].image})`;
            count == 0 ? item.firstElementChild.textContent = `${card[i].word}`: item.firstElementChild.textContent = `${card[i].translation}`;

          })
        });
      }
    });

    /*cardContainer*/ 

    this.cardArr = [];
    this.audio = '';
    this.cardContainer.addEventListener('click',(e) => {

      if(this.mode == 'train'){

        if((e.target.classList.contains('front')||e.target.classList.contains('card-header')) && this.mode == 'train'){

          let audioElement='';

          if(e.target.classList.contains('front')){
            audioElement = new Audio('../src/assets/audio/' + e.target.textContent + '.mp3');
          }else{
            audioElement = new Audio('../src/assets/audio/' + e.target.textContent + '.mp3');
          }

          audioElement.play();

        }else if(e.target.classList.contains('button-rotate')){

          const rotate1 = e.target.offsetParent.offsetParent;
          e.target.addEventListener('click',function(){

            rotate1.style.transform = "rotateY(180deg)";
            rotate1.addEventListener('mouseleave',function(){
              rotate1.style.transform = "";

            })
          })
        }
      }else{

        const success = document.createElement('div');
        success.classList.add('star-success');
        const error = document.createElement('div');
        error.classList.add('star-error');
        this.error = new Audio('../src/assets/audio/error.mp3');
        this.success = new Audio('../src/assets/audio/correct.mp3');

        if(e.target.classList.contains('btn') && !e.target.classList.contains('repeat') && this.gameStatus == false){

          Game.count = 0;
          Game.error = 0;
          this.cardArr = this.shuffle(this.cards[this.text.indexOf(Game.header)+1]);
          this.audio = new Audio(`${this.cardArr[Game.count].audioSrc}`);
          this.gameStatus = true;
          e.target.classList.add('repeat');
          this.cardContainer.firstElementChild.classList.remove('none');
          this.audio.play();

        }

        if(e.target.classList.contains('btn') && e.target.classList.contains('repeat') && this.gameStatus == true){
          this.audio.play();
        }

        if(e.target.textContent == this.cardArr[Game.count].word && this.gameStatus == true){

          this.cardContainer.firstElementChild.prepend(success);
          e.target.classList.add('inactive');
          this.success.play();
          Game.count++;

          if(Game.count == 8){

            if(Game.error == 0){
             this.gameEnd(true);
            }else{
              this.gameEnd(false);
            }

            this.trainCard.forEach(item => item.firstElementChild.firstChild.classList.remove('inactive')); 
          }else{

          this.audio = new Audio(`${this.cardArr[Game.count].audioSrc}`);
          setTimeout(()=> this.audio.play(),1500);

          }

        }else if(e.target.classList.contains('front') && !e.target.classList.contains('inactive') && this.gameStatus == true){

          this.cardContainer.firstElementChild.prepend(error);
          this.error.play();
          Game.error++;

        }
      }
    });

    /*buttonSwitcher*/ 

    this.buttonSwitcher.addEventListener('click',(e) => {

      if(e.target.classList.contains('switch-input')){

        let span = this.buttonSwitcher.querySelector('.switch-span');

        if(e.target.checked === true){
         this.gameSwitch(true, span)
        }else{
          this.gameSwitch(false, span)
        }

     }
    });
  }
}

