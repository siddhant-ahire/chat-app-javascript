// adding new chat document
class Chatroom {
    constructor(room,username){
        this.room=room;
        this.username=username;
        this.chats=db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        //format a chat Object
        const now =new Date();
        const chat = {
            message:message,
            username:this.username,
            room:this.room,
            created_at:firebase.firestore.Timestamp.fromDate(now)
        }
        const response = await this.chats.add(chat);
        return response;
    }
    
    
    getChats(callback){
        this.unsub=this.chats
        .where('room','==',this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type==='added'){
                    
                //Update the UI
                    callback(change.doc);
                }
                //to delete chat and Update UI
                else if(change.type==='removed'){
                        callback(change.doc.id);
                    }
                });
            })
    }
    updateUsername(username){
        this.username=username;
        localStorage.setItem('username',username);
    }
    updateRoom(room){
        this.room=room;
        console.log("room updated");
        if(this.unsub){
            this.unsub();
        }

    }
}

// const chatroom = new Chatroom('general','sasuke');
// // chatroom.addChat('susano')
// // .then(()=>console.log('chat added'))
// // .catch((err)=>console.log(err))

// chatroom.getChats((data)=>{
//     console.log(data);
// })

// setTimeout(()=>{
//     chatroom.updateRoom('gaming');
//     chatroom.getChats((data)=>{console.log(data)});
//     chatroom.updateUsername('hinata');
//     chatroom.addChat('play date');
// },3000);
