const containerNav = document.getElementById("Container");
const showColomn_Container = document.getElementById("ShowColomn");
const listItems = document.getElementById("ListItems").children;
const inputPrompt = document.getElementById("CommandPrompt");
const btnPlay = document.getElementById("Plays");
const chatCommandStores = document.getElementById("ChatCommandStores");

const checkSpaceCharac = inputPrompt.value.replace(/\s/g, ``);

let statusBtn_Play = false;
let statusActive_Once = 0;
let statusActive_PlayBtn = false;

const btnShow_Nav = document.getElementById("Show");
const closeBtn = document.getElementById("Close");

let statusShow = false;

const Home = "Home";
const EditorCode = "EditorCode";
const Assistant = "Assistant";

const wordOutput_Procces = ["Engin 1 process....","Checking Engine 1,2,3....","Engine 1 Active","Engine 2 Active","Engine 3 Active","Checking user data....","User data completed!!!","WELCOME TO PANEL_SURYA"];
const commands = ["/help","/yt","/roblox"];

inputPrompt.readOnly = true;
let waitCheckData = undefined;


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}

btnShow_Nav.addEventListener('click', function() {
    if(statusShow !== true) {
        statusShow = true;
        containerNav.style.left = "0px";
        containerNav.style.display = "flex";
    } else if(statusShow !== false) {
        statusShow = false;
        containerNav.style.left = "-240px";
    };
});

closeBtn.addEventListener('click', function() {
    if(statusShow !== true) {
        statusShow = true;
        containerNav.style.left = "0px";
        containerNav.style.display = "flex";
    } else if(statusShow !== false) {
        statusShow = false;
        containerNav.style.left = "-240px";
    };    
});

btnPlay.addEventListener('click', async function(){
    if(commands.includes(inputPrompt.value)) {
        let userInput_Value = inputPrompt.value.toLowerCase();
        const wordsHelp = ["📖 HELP MENU:","/help  - Menampilkan semua perintah","/roblox  - Menuju halaman roblox","/yt  - Menuju halaman youtube"]
        if(userInput_Value === "/help") {
            for(let i=0;i<4;i++) {
            let times = new Date();   
            let newHelp = document.createElement("p");
            newHelp.textContent = "<"+times.toLocaleTimeString()+">" + wordsHelp[i]
            newHelp.id = "ReplyChats";
            if(i === 0) {
                newHelp.style.marginTop = "6px";
            };
            if(i === 3) {
                newHelp.style.marginBottom = "6px";
            }          
            chatCommandStores.appendChild(newHelp);
            console.log(i)
            }
            inputPrompt.value = "";
        };
    } 
    if(commands.includes(inputPrompt.value)) {
        let userInput_Value = inputPrompt.value.toLowerCase();
        if(userInput_Value === "/yt") {
            inputPrompt.value = "";
            let dots = "";
            let newYt = document.createElement("p");
            newYt.style.marginTop = "6px";
            newYt.style.marginBottom = "6px";
            for(i=0;i<5;i++) {
                dots += "."
                await delay(500);
                newYt.textContent = "switch to youtube page" + dots;
                chatCommandStores.appendChild(newYt);
            }
            await delay(550)
            let newAnnouncement = document.createElement("p");
            newAnnouncement.style.marginTop = "6px";
            newAnnouncement.style.marginBottom = "6px";
            newAnnouncement.style.color = "hsl(120, 86%, 47%)";
            newAnnouncement.textContent = "COMPLETED!!!";
            chatCommandStores.appendChild(newAnnouncement);
            window.open("https://www.youtube.com/","_blank");
        }
    }
    if(!commands.includes(inputPrompt.value) && waitCheckData === false && inputPrompt.value.trim() !== "") {
        let newAlert = document.createElement("p");
        let times = new Date();    
        newAlert.textContent = "<"+times.toLocaleTimeString()+"> " + inputPrompt.value + " YOUR COMMAND IS UNKNOWN"
        newAlert.style.color = "hsl(0, 100%, 50%)"
        newAlert.style.marginTop = "2px"
        newAlert.style.marginBottom = "2px"
        chatCommandStores.appendChild(newAlert);
        inputPrompt.value = "";
    }    
    if(statusBtn_Play !== true && statusActive_Once !== 1 && statusActive_PlayBtn !== true && inputPrompt.readOnly !== false) {
        waitCheckData = true;
        statusActive_PlayBtn = true;
        statusActive_Once = 1;
        const checkInput = inputPrompt.value;
            statusBtn_Play = true;
            inputPrompt.value = "";
                for(i=0;i<8;i++) {        
                    let times = new Date();    
                    let newP = document.createElement("p");
                    newP.textContent = "<"+times.toLocaleTimeString()+">"+wordOutput_Procces[i];
                    newP.style.color = "#00FF00"
                    await delay(600)
                    chatCommandStores.appendChild(newP);
                    console.log(newP.textContent)
                    console.log(i)
                }
                console.log(chatCommandStores.children)
                statusBtn_Play = false;
                inputPrompt.readOnly = false;
                waitCheckData = false;
                console.log(waitCheckData)
    };
});

for(let item of listItems) {
    item.addEventListener('click', function(){
        if(item.className === Home) {
            window.location.href = 'styles.css'
        };
        if(item.className === EditorCode) {
            window.location.href = 'styles.css'
        };
        if(item.className === Assistant) {
            window.location.href = 'styles.css'
        };
    });
};