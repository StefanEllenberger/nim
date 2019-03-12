//Construct a Nim-object
function Nim(player1,player2,victory,total,maxGrab){
  this.player1 = player1;
  this.player2 = player2;
  this.turn = player1;
  this.complete = false;
  this.total = total;
  this.maxGrab = (maxGrab>=1 && maxGrab<=6? Math.floor(maxGrab) : 3); //denne overkjører ukurante argument som 19 eller 2.999.

  this.victory = victory;

  this.take = function(amount){
    this.checklegal(amount);
    name = this.turn.name;
    this.total = this.total - amount;
    if (this.total<1){
      return this.victory(name);
    } else {
      this.switchturns();
      return name+" tok "+amount+".";
    }
  }

  this.switchturns = function() {
    if (this.turn==this.player1){
      this.turn = this.player2;
    } else {
      this.turn = this.player1;
    }
  }

  this.checklegal = function(amount){
    if (this.complete) throw new Error("Spillet er over!");
    if (amount>this.maxGrab || amount<1){
      throw new Error("Antall må være mellom 1 og "+this.maxGrab);
    }
  }
}
