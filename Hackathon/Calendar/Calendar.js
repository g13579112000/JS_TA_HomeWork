
let Save_Panel = document.querySelector(".Save_Panel")
let Panel = document.querySelector(".Panel")
let Panel_size = Panel.scrollWidth
let level_Btn = document.getElementById("Level_Btn")
var control = []; //控制物件矩陣
let Level = 0;
let answer = []
let Step = document.getElementById("Step");

level_Btn.addEventListener("click", getLevel)
function getLevel() {
    let level = document.getElementById("Level")
    if (!(parseInt(level.value) > 1 && parseInt(level.value) < 11)) {
        alert("請輸入2~10之間的難度")
        return;
    }
    Level = parseInt(level.value) //遊戲難度
    if (Level > 10) {
        alert("是可以跑拉! 只是你的電腦可能會炸掉 輸入10以下的ㄅ~")
        return;
    }

    Step.value = 0;
    Panel.innerHTML = "";
    Save_Panel.innerHTML = "";

    GameStart(Level); //產生遊戲版面
    RandomBox();
    level_Btn.removeEventListener("click", getLevel)
}

function GameStart(Level) {
    createBox(Level); //提供每個方塊 div>img 圖片需定位好
    control = [];
    answer = [];
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

    //移動判斷 右 左 下 上
    if (control[TheOne + 1] == control[TheControl] && TheControl % Level != 0) {
        ChangeItem(TheOne, TheControl, "player");
        ChangeAnimation(TheOne, "right");
    }
    else if (control[TheOne - 1] == control[TheControl] && TheOne % Level != 0) {
        ChangeItem(TheOne, TheControl, "player");
        ChangeAnimation(TheOne, "left");
    }
    else if (control[TheOne + Level] == control[TheControl]) {
        ChangeItem(TheOne, TheControl, "player");
        ChangeAnimation(TheOne, "bottom");
    }
    else if (control[TheOne - Level] == control[TheControl]) {
        ChangeItem(TheOne, TheControl, "player");
        ChangeAnimation(TheOne, "top");
    }
    Update();
    JudgeWin();
}

//移動物件 (所選物件,控制項,事件觸發者)
function ChangeItem(item, controller, operator) {
    [control[item], control[controller]] = [control[controller], control[item]]
    if (operator == "player") {
        Step.value = parseInt(Step.value) + 1;
    }
}

//物件移動動畫 (所選物件,控制項,移動方向)
function ChangeAnimation(item, direction) {
    // let animation = element.animate(keyframes, options);
    switch (direction) {
        case "top":
            break;
        case "bottom":
            break;
        case "left":
            break;
        case "right":
            break;
    }
}

//判斷勝利
function JudgeWin() {
    if (answer.toString() == control.toString()) {
        setTimeout((() => alert(`You Win!     Step:${Step.value}`)), 200)
        Panel.innerHTML = `<div><img src="https://picsum.photos/600/600/?random=1"></div>`
        level_Btn.addEventListener("click", getLevel)
        return true;
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
    } while (JudgeWin() == true)

    Update()
}

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