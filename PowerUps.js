function PowerUp()
{
	this.visible = true;
	this.ww=15;
	this.hh=15;
	this.c=color('green');
	this.effect_timer=600;
	this.tp = -1;
	this.entered = false;
    this.nr1 = true;

    this.GetEntered = function(){
    	return this.entered;
    }

	this.GetEffectTimer = function()
	{
		return this.effect_timer;
	}

	this.GetEffectState = function()
	{
		return this.state;
	}
	this.Start = function(x1, y1, vx1, vy1, type)
	{
		this.xx = x1;
		this.yy = y1;
		this.vx = vx1;
		this.vy = vy1;
		this.tp = type;

		if(this.tp === 0)
		  this.state = "speed_effect", this.c = color('green');
	    else if(this.tp === 1)
		  this.state = "shrink_effect", this.c = color('green');
		else if(this.tp === 2)
			this.state = "destroy_effect", this.c = color('green');
		else if(this.tp === 3)
			this.state = "slow_effect", this.c = color('orange');
		else if(this.tp === 4)
			this.state = "enlarge_effect", this.c = color('orange');
		else if(this.tp === 5)
			this.state = "ghost_effect" ;
	}
	this.Update = function()
	{   
		if(this.visible){
	        this.xx+=this.vx;
	        this.yy+=this.vy;
	        this.Border_Collision();
	    }
	    else
	    {
	    	if(this.effect_timer)
	    	{
		    	if( this.nr1 )
		    		this.entered=true, this.nr1 = false;
		    	this[this.state]();
		    }
	    }
    }

    this.ghost_effect = function(){
    	if(this.effect_timer > 0)
    		this.effect_timer--, player.SetSpriteState("GoodEffectState");
    	if(this.effect_timer === 0)
    		player.SetSpriteState("defaultState");
    	
    }

    this.enlarge_effect = function()
    {
    	if(this.effect_timer === 600)
    		player.DoubleWidth();
    	this.effect_timer--;
    	player.SetSpriteState("BadEffectState");
    	if(this.effect_timer === 0)
    		player.HalfWidth(), player.SetSpriteState("defaultState");
    }

    this.destroy_effect = function(){
    	if(this.effect_timer > 0)
    		this.effect_timer--, player.SetSpriteState("GoodEffectState");
    	if(this.effect_timer === 0)
    		player.SetSpriteState("defaultState");
    }
    this.shrink_effect = function(){
    	if(this.effect_timer === 600)
    		player.HalfWidth();
    	this.effect_timer--;
    	if(this.effect_timer === 0)
    		player.DoubleWidth();
    }

    this.speed_effect = function(){
    	if(this.effect_timer === 600)
    		player.DoubleSpeed();
    	this.effect_timer--;
    	if(this.effect_timer === 0)
    		player.HalfSpeed();
    }

    this.slow_effect = function(){
    	if(this.effect_timer === 600)
    		player.HalfSpeed(), player.SetSpriteState("BadEffectState");
    	this.effect_timer--;
    	if(this.effect_timer === 0)
    		player.DoubleSpeed(), player.SetSpriteState("defaultState")
    }

	this.Player_Collision = function(xx, yy, ww)
	{		
		if( (xx-this.xx)*(xx-this.xx) + 
		    (yy-this.yy)*(yy-this.yy) <=
		    (ww+this.ww)*(ww+this.ww) )
		{
			this.visible=false;
		}
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

	this.Draw = function()
	{
		if(this.visible === true)
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

			if(this.GetEffectState() === "ghost_effect" )
				image(ghost_im , - 20, - 20, 30, 30, 40,  52, 900, 888);
			else
			{
				fill(this.c);
			    ellipse(0, 0, this.ww, this.hh);
			}
			pop();
		}
	}
}