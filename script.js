//elementoQueQueroQueApareca.scrollIntoView(); query selector innerhtml= entao scroll
let user;

function login(){
    document.querySelector(".feed").innerHTML=`
    <div class="loginScreen">
        <img src="media/logo 1.png" alt="">
        <input placeholder="Digite seu nome" type="text">
        <button type="button">Entrar</button>
    </div>`

}
function join(){
    document.querySelector(".feed").innerHTML+=`
    <div class="messageBox grey">
        <h1><strong>fulano</strong> entrou no chat</h1>
    </div>`
}
function leave(){
    document.querySelector(".feed").innerHTML+=`
    <div class="messageBox grey">
        <h1><strong>fulano</strong> saiu do chat</h1>
    </div>`
}
function private(){
    document.querySelector(".feed").innerHTML+=`
    <div class="messageBox pink">
        <h1><strong>klaus</strong> reservadamente para <strong>ciclano</strong>: mensagem </h1>
    </div>`
}
function messageAll(){
    document.querySelector(".feed").innerHTML+=`
    <div class="messageBox white">
        <h1><strong>fulano</strong> para <strong>todos</strong>: mensagem </h1>
    </div>`
}

login();
// private();
// messageAll();
// leave();
// join();
// join();
// private();
// messageAll();
