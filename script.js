//elementoQueQueroQueApareca.scrollIntoView(); query selector innerhtml= entao scroll
let user;
let username;
let array=[];
function joinChat(){
    username=document.getElementById("usernameInput").value;
    let data={
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
    joinHTML();
    privateHTML();
    joinHTML();
    privateHTML();
    messageAllHTML();
    messageAllHTML();
    loop();
}
function loop(){
    setTimeout(function(){
        axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',data);
        array = axios.get('http://mock-api.driven.com.br/api/v6/uol/messages');
        loop();
        printMessages();
    }, 5000); 
}
function printMessages(){
    for(let i=0;i<array.length;i++){
        console.log(array[0].type);
    }
}
function joinHTML(){
    document.querySelector(".feed").innerHTML+=`
    <div class="messageBox grey">
        <h1><strong>fulano</strong> entrou no chat</h1>
    </div>`
}
function leaveHTML(){
    document.querySelector(".feed").innerHTML+=`
    <div class="messageBox grey">
        <h1><strong>fulano</strong> saiu do chat</h1>
    </div>`
}
function privateHTML(){
    document.querySelector(".feed").innerHTML+=`
    <div class="messageBox pink">
        <h1><strong>klaus</strong> reservadamente para <strong>Carol</strong>: Ola gata, vamos tc?</h1>
    </div>`
}
function messageAllHTML(){
    document.querySelector(".feed").innerHTML+=`
    <div class="messageBox white">
        <h1><strong>fulano</strong> para <strong>todos</strong>: mensagem </h1>
    </div>`
}


