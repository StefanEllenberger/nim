game = undefined;
animspeed = 750; //robot animation in ms

function creategame(name1,name2=""){
  if (!name1) throw new Error("Må ha minst 1 spiller!");
  p2 = (name2!==""?{name: name2,human:true}:{name: "🤖",human:false})
  game = new Nim({name:name1,human:true},p2);
  updategameview();
  document.getElementById('setup').style="display: none;"; //removes setup screen
  document.getElementById('maingame').style="display: inline;"; //displays game screen
  document.getElementById('game').style="display: inline";
}

function updategameview(){
  document.getElementById('turn').innerHTML = game.turn.name;
  document.getElementById('remaining').innerHTML = game.total;
}

function move(amount){
  try {
    document.getElementById('message').innerHTML = game.take(amount);
  }
  catch(err) {
    document.getElementById('message').innerHTML = "<font color=\"red\">"+err.message+"</font>";
  }
  updategameview();
  if (game.complete) {
    game = undefined;
  } else if (!game.turn.human){
    AImove();
  }
}

function AImove(think=1){
  //create more AI logic here?
  if (think===4) {
    setTimeout(move,animspeed,game.maxGrab);
  } else {
    setTimeout(function (){
      document.getElementById('message').innerHTML = game.turn.name+" tenker"+".".repeat(think);
      AImove(think+1);
    },animspeed);
  }
}

validate = function() {
  name1 = document.getElementById("p1name").value;
  name2 = document.getElementById("p2name").value;
  if (name1=="" || document.getElementById('2p').checked && name2==""){
    document.getElementById('inputerror').style.display = "inline";
  } else {
    creategame(name1,name2,document.getElementById('maxgrab').value);
  }
}
