const socket = io()
// for taking the name as prompt
let name;
do{
    name=prompt("type your name here!!")
}while(!name)

// adding the message
let textarea=document.querySelector(".msgInput")
let msgBox=document.querySelector(".msgBox")

const appendMessege=(msg,type)=>{
    let msgDiv=document.createElement('div')
    let classname=type
    msgDiv.classList.add(classname)
    let msgContent=`
    <h3>${msg.user}</h3>
    <p>${msg.message}</p>
    `
    msgDiv.innerHTML=msgContent
    msgBox.appendChild(msgDiv)
}
const sendMessege=(message)=>{
    let msg={
        user:name,
        message:message.trim()
    }
    //append
    appendMessege(msg,"outgoing")
    textarea.value=""
    scrollToBottom()
    //send to server
    socket.emit("message",msg)
}
textarea.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        sendMessege(e.target.value)
    }
})

//recieve msgs
socket.on("message",(msg)=>{
    appendMessege(msg,"incoming")
    scrollToBottom()
})

const scrollToBottom=()=>{
    msgBox.scrollTop=msgBox.scrollHeight
}