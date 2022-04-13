//elementoQueQueroQueApareca.scrollIntoView(); query selector innerhtml= entao scroll
let user;
let username;
let data={
    name: ""
};
let array=[];
function joinChat(){
    username=document.getElementById("usernameInput").value;
    data={
        name: username
    };
    let promise=axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',data);
    promise.then(success);
    promise.catch(fail);
}
function fail(error){
    console.log(error.response.status);
    if(error.response.status==400){
        alert(`Erro no login, usuário ja está em uso. Por favor escolha outro nome de usuário`);
    }
}
function success(){
    document.getElementById("loginScreen").style.display="none";
    console.log("success");
    // joinHTML();
    // privateHTML();
    // joinHTML();
    // privateHTML();
    // messageAllHTML();
    // messageAllHTML();
    loop();
}
function loop(){
    setTimeout(function(){
        axios.post('https://mock-api.driven.com.br/api/v6/uol/status',data);
        let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
        promise.then(printMessages);
        loop();
    }, 5000); 
    
}

function printMessages(message){
    document.querySelector(".feed").innerHTML=``;
    for(let i=0;i<message.data.length;i++){
        if(message.data[i].type=="status"){
            joinLeaveHTML(message.data[i],i);
        }
        if(message.data[i].type=="message"){
            messageAllHTML(message.data[i],i);
        }
        if(message.data[i].type=="private_message"){
            privateHTML(message.data[i],i);
        }
    }
}
function joinLeaveHTML(a,i){
    document.querySelector(".feed").innerHTML+=`
    <div id="${i}" class="messageBox grey">
        <h2>(${a.time})</h2><h1> <strong>${a.from}</strong> ${a.text}</h1>
    </div>`
    document.getElementById(i).scrollIntoView();
}
function privateHTML(a,i){
    document.querySelector(".feed").innerHTML+=`
    <div id="${i}"class="messageBox pink">
        <h2>(${a.time})</h2><h1> <strong>${a.from}</strong> reservadamente para <strong>${a.to}</strong>: ${a.text}</h1>
    </div>`
    document.getElementById(i).scrollIntoView();
}
function messageAllHTML(a,i){
    document.querySelector(".feed").innerHTML+=`
    <div id="${i}" class="messageBox white">
        <h2>(${a.time}) </h2><h1> <strong>${a.from}</strong> para <strong>todos</strong>: ${a.text} </h1>
    </div>`
    document.getElementById(i).scrollIntoView();
}
function sendMessage(){
    let messageToSend=document.querySelector(".message").value;
    let dataSendMessage={
        from: username,
        to: "Todos",
        text: messageToSend,
        type: "message" // ou "private_message" para o bônus
    };
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',dataSendMessage);
}
