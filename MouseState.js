function MouseState()
{
	this.Draw = function()
	{
		if(hit)
		{
			push();
			translate(mouseX - 13, mouseY - 13);
			rotate(45);
			image(mouse_im_1, 0, 0, 26, 26, 50, 43, 132, 132);
			pop();
			return;
		}
		push();
		translate(mouseX - 10, mouseY - 10);
		image(mouse_im_0, 0, 0, 20, 20, 50, 43, 132, 132);
		pop();
	}
}