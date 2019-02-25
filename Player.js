function Player(startState)
{
	this.cc = color('yellow');
	this.xx = 100;
	this.vx = 0;
	this.yy = 100;
	this.vy = 0;
	this.hh = 20;
	this.ww = 20;
	this.speed = 2;
	this.state = startState;
	this.spriteState = "defaultState";
	this.counter = 0;
	this.health = 3;
	this.bullets = [];

	this.ModifyHealth = function(x)
	{
		this.health+=x;
	}

	this.GetHealth = function()
	{
		return this.health;
	}

	this.SetSpriteState = function( input )
	{
		this.spriteState = input;
	}

	this.SetVx = function(vx1)
	{
		this.vx = vx1;
	}

	this.SetVy = function(vy1)
	{
		this.vy = vy1;
	}

	this.GetX = function()
	{
		return this.xx;
	}

	this.GetY = function()
	{
		return this.yy;
	}

	this.GetVx = function()
	{
		return this.vx;
	}

	this.GetVy = function()
	{
		return this.vy;
	}

	this.GetW = function()
	{
		return this.ww;
	}

	this.GetH = function()
	{
		return this.hh;
	}

	this.DoubleSpeed = function()
	{
		this.speed *= 2;
	}

	this.HalfSpeed = function()
	{
		this.speed /= 2;
	}

	this.HalfWidth = function()
	{
		this.ww /= 2;
	}

	this.DoubleWidth = function()
	{
		this.ww *= 2;
	}

	this.Draw = function() 
	{
		if(this.spriteState != "Death_State")
		{
			let speed = createVector(mouseX, mouseY);
			let player_speed = createVector(this.xx, this.yy);
		  	speed.sub(player_speed);
		  	speed.mult(0.5);
		  	player_speed.add(speed);
		  	push();
		  	translate(this.xx, this.yy);
		  	rotate(atan2(speed.y, speed.x) + 90 );
			if( this.spriteState === "defaultState" )
			{
				if( this.health >= 3 )
					image(players[5], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
				else if( this.health >= 2.5 )
					image(players[4], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
				else if( this.health >= 2 )
					image(players[3], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
				else if( this.health >= 1.5 )
					image(players[2], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
				else if( this.health >= 1 )
					image(players[1], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
				else 
					image(players[0], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
			}
			else if( this.spriteState === "GoodEffectState" )
			{
				this.counter++;
				if(this.counter <= 10)
					image(player_good_im, - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
				else if(this.counter <= 20)
				{	
					if( this.health >= 3 )
						image(players[5], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
					else if( this.health >= 2.5 )
						image(players[4], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
					else if( this.health >= 2 )
						image(players[3], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
					else if( this.health >= 1.5 )
						image(players[2], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
					else if( this.health >= 1 )
						image(players[1], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
					else 
						image(players[0], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
				}
				if(this.counter>20)
					this.counter=0;
			}
			else if( this.spriteState === "BadEffectState")
			{	
				this.counter++;
				if(this.counter <= 10)
					image(player_bad_im, - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
				else if(this.counter <= 20)
				{	
					if( this.health >= 3 )
						image(players[5], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
					else if( this.health >= 2.5 )
						image(players[4], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
					else if( this.health >= 2 )
						image(players[3], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
					else if( this.health >= 1.5 )
						image(players[2], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
					else if( this.health >= 1 )
						image(players[1], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
					else 
						image(players[0], - this.ww, - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
				}
				if(this.counter>20)
					this.counter=0;
			}
			pop();
			for(var i=0; i<this.bullets.length; i++)
			{
				this.bullets[i].Draw();
			}
		}
		else
		{
			death_particles.Draw();
		}
	}

	this.doOnce = false;
	this.bullet_nr = 0;
	this.reload = 0;

	this.Update = function()
	{
		this[this.state]();
		this.reload++;
		if(this.reload >= frameRate()*1.5 && this.bullet_nr < 4 )
		{
			this.reload = 0;
			this.bullet_nr++;
			if(this.bullet_nr == 3)
				reload.play(), reload.volume(60);
			else
				load.play(), load.volume(60);
		}
		if( mouseIsPressed && this.doOnce === false && this.bullet_nr>0 )
		{
			laser.play();
			laser.volume(40);
			this.bullet_nr--;
			this.doOnce = true;
			var bullet_vx;
			var bullet_vy;
			var bullet_speed = 8;
			var bullet_x = this.xx ;
			var bullet_y = this.yy ;
			if( abs(bullet_x - mouseX ) > abs(bullet_y - mouseY ) )
			{
				bullet_vx = bullet_speed;
				bullet_vy = bullet_speed * abs(bullet_y - mouseY ) / abs(bullet_x - mouseX );
			}
			else if( abs(bullet_x - mouseX ) < abs(bullet_y - mouseY ) )
			{
				bullet_vy = bullet_speed;
				bullet_vx = bullet_speed * abs(bullet_x - mouseX ) / abs(bullet_y - mouseY );
			}
			else
			{
				bullet_x = bullet_speed;
				bullet_y = bullet_speed;
			}
			if(bullet_x > mouseX )
				bullet_vx*=-1;
			if(bullet_y> mouseY )
				bullet_vy*=-1;
			bullet_x = ( this.ww + 2 )/sqrt(bullet_vx*bullet_vx + bullet_vy*bullet_vy)*bullet_vx;
			bullet_x += this.xx;
			bullet_y = ( this.ww + 2 )/sqrt(bullet_vx*bullet_vx + bullet_vy*bullet_vy)*bullet_vy;
			bullet_y += this.yy;
			this.bullets[this.bullets.length] = new Bullet(bullet_x, bullet_y, bullet_vx, bullet_vy,
				5, 1, bullet_sprite);
		}
		for(var i=0; i<this.bullets.length; i++)
		{
			this.bullets[i].Update();
		}
		if(mouseReleased1)
			this.doOnce = false;
	}

	this.MoveState = function()
	{
		var stopx=true;
		var stopy=true;
		if(keyIsDown(68))
			this.vx+=0.1, stopx=false;
		else if(keyIsDown(65))
			this.vx-=0.1, stopx=false;
		if(keyIsDown(87))
			this.vy-=0.1, stopy=false;
		else if(keyIsDown(83))
			this.vy+=0.1, stopy=false;
		if(this.vx>this.speed)
			this.vx=this.speed;
		else if(this.vx<-this.speed)
			this.vx=-this.speed;
		if(this.vy>this.speed)
			this.vy=this.speed;
		else if(this.vy<-this.speed)
			this.vy=-this.speed;
		this.xx+=this.vx;
		this.yy+=this.vy;
		if(stopx)
		{
			if(this.vx>0)
				this.vx-=this.speed/20;
			else if(this.vx<0)
				this.vx+=this.speed/20;
		}
		if(stopy)
		{
			if(this.vy>0)
				this.vy-=this.speed/20;
			else if(this.vy<0)
				this.vy+=this.speed/20;
		}
		this.Clamp_To_Screen();
	}

	this.Clamp_To_Screen = function()
	{
		if(this.xx+this.ww>=800)
			this.xx=800-this.ww, this.vx=0;
		else if(this.xx-this.ww<=0)
			this.xx=this.ww, this.vx=0;
		if(this.yy+this.ww>=600)
			this.yy=600-this.ww, this.vy=0;
		else if(this.yy-this.ww<=0)
			this.yy=this.ww, this.vy=0;
	}
}
