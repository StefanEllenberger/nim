//Construct a Nim-object
function Nim(player1,player2,maxGrab){
  this.player1 = player1;
  this.player2 = player2;
  this.player1turn = true;
  this.total = 36;
  this.maxGrab = (maxGrab? maxGrab : 3);

  this.victory = function(){
    console.log(this.playername()+" vant!");
  }

  this.playername = function(){
    return (this.player1turn? this.player1.name : this.player2.name);
  }

  this.take = function(amount){
    this.checklegal(amount);
    this.total = this.total - amount;
    if (this.total<1){
      this.victory();
    } else {
      console.log(this.playername()+" fjernet "+amount+", det gjenstår "+this.total);
      this.player1turn = !this.player1turn;
    }
  }

  this.checklegal = function(amount){
    if (amount>this.maxGrab || amount<1){
      throw new Error("Antall må være mellom 1 og "+this.maxGrab);
    }
  }
}
