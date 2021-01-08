
let Save_Panel = document.querySelector(".Save_Panel")
let Panel = document.querySelector(".Panel")
let Panel_size = Panel.scrollWidth
let level_Btn = document.getElementById("Level_Btn")
var control = []; //控制物件矩陣
let Level = 0; //遊戲難度
let img_Size = 0;
let box_Size = 0;
let answer = [] //完成對照用矩陣
let Step = document.getElementById("Step"); //計算操作次數
let url = "https://picsum.photos/600/600/?random=1"
// let Pic_Self = document.querySelector(".OnloadPic>input")
let fix = document.getElementById("Auto_Finish");


//移置完成狀態
function fixPanel() {
    Panel.innerHTML = `<div><img src=${url}></div>`
    level_Btn.addEventListener("click", getLevel)
    fix.removeEventListener("click", fixPanel)
}


// Pic_Self.addEventListener("change",SelfPic_onload)
// function SelfPic_onload(){
//     url = new FileReader()
//     url.readAsDataURL(Pic_Self.value)
// }

window.onload = () => {
    let img = document.createElement("img")
    let CorrectPic = document.querySelector(".Pic")
    img.src = url;
    CorrectPic.appendChild(img);
}

//傳入指定難度
level_Btn.addEventListener("click", getLevel)
function getLevel() {
    let level = document.getElementById("Level")
    if (!(parseInt(level.value) > 1 && parseInt(level.value) < 11)) {
        alert("請輸入2~10之間的難度")
        return;
    }
    Level = parseInt(level.value) //遊戲難度
    img_Size = Panel_size / Level;
    box_Size = 100 / Level;
    if (Level > 10) {
        alert("是可以跑拉! 只是你的電腦可能會炸掉 輸入10以下的ㄅ~")
        return;
    }

    Step.value = 0;
    Panel.innerHTML = "";
    Save_Panel.innerHTML = "";

    GameStart(Level);
    RandomBox();
    fix.addEventListener("click", fixPanel)
    level_Btn.removeEventListener("click", getLevel)
}

//產生遊戲版面
function GameStart(Level) {
    createBox(Level); //提供每個方塊 div>img 圖片需定位好
    control = [];
    answer = [];
    getControl(Level); //控制每個項目進入矩陣
}

//切割圖片 產出div>img, div.id為 'box$'
function createBox(Level) {
    let item = 0;
    for (let i = 0; i < Level; i++) {
        for (let j = 0; j < Level; j++) {
            let box = document.createElement("div");
            let img = document.createElement("img");
            box.className = `box`
            box.id = `box${item}`
            img.src = url;
            img.setAttribute("style", `position: absolute; top: ${-(i * img_Size)}px;left: ${-(j * img_Size)}px;`);
            box.appendChild(img)
            Save_Panel.appendChild(box)
            item += 1;
        }
    }
    last_Box = document.getElementById(`box${Level * Level - 1}`); //控制項
    last_Box.innerHTML = "";
}

//產出初始矩陣內容
function getControl(Level) {
    for (let i = 0; i < Level * Level; i++) {
        control.push(`box${i}`)
        answer.push(`box${i}`)
    }
}

//依照矩陣內容更新Panel
function Update() {
    for (let Num in control) {
        let box = document.getElementById(control[Num])
        box.style = `width:${box_Size}%;height:${box_Size}%;top: ${Math.floor(Num / Level) * img_Size}px;left: ${(Num % Level) * img_Size}px;`
        box.addEventListener("click", itemMove)
        last_Box.style = "display: none;";
        Panel.appendChild(box);
    }
}

//移動事件
function itemMove() {
    let TheOne = control.indexOf(this.id)
    let TheBox = this.id
    let TheControl = control.indexOf(last_Box.id)
    //移動判斷 右 左 下 上
    if (control[TheOne + 1] == control[TheControl] && TheControl % Level != 0) {
        ChangeAnimation(TheBox, "right");
    }
    else if (control[TheOne - 1] == control[TheControl] && TheOne % Level != 0) {
        ChangeAnimation(TheBox, "left");
    }
    else if (control[TheOne + Level] == control[TheControl]) {
        ChangeAnimation(TheBox, "bottom");
    }
    else if (control[TheOne - Level] == control[TheControl]) {
        ChangeAnimation(TheBox, "top");
    }
    else {
        return;
    }
    ChangeItem(TheOne, TheControl, "player");
    JudgeWin();
}

//移動物件 (所選物件,控制項,事件觸發者)
function ChangeItem(item, controller, operator) {
    [control[item], control[controller]] = [control[controller], control[item]]
    if (operator == "player") {
        Step.value = parseInt(Step.value) + 1;
    }
    // Update()
}

//物件移動動畫 (所選物件,移動方向)
async function ChangeAnimation(item, direction) {
    let box = document.getElementById(item)
    let s = Panel_size / Level;
    var TheWay = direction;
    if (direction == "right") {
        TheWay = "left";
    }
    else if (direction == "bottom") {
        TheWay = "top"
    }
    let status_move = parseInt(box.style[TheWay].replace("px", ""));
    if (direction == "bottom" || direction == "right") {
        console.log(TheWay)
        console.log(direction)
        for (let i = 0; i <= s; i += s / 25) {
            await sleep(4);
            box.style[TheWay] = (status_move + i) + 'px';
        }
    }
    else if (direction == "top" || direction == "left") {
        console.log(TheWay)
        console.log(direction)
        for (let i = 0; i <= s; i += s / 25) {
            await sleep(4);
            box.style[TheWay] = (status_move - i) + 'px';
        }
    }
    else {
        console.log("都沒進阿")
    }
}


async function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}

//判斷勝利
function JudgeWin() {
    if (answer.toString() == control.toString()) {
        setTimeout((() => {
            alert(`You Win!     Step:${Step.value}`)
            Panel.innerHTML = `<div><img src=${url}></div>`
            level_Btn.addEventListener("click", getLevel)
            fix.removeEventListener("click", fixPanel)
            return true;
        }
        ), 200);
    }
    return false;
}


//遊戲開始隨機移動Box
function RandomBox() {
    do {
        for (let i = 0; i < 1000; i++) {
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
    } while (answer.toString() == control.toString())

    Update()
}


//電腦隨機移動
function randomChange(item) {
    if (!item) {
        return;
    }
    let TheOne = control.indexOf(item.id)
    let TheControl = control.indexOf(last_Box.id)

    if (control[TheOne + 1] == control[TheControl] && TheControl % Level != 0) {
        ChangeItem(TheOne, TheControl, "cpu");
    }
    else if (control[TheOne - 1] == control[TheControl] && TheOne % Level != 0) {
        ChangeItem(TheOne, TheControl, "cpu");
    }
    else if (control[TheOne + Level] == control[TheControl] ||
        control[TheOne - Level] == control[TheControl]) {
        ChangeItem(TheOne, TheControl, "cpu");
    }
}


