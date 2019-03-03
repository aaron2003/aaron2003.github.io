function Baddie()
{
	this.ww = 15;
	this.hh = 15;
	this.c = color('red');
	this.visible = false;
	this.mass = 10;
	this.health = 3;
	this.death_particles = new Particles();
	this.spawning = 100;

	this.Get_Visible = function()
	{
		return this.visible;
	}

	this.ModifyHealth = function(d)
	{
		this.health -= d;
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

	this.NotVisible = function()
	{
		this.visible = false;
	}

	this.Start = function(x1, y1, vx1, vy1)
	{
		this.xx = x1;
		this.yy = y1;
		this.vx = vx1;
		this.vy = vy1;
	}

	this.Draw = function()
	{
		if(this.spawning > 0)
		{
		    push();
			translate(this.xx, this.yy);
			rotate(720 - this.spawning*7.2 );
			image(baddie2_im , -( 30-this.spawning/10*3 )/2, - ( 30-this.spawning/10*3 )/2,  30-this.spawning/10*3 + 1,  30-this.spawning/10*3 + 1, 10, 10, 900, 900);
			pop();
			return;
		}
		else if (this.spawning == 0)
			this.visible = true, this.spawning--;
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
		  	rotate(atan2(speed.y, speed.x) + 90);

			if( this.health === 3 )
				image(baddie2_im, - this.ww , - this.ww ,this.ww * 2 , this.ww * 2 ,10, 10, 900, 900);
			else if( this.health > 1.5)
				image(baddie1_im, - this.ww, - this.ww, this.ww * 2 , this.ww * 2 ,10, 10, 900, 900);
			else 
				image(baddie0_im, - this.ww, - this.ww, this.ww * 2 , this.ww * 2, 10, 10, 900, 900);

			pop();
		}
		else
		{
			this.death_particles.Draw();
		}
	}

	this.Update = function()
	{
		if(this.spawning>0)
		{
			this.spawning--;
			return;
		}
		if(!this.visible)
			return;
		this.xx+=this.vx;
		this.yy+=this.vy;
		this.Border_Collision();
		this.Self_Collision();
		if(this.health <= 0)
			this.visible = false, this.death_particles.Spawn( this.xx, this.yy, int(random(8, 13)), 300, this.ww );
	}
	
	this.Border_Collision = function()
	{
		if(this.xx+this.ww>=800)
			this.xx=800-this.ww, this.vx*=-1;
		else if(this.xx-this.ww<=0)
			this.xx=this.ww, this.vx*=-1;
		if(this.yy+this.hh>=600)
			this.yy=600-this.hh, this.vy*=-1;
		else if(this.yy-this.hh<=0)
			this.yy=this.hh, this.vy*=-1;
	}

	this.Player_Collision = function(xx, yy, ww)
	{	
		for(var j=0; j<powerups.length ; j++)
		{
			if(powerups[j].GetEntered() && powerups[j].GetEffectTimer() && powerups[j].GetEffectState() === "ghost_effect")
				return false;
			if(powerups[j].GetEntered() && powerups[j].GetEffectTimer() && powerups[j].GetEffectState() === "destroy_effect")
			{
				if( (xx-this.xx)*(xx-this.xx) + 
			        (yy-this.yy)*(yy-this.yy) <=
			        (ww+this.ww)*(ww+this.ww) )
				{
					return false;
					baddies[i].NotVisible();
				}

			}
		}
	    if(!this.visible)
	    	return false;
	    if (!( (xx-this.xx)*(xx-this.xx) + 
			    (yy-this.yy)*(yy-this.yy) <=
			    (ww+this.ww)*(ww+this.ww) ) )
	    	return false;
		var auxX = this.vx;
		var auxY = this.vy;
		this.vx = player.GetVx() ;
		this.vy = player.GetVy() ;
		player.SetVx(auxX);
		player.SetVy(auxY);
		//console.log(auxX, auxY);
		return true;

	}

	this.Self_Collision = function()
	{
		if( this.visible )
		{
			for(var i=0; i<baddies_nr; ++i)
			{
				if( baddies[i].Get_Visible() )
				{
					if( ( this.xx - baddies[i].GetX() )*( this.xx - baddies[i].GetX() )
					   +( this.yy - baddies[i].GetY() )*( this.yy - baddies[i].GetY() )
					  <=  4*this.ww*this.ww )
					{
						var auxX = this.vx;
						var auxY = this.vy;
						this.vx = baddies[i].GetVx();
						this.vy = baddies[i].GetVy();
						baddies[i].SetVx(auxX);
						baddies[i].SetVy(auxY);
					}
				}
			}
		}
	}

	this.Tracker_Collision = function(tracker)
	{
		if(tracker.Get_Visible() && this.visible)
		{
			if( ( this.xx - tracker.GetX() )*( this.xx - tracker.GetX() ) + 
			    ( this.yy - tracker.GetY() )*( this.yy - tracker.GetY() ) <=
			    ( this.ww + tracker.GetW() )*( this.ww + tracker.GetW() ) )
			{
				var auxX = this.vx;
				var auxY = this.vy;
				this.vx = 2*( this.mass*this.vx + tracker.GetM()*tracker.GetVx() )/( this.mass + tracker.GetM() ) - this.vx;
				this.vy = 2*( this.mass*this.vy + tracker.GetM()*tracker.GetVy() )/( this.mass + tracker.GetM() ) - this.vy;

				tracker.SetVx( 2*( this.mass*this.vx + tracker.GetM()*tracker.GetVx() )/( this.mass + tracker.GetM() ) - tracker.GetVx() );
				tracker.SetVy( 2*( this.mass*this.vy + tracker.GetM()*tracker.GetVy() )/( this.mass + tracker.GetM() ) - tracker.GetVy() );
				if(tracker.Get_Explode_Timer() > 140)
					tracker.Explode_Timer_Modify(-60);
			}
		}
	}
}
