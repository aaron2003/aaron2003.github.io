function Tracker() 
{	
	this.ww = 20;
	this.mass = 20;
	this.explode_timer = 800;
	this.trigger_radius = 25;
	this.blast_radius = 115;
	this.visible = true;
	this.counter = 0;
	this.cc =  color('white');
	this.stage = 0;
	this.hit = false;

	this.ModifyHealth = function(x)
	{
		if(this.explode_timer > 200)		
			this.Explode_Timer_Modify(-300);
		else if(this.explode_timer > 100)
			this.explode_timer = 100;
	}

	this.Get_Visible = function()
	{
		return this.visible;
	}

	this.Get_Explode_Timer = function()
	{
		return this.explode_timer;
	}

	this.Exploded = function()
	{
		if(explode_timer>0)
			return false;
		return true;
	}

	this.Explode_Timer_Modify = function(x)
	{
		this.explode_timer += x;
	}

	this.InstantExplode = function()
	{
		this.explode_timer = 100;
	}

	this.GetM = function()
	{
		return this.mass;
	}

	this.GetW = function()
	{
		return this.ww;
	}
	this.GetX = function()
	{
		return this.xx;
	}

	this.GetY = function()
	{
		return this.yy;
	}

	this.SetVx = function(vx1)
	{
		this.vx = vx1;
	}

	this.SetVy = function(vy1)
	{
		this.vy = vy1;
	}

	this.GetVx = function()
	{
		return this.vx;
	}

	this.GetVy = function()
	{
		return this.vy;
	}

	this.Start = function(x1, y1, maxv)
	{
		this.xx = x1;
		this.yy = y1;
		this.maxv = maxv;
	}

	this.Tracking = function(x1, y1)
	{
		if( abs(this.xx - x1) > abs(this.yy - y1) )
		{
			this.vx = this.maxv;
			this.vy = this.maxv * abs(this.yy - y1) / abs(this.xx - x1);
		}
		else if( abs(this.xx - x1) < abs(this.yy - y1) )
		{
			this.vy = this.maxv;
			this.vx = this.maxv * abs(this.xx - x1) / abs(this.yy - y1);
		}
		else
		{
			this.vx = this.maxv;
			this.vy = this.maxv;
		}
		if(this.xx>x1)
			this.vx*=-1;
		if(this.yy>y1)
			this.vy*=-1;
	}

	this.current_blast_radius = 0;
	this.explosion_duration = 20;

	this.Update = function()
	{
		if(this.visible)
		{
			this.Tracking(player.GetX(), player.GetY());
			this.xx+=this.vx;
			this.yy+=this.vy;
			this.explode_timer--;
			this.Explode();
			if(this.explode_timer <= 0)
			{
				explode_sound.play();
				explode_sound.volume(0.3);
				this.visible = false;
				this.ex = this.xx;
				this.ey = this.yy;
			}
		}
		else if(this.current_blast_radius < this.blast_radius )
		{
			for(var i=0; i<baddies_nr; ++i)
			{
				if( ( this.xx - baddies[i].GetX() )*( this.xx - baddies[i].GetX() ) +
				    ( this.yy - baddies[i].GetY() )*( this.yy - baddies[i].GetY() ) <=
				    ( this.current_blast_radius + baddies[i].GetW() )*( this.current_blast_radius + baddies[i].GetW() ) )
				{
					baddies[i].ModifyHealth(3);
				}
			}
			if( ( this.xx - player.GetX() )*( this.xx - player.GetX() ) +
			    ( this.yy - player.GetY() )*( this.yy - player.GetY() ) <=
			    ( this.current_blast_radius + player.GetW() )*( this.current_blast_radius + player.GetW() ) && !this.hit)
			{
				this.hit = true;
				player.ModifyHealth(-1);
			}
		    for(var i=0; i<trackers_nr; i++)
			{
				if( (this.xx != trackers[i].GetX() ) || (this.yy != trackers[i].GetY() ) )
				{
					if( ( this.xx - trackers[i].GetX() )*( this.xx - trackers[i].GetX() ) +
					    ( this.yy - trackers[i].GetY() )*( this.yy - trackers[i].GetY() ) <=
					    ( this.current_blast_radius + this.ww )*( this.ww +this.current_blast_radius ))
					{
						trackers[i].InstantExplode();
					}
				}
			}

			this.current_blast_radius += ( this.blast_radius/this.explosion_duration );
			
		}
	}

	this.Draw = function()
	{
		if(this.visible)
		{
			let speed = createVector(this.xx + this.vx,
			                         this.yy + this.vy);
			let pos = createVector(this.xx, this.yy);
		    speed.sub(pos);
		  	speed.mult(0.5);
		  	pos.add(speed);

		  	push();

		  	translate(this.xx, this.yy);
		  	rotate(atan2(speed.y, speed.x) + 90 );

			if(this.explode_timer>100)
			{
				image(tracker_orange_im , - 20, - 20, 40, 40, 10, 10, 1000, 1000);

			}
			else
			{
				this.counter++;
				if(this.counter <= 5)
					image(tracker_red_im , - 20, - 20, 40, 40, 10, 10, 1000, 1000);
				else if(this.counter === 10)
					this.counter = 0;
				else
					image(tracker_orange_im , - 20, - 20, 40, 40, 10, 10, 1000, 1000);
			}
			pop();
		}
		else
		{
			this.Draw_Explosion();
		}
	}

	this.Explode = function()
	{
		if( ( this.xx - player.GetX() )*( this.xx - player.GetX() ) +
		    ( this.yy - player.GetY() )*( this.yy - player.GetY() )
		    <= ( this.trigger_radius + player.GetW() )*( this.trigger_radius + player.GetW() ) 
		    && this.explode_timer>100 )
		{
			this.explode_timer=100;
		}
	}

	this.Player_Collision = function(xx, yy, ww)
	{	
		if( this.visible )
		{	
			if( (xx-this.xx)*(xx-this.xx) + 
			    (yy-this.yy)*(yy-this.yy) <=
			    (ww+this.ww)*(ww+this.ww) )
			{
				var auxX = this.vx;
				var auxY = this.vy;
				this.vx = player.GetVx() ;
				this.vy = player.GetVy() ;
				player.SetVx(auxX);
				player.SetVy(auxY);
				if(this.explode_timer>160)
					this.explode_timer-=60;
				return true;
			}
			return false;
	    }
	    return false;
	}


	this.explosion_counter = 0;
	this.distance = 5;
	this.piece_nr = 24;
	this.flag = true;

	this.Draw_Explosion = function()
	{
		if(this.explosion_counter <= this.blast_radius )
		{
			this.explosion_counter += (this.blast_radius/this.explosion_duration);
			push();
			noStroke();
			fill('red');
			ellipse(this.ex, this.ey, this.explosion_counter*2, this.explosion_counter*2);
			pop();
		}

		if(this.distance <= this.blast_radius )
		{
			screen_shake = true;
			amount = 10;
			push();
			translate(this.ex, this.ey);
			rectMode(CENTER);
			stroke('white');
			fill('red');
			for(var i=0; i<this.piece_nr+1; i++)
			{
				rect(0, this.distance, 10, 10);
				rotate(360/this.piece_nr);
			}
			pop();
			this.distance += (this.blast_radius/this.explosion_duration);
		}
		else if(this.flag)
		{
			screen_shake = false;
			amount = 2;
			this.flag = false; 
		}
	}
}
