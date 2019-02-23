function Particle(x1, y1, w1)
{
	this.vx = random( -.3, .3);
	this.vy = random(-.3, .3);
	this.spin = random(2.5, 5);
	this.angle = random(0, 360);
	this.model = int(random(0, 10));
	this.xx = x1;
	this.yy = y1;
	this.ww = w1;

	if(this.model < 2)
		this.img = particle_bj;
	else if(this.model < 4)
		this.img = particle_white;
	else if(this.model < 6)
		this.img = particle_light_blue;
	else if(this.model < 8)
		this.img = particle_dark_blue;
	else if(this.model === 8)
		this.img = particle_gray;
	else if(this.model === 9)
		this.img = particle_orange;

	this.Update = function()
	{
		this.Border_Collision();
		this.xx+=this.vx;
		this.yy+=this.vy;
	}

	this.Border_Collision = function()
	{
		if(this.xx + this.ww > 800)
			this.xx = 790, this.vx *= -1;
		else if(this.xx - this.ww < 0)
			this.xx = this.ww, this.vx *= -1;
		if(this.yy + this.ww > 600)
			this.yy = 795, this.vy *= -1;
		else if(this.yy - this.ww < 0)
			this.yy = this.ww, this.vy *= -1;	
	}
	
	this.Draw = function()
	{
		push();
		translate(this.xx, this.yy);
		rotate(this.angle);
		fill('white');
		image(this.img, -5, -5, this.ww, this.ww, 10, 10, 900, 900);
		pop();
		this.angle += this.spin;
	}
}

function Particles()
{
	this.particles = [];
	this.dust = [];
	this.Spawn = function(x1, y1, nr, lifespam, radius)
	{
		this.xx= x1;
		this.yy= y1;
		this.nr= nr;
		this.lifespam = lifespam;
		for( var i=0; i<this.nr; i++)
		{
			this.particles[i] = new Particle(random(this.xx-radius, this.xx+radius), random(this.yy-radius, this.yy+radius), int(random(2, 15)));
			this.dust[i] = new Particle(random(this.xx-radius, this.xx+radius), random(this.yy-radius, this.yy+radius), 4);
			this.dust[i+this.nr] = new Particle(random(this.xx-radius, this.xx+radius), random(this.yy-radius, this.yy+radius), 5);
		}
	}
	this.Draw = function()
	{
		if(this.lifespam>0)
		{
			for( var i=0; i<this.nr; i++)
			{
				this.particles[i].Update();
				this.dust[i].Update();
				this.particles[i].Draw();
				this.dust[i].Draw();
			}
		}
		this.lifespam--;
	}
}