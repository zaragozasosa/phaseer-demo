import Tile from './Tile';
export default class GameboardConfig {
  mainTile: Tile;
  arraySize: number;
  initialArray: Array<number>;
  minimumValue: number;
  tiles: Array<Tile>;
  groups: Array<string>;

  constructor() {
    this.arraySize = 3;
    this.initialArray = [];
    for (let x = 0; x <= this.arraySize; x++) {
      for (let y = 0; y <= this.arraySize; y++) {
        this.initialArray.push(0);
      }
    }
    this.minimumValue = 1;
    this.createTiles();
  }

  createTiles() {
    let list = new Array<Tile>();
    list.push(
      new Tile(
        'nacho',
        'Nacho',
        'Ignacio Zaragoza',
        'chili',
        'gunshot.mp3',
        '5DeMayo',
        'Cinco de Mayo',
        'A simple boy who claims being the long descendant of a famous general. His dog Chili often gets lost when visiting the park.'
      )
    );

    list.push(
      new Tile(
        'chili',
        'Chili',
        'Chili Bagel',
        'nacho',
        'bark.wav',
        '5DeMayo',
        'Cinco de Mayo!',
        "Hey, you shouldn't be able to read this!",
      )
    );

    list.push(
      new Tile(
        'mira',
        'Mira',
        'Black Witch Mira',
        'fancy',
        'ahaha.wav',
        'blackMagic',
        'Black Magic',
        'Mira is a fickle, cruel witch that enjoys throwing humans into murder games. Also a low-profile online writer, only publishes using pen names.'
      )
    );

    list.push(
      new Tile(
        'fancy',
        'Lord Fancy',
        'Sir Lord Fancypants',
        'lord-fancy',
        'portal.mp3',
        'blackMagic',
        'Black Magic',
        'Fancy demon at day, even fancier at night. This creature of elegant nature was hired by Mira to capture humans and bake cookies.'
      )
    );

    list.push(
      new Tile(
        'kinjo',
        'Kinjo',
        'Kinjo Goldbar',
        'joueur',
        'coin.wav',
        'timeTravel',
        'Time Travel',
        "Famous indie developer addicted to vodka. One of his code's bugs ripped through the fabric of reality, now his day isn't complete without spontaneous time traveling."
      )
    );

    list.push(
      new Tile(
        'joueur',
        'Joueur',
        'XxX-Joueur-Timide-PRO-XxX',
        'kinjo',
        'sorry.wav',
        'timeTravel',
        'Time Travel',
        "Canadian pro-gamer online, shy as hell in real life. Afraid of social interaction, hides her gender online. Big fan of Kinjo's work."
      )
    );

    list.push(
      new Tile(
        'smith',
        'Agent Smith',
        'Codename: S.N.O.W',
        'lily',
        'radio.mp3',
        'detectiveWork',
        'Detective Work',
        'Top trained FBI agent, impossible crimes and murders are his speciality. Fluently speaks 32 languages, expert cook, master of observation and deduction.'
      )
    );

    list.push(
      new Tile(
        'lily',
        'Lily',
        'Lily Hast',
        'smith',
        'sweeping.wav',
        'detectiveWork',
        'Detective Work',
        'A clumsy maid devoted to her master. Cleaning is her passion and she likes to do her job thoroughly. Sometimes too thoroughly.'
      )
    );

    list.push(
      new Tile(
        'bren',
        'Bren',
        'Brotherhating_ridiculously_efficient_nerd.py',
        'meushijyo',
        'wow.wav',
        'powerGaming',
        'Power Gaming',
        'Cutting-edge sentinent Artificial Intelligence. Instead of planning the end of the world, this script enjoys munching numbers, playing games and explaining why other players suck.'
      )
    );

    list.push(
      new Tile(
        'meushijyo',
        'Meushi',
        'Meushi Jyoji',
        'bren',
        'keyboard.mp3',
        'powerGaming',
        'Power Gaming',
        'Genius programmer, created BREN trying to code the perfect little sister, but now she refuses to listen to him. Could get a job anywhere he wanted, but prefers the NEET lifestyle.'
      )
    );

    list.push(
      new Tile(
        'rox',
        'Roxx',
        'Roxx Ann',
        'choco',
        'fire.mp3',
        'gachaAddiction',
        'Gacha Addiction',
        "A reserved fairy who comes from the Land of Fiction, highly skilled in fire magic. Often visits our world looking for books or japanese media. Choco's close friend."
      )
    );

    list.push(
      new Tile(
        'choco',
        'Choco',
        'Choco Jax',
        'rox',
        'pencil.mp3',
        'gachaAddiction',
        'Gacha Addiction',
        'Professional digital artist with a worrysome tendency to Gacha games. Close friend of Rox, they met each other years ago through the popular online community "Neon Virtual Pets: Z".'
      )
    );

    list.push(
      new Tile(
        'attarou',
        'Attarou',
        'Attarou Lionstar',
        'r1r1',
        'meow.wav',
        'reportedForRP',
        'Reported for RP',
        'Cosplay amateur, full of creativity. Capable of taking a bunch of trash and creating a totally functional budget costume. His cat often accompanies him to cons.'
      )
    );

    list.push(
      new Tile(
        'r1r1',
        'R1-R1',
        'Autonomous Socialization Unit R1-R1',
        'attarou',
        'letsrock.wav',
        'reportedForRP',
        'Reported for RP',
        "Highly advanced robotic entity, fugitive from the secret lab where it was assembled, this robot now spends his time in what it found most interesting, human's roleplaying."
      )
    );

    list.push(
      new Tile(
        'magil',
        'Magil',
        'Dungeon Master Magil',
        'jessy',
        'dice.mp3',
        'rollForInit',
        'Roll for Initiative!',
        'Dungeon Master of legend, owner of a thousand stories. Has been trying to get her friend Jessy into roleplaying games for a while, without much success.'
      )
    );

    list.push(
      new Tile(
        'jessy',
        'Jessy',
        'Ph.D. Jessy',
        'magil',
        'red.mp3',
        'rollForInit',
        'Roll for Initiative!',
        "Witch Doctor, psychologist and compulsive liar. When she's not out in a distant galaxy, the psych enjoys spending time with Magil, although she's not very fond of the nerdy stuff."
      )
    );

    this.groups = [];
    for (let x = 0; x < list.length; x++) {
      if (
        !this.groups.find(function(item) {
          return item === list[x].powerId;
        })
      ) {
        this.groups.push(list[x].powerId);
      }
    }

    this.tiles = list;
  }
}
