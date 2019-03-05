game = undefined;

function creategame(name1,name2=""){
  if (!name1) throw new Error("Må ha minst 1 spiller!");
  p2 = (name2!==""?{name: name2,human:true}:{name: "Computer",human:false})
  game = new Nim({name:name1,human:true},p2);
}

function AImove(game){
  //create more AI logic here
  return game.maxGrab;
}

function play(name1,name2){
  game = creategame(name1,name2);
  while (!game.complete){

  }
}
