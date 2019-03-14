game = undefined;
animspeed = 750; //robot animation in ms
victory = function(name){
  this.complete = true;
  this.total = 0;
  if (!name) name = "Noen"
  return name+" vant! F5 for ny runde.";
};

function creategame(name1,name2="",total,maxGrab){
  if (!name1) throw new Error("Må ha minst 1 spiller!");
  p2 = (name2!==""?{name: name2,human:true}:{name: "🤖",human:false});
  game = new Nim({name:name1,human:true},p2,victory,total,maxGrab);
  updategameview();
  document.getElementById('setup').style="display: none;"; //removes setup screen
  document.getElementById('maingame').style="display: inline;"; //displays game screen
  document.getElementById('game').style="display: inline";
}

function updategameview(){
  document.getElementById('turn').innerHTML = game.turn.name;
  document.getElementById('remaining1').innerHTML = game.total;
  document.getElementById('remaining2').innerHTML = game.total;
  if (game.turn === game.player1){
    switchplayer(1);
  } else if (game.player2.human == true){
    switchplayer(2);
  } else {
    switchplayer("robot time!");
  }
}

function switchplayer(number){
  if (number==1){
    flipbuttons(1,false);
    flipbuttons(2,true);
  } else if (number==2){
    flipbuttons(1,true);
    flipbuttons(2,false);
  } else {
    flipbuttons(1,true);
    flipbuttons(2,true);
  }
}

function flipbuttons(number,bool){
  id = "p"+number+"btn";
  for (i=1;i<=4;i++){
      document.getElementById(id+i).disabled = bool;
  }
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
    document.getElementById('inputerror1').style.display = "inline";
  } else if (
              document.getElementById("maxgrab").value<2 ||
              document.getElementById("maxgrab").value>4 ||
              document.getElementById("total").value<12 ||
              document.getElementById("total").value>48
             ) {

    document.getElementById('inputerror2').style.display = "inline";
  } else {
    creategame(name1,name2,document.getElementById('total').value,document.getElementById('maxgrab').value);
  }
}
