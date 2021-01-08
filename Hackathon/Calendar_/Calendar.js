let Days = document.querySelector(".days")
for (let days = 1; days < 30; days++) {
    let New_Box = document.createElement("div")
    New_Box.className = `day${days} day`
    New_Box.style = `Width : ${100/7}% `
    New_Box.innerText = `<p>${days}</p>`;
    Days.appendChild(New_Box);
}