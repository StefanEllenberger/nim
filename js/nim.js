//Construct a Nim-object
function Nim(player1,player2,maxGrab){
  this.player1 = player1;
  this.player2 = player2;
  this.turn = player1;
  this.complete = false;
  this.total = 36;
  this.maxGrab = (maxGrab>=1 && maxGrab<=6? Math.floor(maxGrab) : 3);

  this.victory = function(){
    this.complete = true;
    this.total = 0;
    return this.turn.name+" vant! F5 for ny runde.";
  }

  this.take = function(amount){
    this.checklegal(amount);
    this.total = this.total - amount;
    if (this.total<1){
      return this.victory();
    } else {
      name = this.turn.name;
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
      throw new Error("Antall kuler må være 1"+(this.maxGrab>1?"-"+this.maxGrab:"")+".");
    }
  }
}
