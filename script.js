let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".reset");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector(".msg");

let turn=true;
let count=0;

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn){
            box.innerText="X";
            box.disabled=true;
            turn=false;
        }
        
        checkWinner();
        
        if(count===4 && msg.innerText===""){
            msg.innerText="It was a Draw!!";
            msgContainer.classList.remove("hide");
            resetBtn.innerText="New Game";
        }

        if(!turn && count<4){
            compTurn();
            count++;
            turn=true;
        }
        
        checkWinner();
        
    });
});

const rand=(n)=>{
    let index=Math.floor(Math.random()*n);
    return index;
}

const compTurn=()=>{
    let idxArr=[];
    let i=0;
    let c=0;

    for(let box of boxes){
        if(box.innerText===""){
            idxArr[c]=i;
            c++;
        }
        i++;
    }
    let idx=rand(idxArr.length);

    boxes[idxArr[idx]].innerText="O";
    boxes[idxArr[idx]].disabled=true;
}

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val === pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                count=5;
            }
        }
    }
}

const showWinner=(winnerVal)=>{
    for(let box of boxes){
        box.disabled=true;
    }
    if(winnerVal==="X")
        msg.innerText="Congratulations!! Player Wins.";
    else msg.innerText="Oops! Computer Wins.";

    msgContainer.classList.remove("hide");
    resetBtn.innerText="New Game";
}


resetBtn.addEventListener("click",()=>{
    turn=true;
    count=0;
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
    resetBtn.innerText="Reset Game";
    msgContainer.classList.add("hide");
});
