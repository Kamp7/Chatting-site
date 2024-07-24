
const socket = io('http://localhost:8000');

 const form=document.getElementById('send-container');
 const messageInp=document.getElementById('messageInp');
 const messagebox=document.querySelector('.messagebox');
 const submit=document.querySelector('.btn');
 var audio=new Audio('interface-124464.mp3');

  
 const appendmsg=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
      messagebox.append(messageElement);
    
    if(position=='left')
    {
      audio.play();
    }
 };


const name=prompt("Enter your name to join the chat");
 socket.emit('new-user-joined',name);

 socket.on('user-joined',name=>{
    appendmsg(`${name} joined the chat, Say Hello to him`,'left');
  });

 submit.addEventListener('click',(e)=>{
  e.preventDefault();//prevents reload of page
  const message=messageInp.value;
  if(message!='')
  {
    appendmsg(`You: ${message}`,'right');
  }
  socket.emit('send',message);
  messageInp.value='';
});
document.addEventListener('keydown',(e)=>{
  if(event.key=='Enter')
  {
    e.preventDefault();//prevents reload of page
  const message=messageInp.value;
  if(message!='')
  {
    appendmsg(`You: ${message}`,'right');
  }
  socket.emit('send',message);
  messageInp.value='';
  }
});
socket.on('receive',data=>{
  if(data.message!='')
  {
    appendmsg(`${data.name}: ${data.message}`,'left');
  }
  
});
socket.on('leave',name=>{
  appendmsg(`${name} has left the chat`,'left');
  
});
