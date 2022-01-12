export default class State{
    constructor(page, currentCard, play, playActive, randomArr, errors, endGame) {
      this.page = page;
      this.currentCard = currentCard;
      this.play = play;
      this.playActive = playActive;
      this.randomArr = randomArr;
      this.errors =errors;
      this.endGame = endGame;
    }
    
    static state(page = 0, currentCard = 0, play = false, playActive = false, randomArr = [], errors = 0, endGame = false) {
      return new State(
        page,
        currentCard,
        play,
        playActive,
        randomArr,
        errors,
        endGame
      );
    }



  }