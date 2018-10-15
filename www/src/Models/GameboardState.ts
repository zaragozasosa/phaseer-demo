export default class GameboardState {	
  gameOver: boolean;
  wonGame: boolean;
  userControl: boolean;
  
  constructor(
  ) {
    this.gameOver = false;
    this.wonGame = false;
    this.userControl = false;
  }
}