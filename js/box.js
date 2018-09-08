/**
 *
 * @constructor
*/

function Box(x,y,width)
{
    this.x = x;
    this.y = y;
    this.w = width;
    this.clicked=false;
}

Box.prototype.show = function() {
    fill(140, 179, 217);
    rect(this.x, this.y, this.w, this.w);
    if (this.clicked){
        fill(179, 0, 0);
        ellipseMode(CORNER);
        ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
    }
}
