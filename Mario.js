  let game = new Phaser.Game(256, 240, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update
  }, false, false);
  
  let score = 0;
  let scoreText;
  let randomegg =
  ['pics/oeuf_3_16x16.png',
  'pics/oeuf_2_16x16.png',]
  
  let eggs = [
    {address: '', x: 500, y:180},
    {address: '', x: 1500, y:25},
    {address: '', x: 1750, y:125},
    {address: '', x: 730, y:130},
  ]
  
  function preload() {
    var i = Math.floor(Math.random() * randomegg.length)
    game.load.spritesheet('tiles', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/tiles_dctsfk.png', 16, 16);
    game.load.spritesheet('goomba', 'pics/renard_40x34.png', 40, 17);
    game.load.spritesheet('mario', 'pics/poussin_mvt_80x97.png', 26.6, 32.3 );
    game.load.spritesheet('coin', 'pics/oeuf_1_16x17.png', 16, 16);
    game.load.image('egg', randomegg[i], 16, 16);
    // game.load.image('egg', 'pics/oeuf_3_16x16.png');
    game.load.tilemap('level', 'https://api.myjson.com/bins/3kk2g', null, Phaser.Tilemap.TILED_JSON);       
  }
  
  function create() {
      Phaser.Canvas.setImageRenderingCrisp(game.canvas)
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.renderer.renderSession.roundPixels = true;
  
    game.physics.startSystem(Phaser.Physics.ARCADE);
  
    game.stage.backgroundColor = '#ff5500';
  
    map = game.add.tilemap('level');
    map.addTilesetImage('tiles', 'tiles');
    map.setCollisionBetween(3, 12, true, 'solid');
  
    map.createLayer('background');
  
    layer = map.createLayer('solid');
    layer.resizeWorld();
  
    coins = game.add.group();
    coins.enableBody = true;
    map.createFromTiles(2, null, 'coin', 'stuff', coins);
    coins.callAll('animations.add', 'animations', 'spin', [0, 0, 1, 2], 3, true);
    coins.callAll('animations.play', 'animations', 'spin');
  
  
    let j = Math.floor(Math.random() * eggs.length);
    egg = game.add.sprite(eggs[j].x, eggs[j].y, 'egg');
  
    game.physics.arcade.enable(egg);
  
    egg.enableBody = true;
  
  
    goombas = game.add.group();
    goombas.enableBody = true;
    map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
    goombas.callAll('animations.add', 'animations', 'walk', [0, 1], 2, true);
    goombas.callAll('animations.play', 'animations', 'walk');
    goombas.setAll('body.bounce.x', 1);
    goombas.setAll('body.velocity.x', -20);
    goombas.setAll('body.gravity.y', 500);
  
    player = game.add.sprite(20, game.world.height - 48, 'mario');
    player.scale.setTo(0.5,0.5)
    game.physics.arcade.enable(player);
    player.body.gravity.y = 370;
    player.body.collideWorldBounds = true;
    player.animations.add('walkRight', [0, 1, 2], 10, true);
    player.animations.add('walkLeft', [3, 4, 5], 10, true);
    player.goesRight = true;
  
    game.camera.follow(player);
  
    cursors = game.input.keyboard.createCursorKeys();
  
    scoreText = game.add.text(32, 16, 'score: 0');
    scoreText.fontSize=12;
    scoreText.anchor.set(-0.5);
    scoreText.position = 'absolute';
    coreText.align = 'left';
    scoreText.fontWeight = 'bold';
  }
  
  function update() {
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(goombas, layer);
    game.physics.arcade.overlap(player, goombas, goombaOverlap);
    game.physics.arcade.overlap(player, coins, coinOverlap);
    game.physics.arcade.overlap(player, egg, eggOverlap);
  
    if (player.body.enable) {
      player.body.velocity.x = 0;
      if (cursors.left.isDown) {
        player.body.velocity.x = -90;
        player.animations.play('walkLeft');
        player.goesRight = false;
      } else if (cursors.right.isDown) {
        player.body.velocity.x = 90;
        player.animations.play('walkRight');
        player.goesRight = true;
      } else {
        player.animations.stop();
        if (player.goesRight) player.frame = 0;
        else player.frame = 1;
      }
  
      if (cursors.up.isDown && player.body.onFloor()) {
        player.body.velocity.y = -190;
        player.animations.stop();
      }
  
      if (player.body.velocity.y != 0) {
        if (player.goesRight) player.frame = 2;
        else player.frame = 4;
        
      }
    }
  }
  
  function coinOverlap(player, coin) {
    coin.kill();
      score += 10;
      scoreText.text = 'Score: ' + score;
  
  }
  
  function eggOverlap(player, egg) {
    console.log("test")
    egg.kill();
      score += 30;
      scoreText.text = 'Score: ' + score;
  }
  
  function goombaOverlap(player, goomba) {
    if (player.body.touching.down) {
      goomba.animations.stop();
      goomba.frame = 2;
      goomba.body.enable = false;
      player.body.velocity.y = -80;
      game.time.events.add(Phaser.Timer.SECOND, function() {
        goomba.kill();
        
      });
    } else {
      player.frame = 6;
      player.body.enable = false;
      player.animations.stop();
      game.time.events.add(Phaser.Timer.SECOND * 3, function() {
      game.paused = true;
      player.kill();
      
    });
    game.time.events.add(Phaser.Timer.SECOND * 3, function() {
      game.paused = true;
      document.getElementById("modal").className="d-block";
    });
    
      document.getElementById('pouleover').className="d-block"; 
    }
  }

  function win (score) {
    if (score >= 40) {
      game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        game.paused = true;
        document.getElementById("youwin").className="d-block";
      });
        
        

    }else {
      console.log("toto")
    }
  }

  

  