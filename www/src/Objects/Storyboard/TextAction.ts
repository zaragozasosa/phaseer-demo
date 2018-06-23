import BaseAction from './BaseAction';
export default class TextAction extends BaseAction {
  private text: Phaser.Text;
	private content: string;
	private letterLoop: Phaser.TimerEvent;
  words = [];
  word = '';
  letterIndex: number = 0;
	wordIndex: number = 0;
	

  readonly wordDelay: number = 50;
  readonly lineDelay: number = 50;

  constructor(action, parameters) {
    super(action, parameters);
    this.content = this.parameters[0];
    this.text = this.tools.text.makeXBounded(600, '', 40, 'left');
  }

  play() {
    this.words = this.content.split(' ');
    this.nextWord();
	}
	
	stop() {
		this.isFinished = true;
		this.letterLoop.loop = false;
		this.wordIndex = this.words.length;
		this.text.text = this.content;
	}

  private nextWord() {
    this.letterIndex = 0;
    this.word = this.words[this.wordIndex];
    if (!this.word) {
			this.isFinished = true;
      return;
		}
		
    this.letterLoop = this.tools.misc.repeatEvent(
      this.lineDelay,
      this.word.length,
      function() {
        this.nextLetter();
      }.bind(this)
    );

    this.wordIndex++;
  }

  private nextLetter() {
    if(this.isFinished) {
			return;
		}
    this.text.text += this.word[this.letterIndex];

    //  Advance the word index to the next word in the line
    this.letterIndex++;

    //  Last word?
    if (this.letterIndex === this.word.length) {
      this.tools.misc.runLater(
        this.word[this.letterIndex - 1] !== '.'
          ? this.wordDelay
          : this.wordDelay * 10,
        function() {
          this.text.text += ' ';
          this.nextWord();
        }.bind(this)
      );
    }
  }

  clear() {
    this.text.destroy();
  }
}
