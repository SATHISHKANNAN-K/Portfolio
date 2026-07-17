const board = document.getElementById("board");
const statusText = document.getElementById("status");

let tiles = [];

function init(){
    tiles = [...Array(15).keys()].map(x=>x+1);
    tiles.push(0);
    draw();
}

function draw(){

    board.innerHTML="";

    tiles.forEach((value,index)=>{

        const tile=document.createElement("div");

        if(value===0){
            tile.className="tile empty";
        }else{
            tile.className="tile";
            tile.innerText=value;
            tile.onclick=()=>move(index);
        }

        board.appendChild(tile);
    });

    checkWin();
}

function move(index){

    const emptyIndex=tiles.indexOf(0);

    const validMoves=[
        emptyIndex-1,
        emptyIndex+1,
        emptyIndex-4,
        emptyIndex+4
    ];

    if(
        validMoves.includes(index)&&
        isAdjacent(index,emptyIndex)
    ){
        [tiles[index],tiles[emptyIndex]]=
        [tiles[emptyIndex],tiles[index]];
        draw();
    }
}

function isAdjacent(a,b){

    const rowA=Math.floor(a/4);
    const rowB=Math.floor(b/4);

    if(Math.abs(a-b)===1 && rowA===rowB)
        return true;

    if(Math.abs(a-b)===4)
        return true;

    return false;
}

function shuffle(){

    statusText.innerHTML="";

    for(let i=0;i<500;i++){

        const empty=tiles.indexOf(0);

        let neighbors=[];

        if(empty%4!==0) neighbors.push(empty-1);
        if(empty%4!==3) neighbors.push(empty+1);
        if(empty>3) neighbors.push(empty-4);
        if(empty<12) neighbors.push(empty+4);

        const random=
        neighbors[Math.floor(Math.random()*neighbors.length)];

        [tiles[random],tiles[empty]]=
        [tiles[empty],tiles[random]];
    }

    draw();
}

function checkWin(){

    for(let i=0;i<15;i++){
        if(tiles[i]!==i+1)
            return;
    }

    if(tiles[15]===0){
        statusText.innerHTML="🎉 Congratulations! You solved it!";
    }
}

init();