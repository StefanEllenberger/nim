game = undefined;
animspeed = 750; //robot animation in ms
victory = function(name){
  this.complete = true;
  this.total = 0;
  if (!name) name = "Noen"
  return name+" vant! F5 for ny runde.";
};

function creategame(name1,name2="",total=36,maxGrab=3){
  if (!name1) throw new Error("Må ha minst 1 spiller!");
  p2 = (name2!==""?{name: name2,human:true}:{name: "🤖",human:false})
  game = new Nim({name:name1,human:true},p2,victory,total,maxGrab);
  updategameview();
  document.getElementById('setup').style="display: none;"; //removes setup screen
  document.getElementById('maingame').style="display: inline;"; //displays game screen
  document.getElementById('game').style="display: inline";
  switchPlayer1();
  if (game.player2.human == false){
    switchPlayer2();
  }
}

function updategameview(){
  document.getElementById('turn').innerHTML = game.turn.name;
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
  //document.getElementsByTagName('tagName') use this?
  var bool = document.getElementById('p1btn1').disabled;
  document.getElementById('p1btn1').disabled = !bool;
  document.getElementById('p1btn2').disabled = !bool;
  document.getElementById('p1btn3').disabled = !bool;
}

function switchPlayer2(){
  //document.getElementsByTagName('tagName') use this?
  var bool = document.getElementById('p2btn1').disabled;
  document.getElementById('p2btn1').disabled = !bool;
  document.getElementById('p2btn2').disabled = !bool;
  document.getElementById('p2btn3').disabled = !bool;
}

function disableBoth(){
  //document.getElementsByTagName('tagName') use this?
  document.getElementById('p1btn1').disabled = true;
  document.getElementById('p1btn2').disabled = true;
  document.getElementById('p1btn3').disabled = true;
  document.getElementById('p2btn1').disabled = true;
  document.getElementById('p2btn2').disabled = true;
  document.getElementById('p2btn3').disabled = true;

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
    creategame(name1,name2,document.getElementById('total').value,document.getElementById('maxgrab').value);
  }
}
