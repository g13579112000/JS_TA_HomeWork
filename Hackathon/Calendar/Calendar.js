
let Save_Panel = document.querySelector(".Save_Panel")
let Panel = document.querySelector(".Panel")
let Panel_size = Panel.scrollWidth
let level_Btn = document.getElementById("Level_Btn")
var control = []; //控制物件矩陣
let Level = 0;
let answer =[]

level_Btn.addEventListener("click", getLevel)
function getLevel() {
    let level = document.getElementById("Level")
    if(!(parseInt(level.value)>1&&parseInt(level.value)<11)){
        alert("請輸入2~10之間的難度")
        return;
    }
    Level = parseInt(level.value) //遊戲難度
    if(Level>10){
        alert("是可以跑拉! 只是你的電腦可能會炸掉 輸入10以下的ㄅ~")
        return;
    }
    Save_Panel.innerHTML = "";
    GameStart(Level); //產生遊戲版面
    RandomBox();
    level_Btn.removeEventListener("click",getLevel)
}

function GameStart(Level) {
    createBox(Level); //提供每個方塊 div>img 圖片需定位好
    getControl(Level); //控制每個項目進入矩陣
}

function createBox(Level) {
    let box_Size = 100 / Level;
    let img_Size = Panel_size / Level;
    let item = 0;
    for (let i = 0; i < Level; i++) {
        for (let j = 0; j < Level; j++) {
            let box = document.createElement("div");
            let img = document.createElement("img");
            box.className = `box`
            box.id = `box${item}`
            box.setAttribute("style", `width:${box_Size}%;height:${box_Size}%;`);
            img.src = `https://picsum.photos/600/600/?random=1`
            img.setAttribute("style", `position: absolute; top: ${-(i * img_Size)}px;left: ${-(j * img_Size)}px;z-index:-1;`);
            box.appendChild(img)
            Save_Panel.appendChild(box)
            item += 1;
        }
    }
    last_Box = document.getElementById(`box${Level * Level - 1}`); //控制項
    last_Box.innerHTML = "";
}

function getControl(Level) {
    for (let i = 0; i < Level * Level; i++) {
        control.push(`box${i}`)
        answer.push(`box${i}`)
    }
    Update();
}

//依照矩陣內容更新Panel
function Update() {
    Panel.innerHTML = "";
    for (let box of control) {
        let item = document.getElementById(`${box}`)

        let copy_item = item.cloneNode(true)
        copy_item.addEventListener("click", itemMove);
        Panel.appendChild(copy_item)
    }
}

//移動事件
function itemMove() {
    let TheOne = control.indexOf(this.id)
    let TheControl = control.indexOf(last_Box.id)

    if (control[TheOne + 1] == control[TheControl] && TheControl % Level != 0) {
        ChangeItem(TheOne, TheControl);
    }
    else if (control[TheOne - 1] == control[TheControl] && TheOne % Level != 0) {
        ChangeItem(TheOne, TheControl);
    }
    else if (control[TheOne + Level] == control[TheControl] ||
        control[TheOne - Level] == control[TheControl]) {
        ChangeItem(TheOne, TheControl);
    }
    Update();
    JudgeWin();
}

//移動物件
function ChangeItem(TheOne, TheControl) {
    let save;
    save = control[TheOne];
    control[TheOne] = control[TheControl]
    control[TheControl] = save;
}

//判斷勝利
function JudgeWin(){
    if(answer.toString() == control.toString()){
        setTimeout((()=>alert("You Win!")),200)
        
    }
}

//遊戲開始隨機移動Box
function RandomBox() {
    for(let i = 0;i<1000;i++){
        let Num = Math.floor(Math.random() * 10)
    let TheControl = control.indexOf(last_Box.id)
    if (Num == 0 || Num == 1 || Num == 2) {
        randomChange(document.getElementById(control[TheControl + 1]))
    }
    else if (Num == 3 || Num == 4 || Num == 5) {
        randomChange(document.getElementById(control[TheControl - 1]))
    }
    else if (Num == 6 || Num == 7) {
        randomChange(document.getElementById(control[TheControl + Level]))
    }
    else if (Num == 8 || Num == 9) {
        randomChange(document.getElementById(control[TheControl - Level]))
    }
    }
    
    Update()
}

function randomChange(item) {
    if(!item){
        return;
    }
    let TheOne = control.indexOf(item.id)
    let TheControl = control.indexOf(last_Box.id)

    if (control[TheOne + 1] == control[TheControl] && TheControl % Level != 0) {
        ChangeItem(TheOne, TheControl);
    }
    else if (control[TheOne - 1] == control[TheControl] && TheOne % Level != 0) {
        ChangeItem(TheOne, TheControl);
    }
    else if (control[TheOne + Level] == control[TheControl] ||
        control[TheOne - Level] == control[TheControl]) {
        ChangeItem(TheOne, TheControl);
    }
}