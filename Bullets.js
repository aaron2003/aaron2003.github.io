var hit = false;

function Bullet(x1, y1, vx, vy, size, damage, sprite)
{
	this.visible = true;
	this.xx = x1;
	this.yy = y1;
	this.vx = vx;
	this.vy = vy;
	this.ww = size;
	this.damage = damage;
	this.sprite = sprite;
    this.shakeTimer = 0;

	this.Update = function()
	{
		if(this.visible)
		{
			this.xx += this.vx;
			this.yy += this.vy;
			this.Border_Collision();
			for(var i=0; i<baddies_nr; i++)
			{
				if(baddies[i].Get_Visible())
					this.Collision(baddies[i]);
			}
			for(var i=0; i<trackers_nr; i++)
			{
				if(trackers[i].Get_Visible())
					this.Collision(trackers[i]);
			}
	    }
	    else if (this.shakeTimer > 0)
	    {
	    	this.shakeTimer--;
	    	screen_shake = true;
	    	hit = true;
	    }
	    else if ( !this.shakeTimer )
	    	screen_shake = false, this.shakeTimer--, hit = false;
	}

	this.Border_Collision = function()
	{
		if(this.xx + this.ww > 800 || this.xx - this.ww < 0
			|| this.yy + this.ww > 600 || this.yy - this.ww <0)
			this.visible = false;
	}

	this.Collision = function( entity )
	{
		//if(!entity.Get_Visible())
		//	return;
		if( ( this.xx - entity.GetX() )*( this.xx - entity.GetX() ) +
		    ( this.yy - entity.GetY() )*( this.yy - entity.GetY() ) <=
		    ( this.ww + entity.GetW() )*( this.ww + entity.GetW() ) )
		{
			entity.ModifyHealth(this.damage);
			entity.SetVx(entity.GetVx() + this.vx/10 );
			entity.SetVy(entity.GetVy() + this.vy/10 );
			this.visible = false;
			this.shakeTimer = 10;
		}
	}

	this.Draw = function()
	{
		if(this.visible)
			image(this.sprite, this.xx - this.ww, this.yy - this.ww, this.ww*2, this.ww*2, 9, 10, 900, 900);
	}
}
