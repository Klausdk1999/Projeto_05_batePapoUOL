let user;
let username;
let messageType="message";
let messageTo="Todos";
let data={
    name: ""
};
let array=[];
let lastMessageTo;
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
    if(error.response.status==400){
        alert(`Erro no login, usuário ja está em uso. Por favor escolha outro nome de usuário`);
    }
}
function success(){
    document.getElementById("loginScreen").style.display="none";
    loop();
}
function loop(){
    setTimeout(function(){
        axios.post('https://mock-api.driven.com.br/api/v6/uol/status',data);
        let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
        promise.then(printMessages);
        loop();
    }, 3000);   
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
    if(a.to=="Todos" || a.to==username || a.from==username){
        document.querySelector(".feed").innerHTML+=`
        <div id="${i}"class="messageBox pink">
            <h2>(${a.time})</h2><h1> <strong>${a.from}</strong> reservadamente para <strong>${a.to}</strong>: ${a.text}</h1>
        </div>`
        document.getElementById(i).scrollIntoView();
    }
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
    document.querySelector(".message").value="";
    let dataSendMessage={
        from: username,
        to: messageTo,
        text: messageToSend,
        type: messageType // ou "private_message" para o bônus
    };
    let promisse=axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',dataSendMessage);
    promisse.catch(reload);
}
function reload(err){
    window.location.reload();
}
function sendScreen(){
    let promise=axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    document.querySelector(".sendScreen").classList.toggle("displayNone");
    promise.then(listHTML);
    sendInfo();
}
function listHTML(user){
    document.querySelector(".userList").innerHTML+=`
        <div  class="spaceBetween">
            <div class="user"> 
            <ion-icon name="person-circle"></ion-icon>
            <h1 onclick="selectUserToSend(this)" id="clickedUser">Todos</h1>
            </div>
            <ion-icon class="displayNone green" id="Todos" name="checkmark"></ion-icon>
        </div>`;
    for(let i=0;i<user.data.length;i++){
        document.querySelector(".userList").innerHTML+=`
        <div  class="spaceBetween">
            <div class="user"> 
            <ion-icon name="person-circle"></ion-icon>
            <h1 onclick="selectUserToSend(this)" id="clickedUser"> ${user.data[i].name}</h1>
            </div>
            <ion-icon class="displayNone green" id="${user.data[i].name}" name="checkmark"></ion-icon>
        </div>`;
    } 
}
function selectUserToSend(element){
    messageTo=element.innerText;
    sendInfo();
}
function private(element){
    messageType="private_message";
    document.getElementById("lock-closed").style.display="block";
    document.getElementById("lock-open").style.display="none";
    sendInfo();
}
function public(){
    document.getElementById("lock-closed").style.display="none";
    document.getElementById("lock-open").style.display="block";
    messageType="message";
    sendInfo();
}
function sendInfo(){
    if(lastMessageTo!=null){
        document.getElementById(lastMessageTo).style.display="none";
    }
    document.getElementById(messageTo).style.display="block";
    document.querySelector(".message").placeholder=`Escreva aqui... Enviando para ${messageTo} uma ${messageType}`;
    lastMessageTo=messageTo;
}


