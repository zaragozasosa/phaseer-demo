import TileModel from './../Models/TileModel';
import PowerModel from './../Models/PowerModel';

import BaseAction from './../Objects/Storyboard/Actions/BaseAction';
import TextAction from './../Objects/Storyboard/Actions/TextAction';
import SpriteAction from './../Objects/Storyboard/Actions/SpriteAction';
import TitleAction from './../Objects/Storyboard/Actions/TitleAction';

export default class GameboardConfig {
  mainTile: TileModel;
  arraySize: number;
  winningTile: number;
  initialArray: Array<number>;
  minimumValue: number;
  tiles: Array<TileModel>;
  groups: Array<string>;

  bulletAmmo: number;
  diceAmmo: number;
  requiredDiamonds: number;
  requiredBugs: number;

  updateScoreSignal: Phaser.Signal;
  toggleButtonSignal: Phaser.Signal;
  clickTileSignal: Phaser.Signal;
  updateAmmoSignal: Phaser.Signal;
  mergeTileSignal: Phaser.Signal;
  chargeSignal: Phaser.Signal;
  cooldownSignal: Phaser.Signal;
  turnsSignal: Phaser.Signal;

  gameOverSignal: Phaser.Signal;

  powers: Array<PowerModel>;

  detectiveInvestigationStory: Array<BaseAction>;
  detectiveInvestigationStory2: Array<BaseAction>;

  static readonly BUTTON_ACTIVE = 1;
  static readonly BUTTON_SLEEP = 2;
  static readonly BUTTON_SLEEP_DISABLED = 3;

  constructor() {
    this.arraySize = 3;
    this.initialArray = [];
    for (let x = 0; x <= this.arraySize; x++) {
      for (let y = 0; y <= this.arraySize; y++) {
        this.initialArray.push(0);
      }
    }
    this.minimumValue = 1;
    this.winningTile = 512;    
    this.bulletAmmo = 5;
    this.diceAmmo = 6;
    this.requiredDiamonds = 50;
    this.requiredBugs = 40;
    this.createPowers();
    this.createStories();
    this.createTiles();
  }

  createPowers() {
    let powers = [];

    powers.push(
      new PowerModel(
        'powerGaming',
        'Power Gaming',
        'Duplicate the value of every tile in the board below 32.',
        'Have at least one tile below 32'
      )
    );

    powers.push(
      new PowerModel(
        'powerGaming',
        'Power Gaming',
        'Duplicate the value of every tile in the board below 32.',
        'Have at least one tile below 32'
      )
    );

    powers.push(
      new PowerModel(
        'gachaAddiction',
        'Gacha Addiction',
        'Collect diamonds! Use them to fully randomize your board!',
        `Have at least 3 different kind of tiles and ${this
          .requiredDiamonds} diamonds.`
      )
    );

    powers.push(
      new PowerModel(
        'detectiveWork',
        'Detective Work',
        'Control the flow of new tiles. Changing this flow will require you to wait a few turns.\n\n' +
          'You can also investigate to create a ghost tile. Be careful, the higher your tiles are, the hardest it will be to merge.'
      )
    );

    powers.push(
      new PowerModel(
        'timeTravel',
        'Hello World: Time stops',
        'Collect bugs! Use this power to stop the new tile from appearing for a few turns. Then, the new tiles will appear all together!',
        `Have ${this.requiredDiamonds} bugs.`
      )
    );

    powers.push(
      new PowerModel(
        'reportedForRP',
        'Reported for RP',
        '3 charges, 3 different powers! Use them at any time you want.\n\n' +
          '* Sage: Will fill your grid with low value tiles if you have space.\n' +
          '* Report: Will remove low value tiles, if you have any.\n' +
          '* Ban: Will remove every tile except your highest.'
      )
    );

    powers.push(
      new PowerModel(
        'rollForInitiative',
        'Roll for Initiative',
        'Randomize any tile you want by clicking on it! Can be used 5 times.',
        'Have at least 3 different kind of tiles.'
      )
    );

    powers.push(
      new PowerModel(
        'blackMagic',
        'Black Magic',
        'Merge all your tiles, from the lowest to the highest!',
        'Have at least 6 tiles on the grid.'
      )
    );

    powers.push(
      new PowerModel(
        'cincoDeMayo',
        'Cinco de Mayo',
        `Destroy any tile you want by clicking on it! Can be used ${this
          .bulletAmmo} times.`,
        'Have at least more than one tile on the grid.'
      )
    );

    this.powers = powers;
  }

  createTiles() {
    let list = new Array<TileModel>();

    list.push(
      new TileModel(
        'meushi',
        'Meushi',
        'Meushi Jyoji',
        'bren',
        'keyboard.mp3',
        0.8,
        'powerGaming',
        this.powers.find(x => x.id === 'powerGaming'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
        'Genius programmer. Created B.R.E.N. trying to code the perfect little sister, but the project backfired and now she refuses to listen to him. Could get a job anywhere he wanted, but prefers the NEET lifestyle.'
      )
    );

    list.push(
      new TileModel(
        'bren',
        'B.R.E.N.',
        'brotherhating ridiculously efficient nerd.py',
        'meushijyo',
        'yawn.mp3',
        1,
        'powerGaming',
        this.powers.find(x => x.id === 'powerGaming'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
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
        1,
        'gachaAddiction',
        this.powers.find(x => x.id === 'gachaAddiction'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
        'A kind, reserved fairy who comes from the Land of Fiction. Highly skilled in fire magic. Often visits our world looking for books or Japanese media. Stays in touch with Choco using the interdimensional computer network.'
      )
    );

    list.push(
      new TileModel(
        'choco',
        'Choco',
        'Choco Jax',
        'rox',
        'chachin.mp3',
        0.5,
        'gachaAddiction',
        this.powers.find(x => x.id === 'gachaAddiction'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
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
        0.4,
        'detectiveWork',
        this.powers.find(x => x.id === 'detectiveWork'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
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
        1,
        'detectiveWork',
        this.powers.find(x => x.id === 'detectiveWork'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
        `A clumsy maid devoted to her master, often teased for not being too quick on the uptake. Nevertheless, she makes for a good Watson. Lily's other passion is cleaning and she likes to do her job thoroughly. Sometimes too thorougly. You should run...`
      )
    );

    list.push(
      new TileModel(
        'kinjo',
        'Kinjo',
        'Kinjo Goldbar',
        'eleve',
        'coin.mp3',
        0.6,
        'timeTravel',
        this.powers.find(x => x.id === 'timeTravel'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
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
        0.5,
        'timeTravel',
        this.powers.find(x => x.id === 'timeTravel'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
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
        0.5,
        'reportedForRP',
        this.powers.find(x => x.id === 'reportedForRP'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
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
        0.5,
        'reportedForRP',
        this.powers.find(x => x.id === 'reportedForRP'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
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
        1,
        'rollForInitiative',
        this.powers.find(x => x.id === 'rollForInitiative'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
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
        0.5,
        'rollForInitiative',
        this.powers.find(x => x.id === 'rollForInitiative'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
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
        0.3,
        'blackMagic',
        this.powers.find(x => x.id === 'blackMagic'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
        "A fickle, cruel witch who enjoys throwing humans inside murder games and watching them lose their sanity. She's also a low-profile mystery and drama writer who only publishes using pen names."
      )
    );

    list.push(
      new TileModel(
        'fancy',
        'Lord Fancy',
        'Sir Lord Fancypants',
        'mira',
        'hyehye.mp3',
        0.5,
        'blackMagic',
        this.powers.find(x => x.id === 'blackMagic'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
        'Fancy demon by day, even fancier by night. This creature of elegant nature was contracted by Mira to capture humans, fend off witch hunters, and bake cookies.'
      )
    );

    list.push(
      new TileModel(
        'nacho',
        'Nacho',
        'Ignacio Zaragoza',
        null,
        'gunshot.mp3',
        0.5,
        'cincoDeMayo',
        this.powers.find(x => x.id === 'cincoDeMayo'),
        () => this.detectiveInvestigationStory,
        () => this.detectiveInvestigationStory2,
        'A simple guy who claims to be the long-lost descendant of a deceased famous general. Enjoys lazing around his computer and drinking overpriced beer. His dog Chili often gets lost when visiting the park.'
      )
    );

    list.push(
      new TileModel(
        'chili',
        'Chili',
        'Chili Bagel',
        null,
        'howl.mp3',
        0,
        '',
        null,
        null,
        null,
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

  createStories() {
    this.detectiveInvestigationStory = new Array<BaseAction>();
    let list = this.detectiveInvestigationStory;

    list.push(new SpriteAction(['smith-sheet', '0', 'left']));
    list.push(new TitleAction(['Agent Smith', 'left']));
    list.push(
      new TextAction(['It was a rainy night. I was asked to come immediately.'])
    );
    list.push(
      new TextAction([
        'The case was a murder in an old mansion. My squad was already investigating, but something happened.'
      ])
    );
    list.push(new SpriteAction(['lily-sheet', '0', 'right', 'black']));
    list.push(
      new TextAction([
        'One unidentified suspect managed to knock out every police offer on the crime scene. Then they cleaned up the whole place, took all the evidence and left.'
      ])
    );
    list.push(
      new TextAction([
        'We believe the suspect is armed and trained in hand-to-hand combat.'
      ])
    );
    list.push(
      new TextAction([
        'The instructions were clear. Detain the suspect and find the evidence regarding the murder case.'
      ])
    );

    list.push(
      new TextAction([
        `Damn, it's always the difficult cases for me, isn't it?`
      ])
    );
    list.push(new SpriteAction(['lily-sheet', '2', 'right']));
    list.push(new TitleAction(['Lily', 'right']));

    list.push(
      new TextAction([
        `Huh? Who are you? Are you trying to trying to further desacrate the master's propierty?`
      ])
    );
    list.push(new TitleAction(['Agent Smith', 'left']));
    list.push(new SpriteAction(['smith-sheet', '3', 'left']));
    list.push(new TextAction(['No, wait, stop!']));

    this.detectiveInvestigationStory2 = new Array<BaseAction>();
    let story2 = this.detectiveInvestigationStory2;




    story2.push(new SpriteAction(['smith-sheet', '1', 'left']));
    story2.push(new SpriteAction(['lily-sheet', '1', 'right']));
    story2.push(new TitleAction(['Agent Smith', 'left']));
    story2.push(
      new TextAction([`So, you were only trying to clean the room? You can't do that on a crime scene.`])
    );
    story2.push(new TitleAction(['Lily', 'right']));
    story2.push(
      new TextAction([`The master's residence must always be perfectly clean. Something trivial like a murder won't stop me from fulfilling my duty.`])
    );
    story2.push(new SpriteAction(['lily-sheet', '0', 'right']));    
    story2.push(
      new TextAction([`Besides, we already detained the insolent who stained the floor. We even have a confesion, ho.`])
    );
    story2.push(new SpriteAction(['smith-sheet', '0', 'left']));
    story2.push(new TitleAction(['Agent Smith', 'left']));    
    story2.push(
      new TextAction([`We? Wasn't it just you?`])
    );
    story2.push(new TitleAction(['Lily', 'right']));
    story2.push(
      new TextAction([`Of course not. Me and my friend solved it together. She's like a prodigy detective.`])
    );
    story2.push(new TitleAction(['Agent Smith', 'left']));    
    story2.push(new SpriteAction(['smith-sheet', '3', 'left']));
    story2.push(
      new TextAction([`(They stopped my whole squad and found the culprit before I arrived? Sick.)`])
    );
    story2.push(new SpriteAction(['smith-sheet', '0', 'left']));
    story2.push(
      new TextAction([`You will come with me and tell us everything. If everything is as you say, we will fix this misunderstanding.`])
    );
    story2.push(new TitleAction(['Lily', 'right']));    
    story2.push(new SpriteAction(['lily-sheet', '1', 'right']));
    story2.push(
      new TextAction([`Sure, but I should return before breakfast. The master won't accept a late meal.`])
    );
    story2.push(new TitleAction(['Agent Smith', 'left']));        
    story2.push(new SpriteAction(['smith-sheet', '3', 'left']));
    
    story2.push(
      new TextAction([`(What a crazy lady... but who knows? Maybe she will be useful later.)`])
    );
  }
}
