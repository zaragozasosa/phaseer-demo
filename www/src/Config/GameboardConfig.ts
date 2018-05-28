import TileModel from './../Models/TileModel';
export default class GameboardConfig {
  mainTile: TileModel;
  arraySize: number;
  winningTile: number;
  initialArray: Array<number>;
  minimumValue: number;
  tiles: Array<TileModel>;
  groups: Array<string>;

  constructor() {
    this.arraySize = 3;
    this.winningTile = 512;
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
    let list = new Array<TileModel>();

    list.push(
      new TileModel(
        'meushijyo',
        'Meushi',
        'Meushi Jyoji',
        'bren',
        'keyboard.mp3',
        'powerGaming',
        'Power Gaming',
        'Genius programmer. Created B.R.E.N. trying to code the perfect little sister, but the project backfired and now she refuses to listen to him. Could get a job anywhere he wanted, but prefers the NEET lifestyle.'
      )
    );

    list.push(
      new TileModel(
        'bren',
        'B.R.E.N.',
        'brotherhating ridiculously efficient nerd.py',
        'meushijyo',
        'wow.wav',
        'powerGaming',
        'Power Gaming',
        'Cutting-edge sentient Artificial Intelligence who even rewrote her own name. Instead of planning the end of the world, or paying any attention to his maker, this script enjoys crunching numbers, playing games and explaining why other players suck.'
      )
    );

    list.push(
      new TileModel(
        'rox',
        'Roxx',
        'Roxx Ann',
        'choco',
        'page.mp3',
        'gachaAddiction',
        'Gacha Addiction',
        "A kind, reserved fairy who comes from the Land of Fiction. Highly skilled in fire magic. Often visits our world looking for books or Japanese media. Stays in touch with Choco using the interdimensional computer network."
      )
    );

    list.push(
      new TileModel(
        'choco',
        'Choco',
        'Choco Jax',
        'rox',
        'chachin.mp3',
        'gachaAddiction',
        'Gacha Addiction',
        'Professional digital artist with a worrisome gambling habit (please join my Patreon!). Close friend of Rox. They met each other years ago through the popular online community “Neon Virtual Pets: Z”.'
      )
    );

    list.push(
      new TileModel(
        'smith',
        'Agent Smith',
        'Codename: S.N.O.W',
        'lily',
        'radio.mp3',
        'detectiveWork',
        'Detective Work',
        'Highly-trained FBI agent. Impossible crimes and high profile murder cases are his specialty. Fluently speaks 32 languages, expert cook, master of observation and deduction.'
      )
    );

    list.push(
      new TileModel(
        'lily',
        'Lily',
        'Lily Hast',
        'smith',
        'sweeping.wav',
        'detectiveWork',
        'Detective Work',
        `A clumsy maid devoted to her master. She is often teased for not being too quick on the uptake. Nevertheless, she makes for a good Watson and is passionate about it. Lily's other passion is cleaning and she likes to do her job thoroughly. Sometimes too thorougly. Nothing can stop her. You should run...`
      )
    );

    list.push(
      new TileModel(
        'kinjo',
        'Kinjo',
        'Kinjo Goldbar',
        'eleve',
        'coin.wav',
        'timeTravel',
        'Time Travel',
        "Famous indie developer with a vodka addiction. One of his software bugs ripped through the fabric of reality. Now his day isn't complete without some spontaneous time traveling."
      )
    );

    list.push(
      new TileModel(
        'eleve',
        `L'Élève`,
        `L'Élève-Avancé-Timide`,
        'kinjo',
        'sorry.wav',
        'timeTravel',
        'Time Travel',
        "Canadian pro-gamer online, shy as hell waitress in real life. Being very afraid of social interaction, she's forced to hide her identity on the internet. Number 1 fan of Kinjo's works."
      )
    );

    list.push(
      new TileModel(
        'attarou',
        'Attarou',
        'Attarou Lionstar',
        'r1r1',
        'meow.wav',
        'reportedForRP',
        'Reported for RP',
        "Heir to the Lionstar family headship, owner of a never-ending fortune. This prince, however, rejects his own lineage and indulges in low-budget cosplaying. He's often seen in cons around the world, always accompanied by his cat, Caesar."
      )
    );

    list.push(
      new TileModel(
        'r1r1',
        'R1-R1',
        'Autonomous Socialization Unit',
        'attarou',
        'letsrock.wav',
        'reportedForRP',
        'Reported for RP',
        'The latest model in state-of-the-art synthetic robotics. After escaping from a hidden lab, this lively robot now makes use of its advanced technology in the most obvious fashion: roleplaying as a human...'
      )
    );

    list.push(
      new TileModel(
        'magil',
        'Magil',
        'Dungeon Master Magil',
        'jessy',
        'dice.mp3',
        'rollForInit',
        'Roll for Initiative!',
        'Dungeon Master of legend, crafter of a thousand stories. Rumoured to be a dragon. Always looking for a new game; has been trying to get her friend Jessy into roleplaying games for a while without much success.'
      )
    );

    list.push(
      new TileModel(
        'jessy',
        'Jessy',
        'Ph.D. Jessy',
        'magil',
        'red.mp3',
        'rollForInit',
        'Roll for Initiative!',
        "Witch Doctor, psychologist, and a compulsive liar. When she's not roaming a distant galaxy, this academic enjoys spending time with Magil, although she's not very fond of all that nerdy stuff."
      )
    );

    list.push(
      new TileModel(
        'mira',
        'Mira',
        'Black Witch Mira',
        'fancy',
        'ahaha.wav',
        'blackMagic',
        'Black Magic',
        "A fickle, cruel witch who enjoys throwing humans inside murder games and watching them lose their sanity. She's also a low-profile online writer who only publishes using pen names."
      )
    );

    list.push(
      new TileModel(
        'fancy',
        'Lord Fancy',
        'Sir Lord Fancypants',
        'lord-fancy',
        'hyehye.mp3',
        'blackMagic',
        'Black Magic',
        'Fancy demon by day, even fancier by night. This creature of elegant nature was contracted by Mira to capture humans, fend off witch hunters, and bake cookies.'
      )
    );
    list.push(
      new TileModel(
        'nacho',
        'Nacho',
        'Ignacio Zaragoza',
        'chili',
        'gunshot.mp3',
        '5DeMayo',
        'Cinco de Mayo',
        'A simple guy who claims to be the long-lost descendant of a deceased famous general. Enjoys lazing around his computer and drinking overpriced beer. His dog Chili often gets lost when visiting the park.'
      )
    );
    list.push(
      new TileModel(
        'chili',
        'Chili',
        'Chili Bagel',
        'nacho',
        'howl.mp3',
        '5DeMayo',
        'Cinco de Mayo!',
        "Hey, you shouldn't be able to read this!",
        false
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
