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
  console.log("Kjørte updategameview, total er: "+game.total);
  document.getElementById('remaining1').innerHTML = game.total;
  document.getElementById('remaining2').innerHTML = game.total;
  switchPlayer1();
  if (game.player2.human == true){
    switchPlayer2();
  }
  if (game.complete){
    disableBoth();
  }
}

function switchPlayer1(){
  var bool = document.getElementById('p1btn1').disabled;
  document.getElementById('p1btn1').disabled = !bool;
  document.getElementById('p1btn2').disabled = !bool;
  document.getElementById('p1btn3').disabled = !bool;
  document.getElementById('p1btn4').disabled = !bool;
}

function switchPlayer2(){
  var bool = document.getElementById('p2btn1').disabled;
  document.getElementById('p2btn1').disabled = !bool;
  document.getElementById('p2btn2').disabled = !bool;
  document.getElementById('p2btn3').disabled = !bool;
  document.getElementById('p2btn4').disabled = !bool;
}

function disableBoth(){
  document.getElementById('p1btn1').disabled = true;
  document.getElementById('p1btn2').disabled = true;
  document.getElementById('p1btn3').disabled = true;
  document.getElementById('p1btn4').disabled = true;
  document.getElementById('p2btn1').disabled = true;
  document.getElementById('p2btn2').disabled = true;
  document.getElementById('p2btn3').disabled = true;
  document.getElementById('p2btn4').disabled = true;

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
