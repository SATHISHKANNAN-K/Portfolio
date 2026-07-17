let history = [];

const colors = {
  R: "#ef4444",
  B: "#3b82f6",
  G: "#22c55e",
  Y: "#facc15",
  P: "#a855f7"
};

let level = 1;
let moves = 0;

let bottles = [];
let selectedBottle = null;

const MAX_HEIGHT = 4;

const levels = [

[
["R","G","R","Y"],
["B","Y","G","B"],
["Y","R","B","G"],
[],
[]
],

[
["R","G","B","Y"],
["Y","B","G","R"],
["G","R","Y","B"],
[],
[]
],

[
["R","R","B","G"],
["G","Y","Y","B"],
["R","G","Y","B"],
[],
[]
]

];

loadLevel();

function loadLevel() {

    moves = 0;
    selectedBottle = null;
    history = [];

    document.getElementById("moves").innerText = moves;
    document.getElementById("level").innerText = level;
    document.getElementById("message").innerText = "";

    bottles = JSON.parse(JSON.stringify(levels[level - 1]));

    draw();
}

function draw() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  bottles.forEach((bottle, index) => {
    const div = document.createElement("div");
    div.className = "bottle";

    if (selectedBottle === index) {
      div.classList.add("selected");
    }

    div.onclick = () => bottleClicked(index);

    bottle.forEach(color => {
      const layer = document.createElement("div");
      layer.className = "layer";
      layer.style.background = colors[color];
      div.appendChild(layer);
    });

    board.appendChild(div);
  });
}

function bottleClicked(index) {

  // First selection
  if (selectedBottle === null) {
    if (bottles[index].length === 0) return;

    selectedBottle = index;
    draw();
    return;
  }

  // Same bottle clicked again
  if (selectedBottle === index) {
    selectedBottle = null;
    draw();
    return;
  }

  pour(selectedBottle, index);

  selectedBottle = null;

  draw();

  checkWin();
}

function pour(from, to) {

    const source = bottles[from];
    const target = bottles[to];

    if (source.length === 0) return;
    if (target.length >= MAX_HEIGHT) return;

    const color = source[source.length - 1];

    if (
        target.length > 0 &&
        target[target.length - 1] !== color
    ) {
        return;
    }

    // ✅ Save current state BEFORE pouring
    history.push(JSON.stringify(bottles));

    let amount = 1;

    for (let i = source.length - 2; i >= 0; i--) {
        if (source[i] === color)
            amount++;
        else
            break;
    }

    const free = MAX_HEIGHT - target.length;

    amount = Math.min(amount, free);

    for (let i = 0; i < amount; i++) {
        target.push(source.pop());
    }

    moves++;
    document.getElementById("moves").innerText = moves;
}

function checkWin(){

    for(const bottle of bottles){

        if(bottle.length===0)
            continue;

        if(bottle.length!==MAX_HEIGHT)
            return;

        const first=bottle[0];

        for(const color of bottle){

            if(color!==first)
                return;

        }

    }

    document.getElementById("message").innerHTML="🎉 Level Complete!";

launchConfetti();

    setTimeout(()=>{

        level++;

        if(level>levels.length){

            document.getElementById("message").innerHTML=
            "🏆 Congratulations! You completed every level.";

            level=1;

        }

        loadLevel();

        document.getElementById("message").innerHTML="";

    },1500);

}

function launchConfetti(){

  const colors=[
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#facc15",
    "#a855f7"
  ];

  for(let i=0;i<120;i++){

    const c=document.createElement("div");

    c.className="confetti";

    c.style.left=Math.random()*100+"vw";

    c.style.background=
      colors[Math.floor(Math.random()*colors.length)];

    c.style.animationDuration=
      2+Math.random()*3+"s";

    c.style.transform=
      `rotate(${Math.random()*360}deg)`;

    document.body.appendChild(c);

    setTimeout(()=>c.remove(),5000);
  }
}

document.getElementById("undo").onclick = () => {

    if(history.length==0)
        return;

    bottles = JSON.parse(history.pop());

    if(moves>0)
        moves--;

    document.getElementById("moves").innerText=moves;

    selectedBottle=null;

    draw();

}

document
  .getElementById("restart")
  .onclick = loadLevel;

history.push(JSON.stringify(bottles));