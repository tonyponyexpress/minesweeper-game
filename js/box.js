/**
 *
 * @constructor
*/

function Box(x,y,width)
{
    this.x = x;
    this.y = y;
    this.w = width;
    this.mine = false;
    this.clicked = false;
    this.count = 0;
}

Box.prototype.show = function() {
    fill(250, 250, 250  );
    rect(this.x, this.y, this.w, this.w);
    if (this.clicked){
        if(this.mine==true){
            // red
            fill(179, 0, 0);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==1){
            // yellow
            fill(255, 235, 59);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==2){
            // light green
            fill(190, 220, 57);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==3){
            // dark green
            fill(76, 175, 80);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==4){
            // light blue
            fill(0, 188, 212  );
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==5){
            // blue
            fill(33, 150, 243);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==6){
            // dark blue
            fill(63, 81, 181);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==7){
            // purple
            fill(103, 58, 183);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==8){
            // pink
            fill(170, 44, 192);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else{
            // gray
            fill(224, 224, 224);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
    }

}
