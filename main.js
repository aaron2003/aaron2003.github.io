var player;
var baddies = [];

var pause=false;
var lost=false;
var baddies_nr=5;

var counter=0;
var backgr_color;
var a=.01;
var powerups= [];
var powerups_nr=0;
var trackers = [];
var trackers_nr=0;
var players = [];
var tracker_red_im;
var tracker_orange_im;
var ghost_im;
var player_good_im;
var player_bad_im;
var death_particles;
var particle_bj;
var particle_white;
var particle_dark_blue;
var particle_light_blue;
var particle_gray;
var particle_orange;
var bullet_sprite;
var baddie2_im;
var baddie1_im;
var baddie0_im;

var start_im;
var pause_im;
var game_over_im;
var tutorial_im;

var scroll = [];

var amount = 2;
var screen_shake = false;

var mouse_im_0;
var mouse_im_1;
var mouse_obj;

var digit = [];
var semicolon;

var s0=0;
var s1=0;
var m0=0;
var m1=0;
var timer=0;

//sounds:
var UI_confirm;
var background_sound;
var tutorial_sound;
var laser;
var load;
var reload;
var explode_sound;

//video
var tutorials= [];
function preload()
{
	explode_sound = new Howl({
		src: ['sounds/explosion.mp3']
	});
	load = new Howl({
		src: ['sounds/load.mp3']
	});
	reload = new Howl({
		src: ['sounds/reload.mp3']
	});
	laser = new Howl({
		src: ['sounds/laser.wav']
	});
	background_sound = new Howl({
		src: ['sounds/background_sound2.mp3']
	});
	UI_confirm = new Howl({
		src: ['sounds/UI_confirm.mp3']
	});
	tutorial_sound = new Howl({
		src: ['sounds/background_sound1.mp3']
	});

	scroll[1] =loadImage('sprites/1_7.png');
	scroll[2] =loadImage('sprites/2_7.png');
	scroll[3] =loadImage('sprites/3_7.png');
	scroll[4] =loadImage('sprites/4_7.png');
	scroll[5] =loadImage('sprites/5_7.png');
	scroll[6] =loadImage('sprites/6_7.png');
	scroll[7] =loadImage('sprites/7_7.png');

	tutorial_im = loadImage(' sprites/tutorial_image.png');
	game_over_im = loadImage(' sprites/game_over_image.png');
	pause_im = loadImage(' sprites/pause_image.png');
	start_im = loadImage('sprites/start_image.png');

	semicolon = loadImage('sprites/semicolon.png');

	digit[0] = loadImage('sprites/digit0.png');
	digit[1] = loadImage('sprites/digit1.png');
	digit[2] = loadImage('sprites/digit2.png');
	digit[3] = loadImage('sprites/digit3.png');
	digit[4] = loadImage('sprites/digit4.png');
	digit[5] = loadImage('sprites/digit5.png');
	digit[6] = loadImage('sprites/digit6.png');
	digit[7] = loadImage('sprites/digit7.png');
	digit[8] = loadImage('sprites/digit8.png');
	digit[9] = loadImage('sprites/digit9.png');

	mouse_im_1 = loadImage('sprites/mouse1.png');
	mouse_im_0 = loadImage('sprites/mouse0.png');
	
	baddie0_im = loadImage('sprites/baddie0.png');
	baddie1_im = loadImage('sprites/baddie1.png');
	baddie2_im = loadImage('sprites/baddie2.png')
	bullet_sprite = loadImage('sprites/bullet.png');
	
	particle_orange = loadImage('sprites/particle_orange.png');
	particle_gray = loadImage('sprites/particle_gray.png');
	particle_bj = loadImage('sprites/particle_bj.png');
	particle_white = loadImage('sprites/particle_white.png');
	particle_dark_blue = loadImage('sprites/particle_dark_blue.png');
	particle_light_blue = loadImage('sprites/particle_light_blue.png');
	
	ghost_im = loadImage('sprites/ghost_pw.png');
	
	tracker_orange_im = loadImage('sprites/tracker_orange.png');
	tracker_red_im = loadImage('sprites/tracker_red.png');

	backgr_color = loadImage('sprites/background0.png');
	
	players[0] = loadImage('sprites/player0.png');
	players[1] = loadImage('sprites/player1.png');
	players[2] = loadImage('sprites/player2.png');
	players[3] = loadImage('sprites/player3.png');
	players[4] = loadImage('sprites/player4.png');
	players[5] = loadImage('sprites/player5.png');
	player_good_im = loadImage('sprites/player_good.png');
	
	player_bad_im = loadImage('sprites/player_bad.png');
}

function setup()
{
	console.log('Sub2Pewds');
	frameRate(60);
	createCanvas(880, 680);
	background('rgb(18.4%, 100%, 100%)');
	image( backgr_color, 40, 40, 800, 600, 0, 0, 800, 600);
	noCursor();

	player = new Player("MoveState");
	death_particles = new Particles();

	mouse_obj = new MouseState();

	for(var i=0; i<baddies_nr; i++)
	{
		baddies[i] = new Baddie();
		baddies[i].Start(int(random(20, 780)),int(random(20, 580)), 
			random(-1.5, 1.5), random(-1, 1.5));
		while( baddies[i].Player_Collision(player.GetX(), player.GetY(), player.GetW() ) )
		{	
			baddies[i].Start(int(random(20, 780)),int(random(20, 580)), 
			random(-1.5, 1.5), random(-1.5, 1.5));
	    }
	}
	angleMode(DEGREES);

	tutorials[1] = createVideo(['tutorials/tutorial1..mp4']);
	tutorials[2] = createVideo(['tutorials/tutorial2..mp4']);
	tutorials[3] = createVideo(['tutorials/tutorial3..mp4']);
	tutorials[4] = createVideo(['tutorials/tutorial4..mp4']);
	tutorials[5] = createVideo(['tutorials/tutorial5..mp4']);
	tutorials[6] = createVideo(['tutorials/tutorial6..mp4']);
	tutorials[7] = createVideo(['tutorials/tutorial7..mp4']);
	for(var i=1; i<8; ++i)
		tutorials[i].hide();
}

function reset()
{
	powerups_nr=0;
	counter=0;
	pause=false;
	baddies_nr=5;
	trackers_nr=0;
	player = new Player("MoveState");
	m0 = m1= s0 = s1= timer = 0;
	for(var i=0; i<baddies_nr; i++)
	{	
		baddies[i] = new Baddie();
		baddies[i].Start(int(random(20, 780)),int(random(20, 580)), 
			random(-1.5, 1.5), random(-1.5, 1.5));
		while(baddies[i].Player_Collision(player.GetX(), player.GetY(), player.GetW()))
			baddies[i].Start(int(random(20, 780)),int(random(20, 580)), 
			random(-1.5, 1.5), random(-1.5, 1.5));
	}
}


var isplaying = false;
var started = false;
var inTutorial = false;
var tutorial_nr = 1;

function draw(){
	if(!inTutorial)
	{
		StaticRender();
		translate(40, 40);
		if(!started)
		{
			image(start_im, 300, 130, 200, 100, 15, 15, 850, 450);
			image(tutorial_im, 300, 250, 200, 100, 15, 15, 850, 450);
			//image(start_im, 300, 370, 200, 100, 15, 15, 850, 450);
			mouse_obj.Draw();
		}
		else if(!lost)
		{
		   if(screen_shake)
		   	screenShake();
			if(!pause)
			{
				if(!isplaying)
				{
					background_sound.play();
					isplaying = true;
					background_sound.volume(0.7);
				}

				FixedUpdate();
				Update();
				LateUpdate();
				Render();
			}
			else
			{
				if(isplaying)
					background_sound.pause();
				isplaying = false;
				Render();
				image(pause_im, 300, 50, 200, 100, 25, 25, 850, 450);
			}
		}
		else
		{
			background_sound.pause();
			isplaying = false;
			Render();
			image(game_over_im, 300, 150, 200, 100, 25, 25, 850, 450);
		}
		if(screen_shake)
			pop();
	}
	else
	{
		image(tutorials[tutorial_nr], 0, 0, 880, 680);
		image(scroll[tutorial_nr], 0, 0);
	}
}

function FixedUpdate() 
{
	for(var i=0; i<powerups_nr; i++)
	{
		powerups[i].Player_Collision(player.GetX(), player.GetY(), player.GetW());
	}
	for(var i=0; i<trackers_nr; i++)
	{
		trackers[i].Player_Collision(player.GetX(), player.GetY(), player.GetW());
	}
	for(var i=0; i<baddies_nr; i++)
	{
		for(var j=0; j<trackers_nr; j++)
			baddies[i].Tracker_Collision(trackers[j]); //change
		if(baddies[i].Player_Collision(player.GetX(), player.GetY(), player.GetW()))
			player.ModifyHealth(-.3);
	}
}

function Update(){
	player.Update();
	for(var i=0; i<trackers_nr; i++)
		trackers[i].Update();
	for(var i=0; i<powerups_nr; i++)
		powerups[i].Update();
	for(var i=0; i<baddies_nr; i++)
		baddies[i].Update();
}

function LateUpdate()
{
	counter++;
	if(counter >= frameRate()*3 )
	{
		counter=0;
		var chance = int(random(0, 10));
		baddies_nr++;
		baddies[baddies_nr-1] = new Baddie();
		baddies[baddies_nr-1].Start(int(random(20, 780)),int(random(20, 580)), 
			random(-1.5, 1.5), random(-1.5, 1.5));
		while(baddies[baddies_nr-1].Player_Collision(player.GetX(), player.GetY(), player.GetW()))
		{
			baddies[baddies_nr-1].Start(int(random(20, 780)),int(random(20, 580)), 
			random(-1.5, 1.5), random(-1, 1.5));
		}
		
	        if( chance < 2)
		{
			powerups_nr++;
			powerups[powerups_nr-1] = new PowerUp();
			powerups[powerups_nr-1].Start(int(random(20, 780)), int(random(20, 580)), 
				random(-2,2), random(-2,2), int(random(4,6)));
			while(powerups[powerups_nr-1].Player_Collision(player.GetX(), player.GetY(), player.GetW() ) )
			{
				powerups[powerups_nr-1].Start(int(random(20, 780)), int(random(20, 580)), 
					random(-2,2), random(-2,2), int(random(4,6)));
			}
		}
		else
		{
		    trackers_nr++;
		    trackers[trackers_nr-1] = new Tracker();
		    trackers[trackers_nr-1].Start(int(random(20, 780)), int(random(20,580)), random(1, 2) );
		    while(trackers[trackers_nr-1].Player_Collision(player.GetX(), player.GetY(), player.GetW()))
		    {
			trackers[trackers_nr-1].Start(int(random(20, 780)), int(random(20,580)), random(1, 2) );
		    }
		}
	}
	if(player.GetHealth() <= 0)
	{
		lost=true;
		death_particles.Spawn(player.GetX(), player.GetY(), int(random(15, 20)), 500, player.GetW());
		player.SetSpriteState("Death_State");
	}
}

function Render()
{
	clock();
	for(var i=0; i<powerups_nr; ++i)
		powerups[i].Draw();
	for(var i=0; i<baddies_nr; ++i)
		baddies[i].Draw();
	player.Draw();
	for(var i=0; i<trackers_nr; ++i)
		trackers[i].Draw();
	mouse_obj.Draw();

}

function StaticRender()
{
	background('rgb(18.4%, 100%, 100%)');
	image( backgr_color,40, 40, 800, 600, 0, 0, 800, 600);
}

function keyPressed()
{
	if(keyCode==32 && started)
	{
		UI_confirm.play();
		pause=!pause;
	}
	if(keyCode==ENTER && lost)
	{
		lost=false;
		started=false;
		reset();
	}
	else if(keyCode == ENTER && !started)
	{
		started = true;
	}
	if(keyCode==69)
		fullscreen(!fullscreen());
	if(!started && inTutorial )
	{
		if(keyCode == 39 && tutorial_nr<7 )
		{
			tutorial_nr++;
			tutorials[tutorial_nr-1].stop();
			tutorials[tutorial_nr].loop();
		}
		else if(keyCode == 37 && tutorial_nr>1)
		{	tutorial_nr--;
		    tutorials[tutorial_nr+1].stop();
		    tutorials[tutorial_nr].loop();
		}
		else if(keyCode == 39 )
		{
			inTutorial = false;
			tutorial_nr = 1; 
			tutorials[7].stop();
			tutorial_sound.pause();
		}
	}
}

var mouseReleased1 = false;

function mouseReleased()
{
	mouseReleased1 = true;
}

function mousePressed()
{
	if(!pause)
		mouseReleased1 = false;
	if(!(started || inTutorial))
	{
		if(mouseX >= 300 && mouseX <= 500 &&
			mouseY >= 130 && mouseY <= 230)
			started = true;
		if(mouseX >= 300 && mouseX <= 500 &&
			mouseY >= 250 && mouseY <= 350)
		{
			inTutorial = true;
			tutorials[1].loop();
			tutorial_sound.play();
		}
	}
}

function screenShake()
{
	push();
	translate(random(-amount, amount), random(-amount, amount));
}

function clock()
{
	if(timer>=frameRate())
	{
		timer = 0;
		s0++;
		if(s0>9)
			s0=0, s1++;
		if(s1>5)
			s1=0, m0++;
		if(m0>9)
			m0=0, m1++;
	}
	image(digit[m1], 230, 280, 80, 80, 0, 0, 1000, 1000);
	image(digit[m0], 310, 280, 80, 80, 0, 0, 1000, 1000);
	image(semicolon, 390, 280, 80, 80, 0, 0, 1000, 1000);
	image(digit[s1], 430, 280, 80, 80, 0, 0, 1000, 1000);
	image(digit[s0], 510, 280, 80, 80, 0, 0, 1000, 1000);
	if(!pause && !lost)
		timer++;
}
