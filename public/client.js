const socket = io()

// Get DOM elements in respective Js variables                          
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Audio that will play on receiving messages
var audio1 = new Audio('ting.mp3');
var audio2 = new Audio('web_whatsapp.mp3');

// Function which will append event info to the contaner
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop=messageContainer.scrollHeight;
    if(position == 'right'||'left'){ 
        audio2.play();
    }
}

 let name;
// Ask new user for his/her name and let the server know
/*do {
    name = prompt('Please enter your name: ')
} while(!name)
*/

do{
    audio1.play();
 name = prompt("Enter your name to join");
 
}while(!name)  ;
socket.emit('new-user-joined', name);

// If a new user joins, receive his/her name from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
    audio1.play();
    
})

// If server sends a message, receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

// If a user leaves the chat, append the info to the container
socket.on('left', name =>{
    append(`${name}left the chat`, 'right');
    audio1.play();
    
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})



//chatMessages.scrollTop=chatMessages.scrollHeight;