const containerNav = document.getElementById("Container");
const showColomn_Container = document.getElementById("ShowColomn");
const listItems = document.getElementById("ListItems").children;
const inputPrompt = document.getElementById("CommandPrompt");
const btnPlay = document.getElementById("Plays");
const btnClear = document.getElementById("Clear");
const chatCommandStores = document.getElementById("ChatCommandStores");
const childrenChat_Command = chatCommandStores.children;
const output = document.getElementById("Output");
const navbar = document.getElementById("Navbar");
const statusMonitor = document.getElementById("StatusMonitoringPrompt");
const randomNumberRam = document.getElementById("RandomNumberRam");
const randomNumberProcesor = document.getElementById("RandomNumberProcesor");
const containerRps = document.getElementById("ContainerRockPaperScissors");
const closeContainer_RPS = document.getElementById("CloseRPS_Menu");
const showRandomBotRps = document.getElementById("RandomRPS");
const containerWinOrDefeat_RPS = document.getElementById("ContainerWinOrDefeat");
const textWinOrDefeat = document.getElementById("WinOrDefeat");
const containerRetry = document.getElementById("ContainerRetry");
const containerWarnings = document.getElementById("ContainerWarnings");
// const itemsAlerts = document.getElementById("Alerts");

const checkSpaceCharac = inputPrompt.value.replace(/\s/g, ``);

let statusBtn_Play = false;
let statusActive_Once = 0;
let statusActive_PlayBtn = false;
let statusGame_RPS = false;
let warningActive = false;
let emojiBot_RPS;

// let startX = 0;
// let currentX = 0;

const btnShow_Nav = document.getElementById("Show");
const closeBtn = document.getElementById("Close");

let statusShow = false;

const Home = "Home";
const EditorCode = "EditorCode";
const Assistant = "Assistant";

const wordOutput_Procces = ["Engin 1 process....","Checking Engine 1,2,3....","Engine 1 Active","Engine 2 Active","Engine 3 Active","Checking user data....","User data completed!!!","WELCOME TO PANEL_SURYA"];
const commands = ["/help","/yt","/roblox","/chatgpt","/rps"];
const emojiRPS = ["✊","✌️","✋"];
const valueEmojiRps = [{ 0: "✊" }, { 1: "✌️"}, { 2: "✋"}]

inputPrompt.readOnly = true;
let waitCheckData = undefined;

// //Animation ScrollReveal:
// ScrollReveal({
// reset: true,
// distance: '10px',
// duration: 1000,
// delay: 200,
// viewFactor: 0.25,
// cleanup: true //membersihkan style yang ditempel jadi bersih kek class= "transform: translateY(0px)" jadi gini class = ""
// });       

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}

function randomChanceRPS() {
    return Math.round(Math.random() * 2)
}

function retryRps() {
    let statusActive = false;
    if(statusActive === false) {
        statusActive = true;
        containerRetry.classList.add("putarAnimation");
        setTimeout(() =>  {
        containerRetry.classList.remove("putarAnimation");
        containerRetry.classList.remove('flex','opacity-100');    
        containerRetry.classList.add('hidden','opacity-0');
        showRandomBotRps.textContent = "";
        containerWinOrDefeat_RPS.classList.remove("flex","opacity-100")        
        containerWinOrDefeat_RPS.classList.add("hidden","opacity-0")
        let allDivContainerRPS = document.querySelectorAll("#ContainerRockPaperScissorsButton")
        allDivContainerRPS.forEach(item => {
            item.classList.remove("hidden","opacity-0");
            item.classList.add("flex","opacity-100");
        });
        },500);        
        statusActive = false;    
    }
}

async function showBotEmojiRPS(e) {
    let divContainerRPS = e.target.closest('[id*="ContainerRockPaperScissorsButton"]');
    if(divContainerRPS) {
        let nilai = divContainerRPS.dataset.angka

        if(nilai) {
            let allDivContainerRPS = document.querySelectorAll("#ContainerRockPaperScissorsButton")
            allDivContainerRPS.forEach(item => {
                item.classList.remove("flex","opacity-100");
                item.classList.add("hidden","opacity-0");
            });
            let randomNumber = randomChanceRPS();
            let emoji = emojiRPS[randomNumber];
            showRandomBotRps.textContent = emoji;
            containerWinOrDefeat_RPS.classList.remove("hidden","opacity-0")
            containerWinOrDefeat_RPS.classList.add("flex","opacity-100")
            let convertNilai = Number(nilai)
            let hasilGame = (convertNilai - randomNumber + 3) % 3
            if(hasilGame === 0) {
                textWinOrDefeat.textContent = "TIE";
                containerRetry.classList.remove('hidden','opacity-0');
                containerRetry.classList.add('flex','opacity-100');
            } else if(hasilGame === 1) {
                textWinOrDefeat.textContent = "DEFEAT";
                containerRetry.classList.remove('hidden','opacity-0');
                containerRetry.classList.add('flex','opacity-100');                
            } else {
                textWinOrDefeat.textContent = "WIN";
                containerRetry.classList.remove('hidden','opacity-0');
                containerRetry.classList.add('flex','opacity-100');                
            }            
        }
    }
}

function executeServerClient() {
    fetch("http://localhost:3000/system")
     .then(res => res.json())
     .then(data => {
        if(data) {
            containerWarnings.classList.remove('fixed','opacity-100','ShowAlert'); 
            containerWarnings.classList.add('hidden','opacity-0');
        }
        randomNumberProcesor.innerText = data.cpuPercent

        randomNumberRam.innerText = data.ramPercent

        if(data.cpuPercent > 70) {
            statusMonitor.classList.remove('text-[#074207]','bg-[rgba(22,205,22,0.2)]','outline-[rgba(0,255,0,0.45)]');
            statusMonitor.classList.add('text-[#ee0b0b]','bg-[rgba(220,20,20,0.2)]','outline-[rgba(209,28,28,0.45)]');
            statusMonitor.textContent = "HIGH!!!";
        } else {
            statusMonitor.classList.remove('text-[#ee0b0b]','bg-[rgba(220,20,20,0.2)]','outline-[rgba(209,28,28,0.45)]');
            statusMonitor.classList.add('text-[#074207]','bg-[rgba(22,205,22,0.2)]','outline-[rgba(0,255,0,0.45)]');
            statusMonitor.textContent = "ON";
        }
     })
     .catch(warning => {
        console.clear()
        if(warning && warningActive === false) {
            warningActive = true;
            containerWarnings.classList.add('ShowAlert');
            console.error("ERROR 404!!!");
        }
     });
};

// Fungsi bantu untuk logika hapus (Clear) agar tidak duplikat di listener Click & Keydown
function clearChats() {
    for(items of childrenChat_Command) {
        if(statusActive_PlayBtn !== false && waitCheckData !== true) {
            items.innerHTML  = '';
        } else {
            console.log("START FIRST!!!")
        }
    }
}

// Fungsi bantu untuk logika inti (Play/Input) agar tidak duplikat di Change & Click
async function executeLogic() {
    if(commands.includes(inputPrompt.value)) {
        let userInput_Value = inputPrompt.value.toLowerCase();
        const wordsHelp = ["📖 HELP MENU:","/help  - Menampilkan semua perintah","/roblox  - Menuju halaman roblox","/yt  - Menuju halaman youtube","/rps - Memuat halaman bermain Rock,Paper,Scissor"]
        
        if(userInput_Value === "/help") {
            for(let i=0;i<5;i++) {
                let times = new Date();   
                let newHelp = document.createElement("p");
                newHelp.textContent = "<"+times.toLocaleTimeString()+">" + wordsHelp[i]
                newHelp.id = "ReplyChats";
                newHelp.classList.add('text-[#ffffff]', 'text-[15px]', 'font-bold') // Sesuai permintaan di btnPlay
                if(i === 0) newHelp.style.marginTop = "6px";
                if(i === 3) newHelp.style.marginBottom = "6px";                
                chatCommandStores.appendChild(newHelp);
                newHelp.scrollIntoView({ behavior: 'smooth', block: 'end'});
            }
            inputPrompt.value = "";
        } else if(userInput_Value === "/yt" || userInput_Value === "/roblox" || userInput_Value === "/chatgpt" || userInput_Value === "/rps") {
            let times = new Date();  
            let commands = {
                "/yt": "youtube",
                "/roblox": "roblox",
                "/chatgpt": "chatgpt",
                "/rps": "RPS"
            }
            let target = commands[userInput_Value] ?? undefined; //kalau user ketik /yt maka dia ambil nilai /yt itu yakni youtube outputnya!
            let url;
            if(target === "youtube") {
                url = "https://www.youtube.com/";
            } else if(target === "roblox") {
                url = "https://www.roblox.com/home";
            } else if(target === "chatgpt") {
                url = "https://chatgpt.com/";
            } else if(target === "RPS" ) {
                    statusGame_RPS = true;
            }
            inputPrompt.value = "";
            let dots = "";
            let newYt = document.createElement("p");
            newYt.style.marginTop = "6px";
            newYt.style.marginBottom = "6px";
            for(i=0;i<5;i++) {
                dots += "."
                await delay(500);
                newYt.textContent = `<${times.toLocaleTimeString()}> switch to ${target} page` + dots;
                chatCommandStores.appendChild(newYt);
                newYt.scrollIntoView({ behavior: 'smooth', block: 'end'});
            }
            await delay(550)
            let newAnnouncement = document.createElement("p");
            newAnnouncement.style.marginTop = "6px";
            newAnnouncement.style.marginBottom = "6px";
            newAnnouncement.style.color = "hsl(120, 86%, 47%)";
            newAnnouncement.textContent = "<"+times.toLocaleTimeString()+">" + " COMPLETED!!!";
            chatCommandStores.appendChild(newAnnouncement);
            newAnnouncement.scrollIntoView({ behavior: 'smooth', block: 'end'});
            if(target === target && statusGame_RPS === false) {
                window.open(url,'_blank');
            } else if(target === target && statusGame_RPS === true) {
                statusGame_RPS = false;
                containerRps.classList.remove("hidden");
                containerRps.classList.remove("'m-auto'");
                setTimeout(() => {
                    containerRps.classList.remove('opacity-0','scale-90');
                    containerRps.classList.add('opacity-100','scale-100','flex','justify-center','items-center');
                },10);
                return;
            }
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
        newAlert.scrollIntoView({ behavior: 'smooth', block: 'end'});
        inputPrompt.value = "";
    }    

    if(statusBtn_Play !== true && statusActive_Once !== 1 && statusActive_PlayBtn !== true && inputPrompt.readOnly !== false) {
        waitCheckData = true;
        statusActive_PlayBtn = true;
        statusActive_Once = 1;
        statusBtn_Play = true;
        inputPrompt.value = "";
        for(i=0;i<8;i++) {        
            let times = new Date();    
            let newP = document.createElement("p");
            newP.textContent = "<"+times.toLocaleTimeString()+">"+wordOutput_Procces[i];
            newP.style.color = "#00FF00"
            await delay(600)
            chatCommandStores.appendChild(newP);            
        }
        statusMonitor.classList.remove('text-[#ee0b0b]','bg-[rgba(220,20,20,0.2)]','outline-[rgba(209,28,28,0.45)]');
        statusMonitor.classList.add('text-[#074207]','bg-[rgba(22,205,22,0.2)]','outline-[rgba(0,255,0,0.45)]');
        // fetch("http://localhost:3000/system")
        // .then(res => res.json())
        // .then(data => {
        //     console.log("CPU:", data.cpu);
        //     console.log("RAM:", data.totalRamGB);
        // })
        // .catch(err => console.error(err));
        statusMonitor.textContent = "ON"
        statusBtn_Play = false;
        inputPrompt.readOnly = false;
        waitCheckData = false;
        setInterval(executeServerClient,1000)
    };
}

// Toggle Nav Logic (Duplikasi dihapus)
async function toggleNav() {
    statusShow = !statusShow;
    if(statusShow) {
        containerNav.classList.add('left-0', 'transition', 'duration-300', 'ease-in-out')
        containerNav.classList.remove('left-[-240px]');
    } else {
        containerNav.classList.remove('left-0', 'transition', 'duration-300', 'ease-in-out')
        containerNav.classList.add('left-[-240px]');
    }
}

function closeContainerRps() {
    setTimeout(() => {
    containerRps.classList.remove('opacity-100','scale-100','flex','justify-center','items-center');
    containerRps.classList.add('opacity-0','scale-90','m-auto','hidden');
    }, 10);    
    showRandomBotRps.textContent = "";
    containerWinOrDefeat_RPS.classList.remove("flex","opacity-100")    
    containerWinOrDefeat_RPS.classList.add("hidden","opacity-0")
    let allDivContainerRPS = document.querySelectorAll("#ContainerRockPaperScissorsButton")
    allDivContainerRPS.forEach(item => {
        item.classList.remove("hidden","opacity-0");
        item.classList.add("flex","opacity-100");
    });    
};

// EVENT LISTENERS
document.addEventListener('click', showBotEmojiRPS);
btnClear.addEventListener('click', clearChats);
document.addEventListener('keydown', (key) => { if(key.key === "q" || key.key === "Q") clearChats(); });
inputPrompt.addEventListener('change', executeLogic);
btnPlay.addEventListener('click', executeLogic);
btnShow_Nav.addEventListener('click', toggleNav);
closeBtn.addEventListener('click', toggleNav);
closeContainer_RPS.addEventListener('click', closeContainerRps);
containerRetry.addEventListener('click',retryRps);
// itemsAlerts.addEventListener('touchstart', (e) => {
//     startX = e.touches[0].clientX;
// });
// itemsAlerts.addEventListener('touchmove', (e) => {
//     currentX = e.touches[0].clientX - startX;
//     itemsAlerts.style.transform = `translateX(${currentX}px)`;
// });
// itemsAlerts.addEventListener('touchend', () => {
//     if(Math.abs(currentX) > 150) {
//         itemsAlerts.style.transform = `translateX(${currentX > 0 ? 100 : -100}%)`
//         itemsAlerts.style.opacity = '0';
//         setTimeout(() => itemsAlerts.remove(),200)
//     } else {
//         itemsAlerts.style.transform = 'translateX(0)';
//     };    
// })


for(let item of listItems) {
    item.addEventListener('click', function(){
        if(item.textContent === Home || item.textContent === EditorCode || item.textContent === Assistant) {
            window.location.href = 'style.css';
        }
    });
};