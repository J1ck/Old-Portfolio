var nameElement = document.getElementById("insideChangingName");
var currentIndex = 0;

var names = [
    "J1ck",
    "qut100",
    "J1ck#2132",
    "@J1cko",
    "notj1ck@gmail.com"
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function changingName(){
    for(i = names[currentIndex].length; i >= 0; i--){
        nameElement.textContent = names[currentIndex].slice(0, i);
        await sleep(50);
    }

    currentIndex++;
    if(currentIndex >= names.length){
        currentIndex = 0;
    }

    for(i = 0; i <= names[currentIndex].length; i++){
        nameElement.textContent = names[currentIndex].slice(0, i);
        await sleep(50);
    }

    setTimeout(changingName, 3000);
}

if(Math.random() > 0.9){
    document.getElementById("icon").src = "assets/easteregg.png";
}

// ---
changingName();