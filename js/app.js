// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const msg = document.querySelector('.update-msg');
const roomButton = document.querySelector('.chat-room');
// const element = document.querySelector('.chat-window');



//scroll the chat from bottom



//add new chat 

newChatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch((err)=>console.log(err));
});

//update room

roomButton.addEventListener('click',e=> {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));

    }
})

// update username 

newNameForm.addEventListener('submit',e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateUsername(newName);
    newNameForm.reset();
    msg.innerText = ` Username updated to : ${newName}`;
    setTimeout(()=> msg.innerText='',3000);



});
//To delete chat

chatList.addEventListener('click',(e)=>{
    // e.preventDefault();
    // console.log(e.target.tagName);
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('chats').doc(id).delete().then(()=>{
            // console.log('data deketed :')
        }).catch((err)=>console.log(err));
    }
});

//chaeck localstorage for a name 
const username = localStorage.username ? localStorage.username:'Anonymous';

// class instances

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general',username);

// get chats and render 

chatroom.getChats(data => chatUI.render(data));