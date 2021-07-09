//render chat templets to the DOM
// clear the list of chats (when the room changes)

class ChatUI{
    constructor (list){
        this.list=list;

    }
    clear(){
        this.list.innerHTML = ' ';
    }
    render(data){
        // console.log(typeof data);

            if(typeof data =="object"){
                const when = dateFns.distanceInWordsToNow(
                    data.data().created_at.toDate(),
                    {addSuffix:true}
                    );
                    const html = `
                    <li data-id='${data.id}'class='list-group-item'>
                    <span class='username'>${data.data().username}:</span>
                    <span clss='message'>${data.data().message}</span>
                    <div class='time'>${when}</div>
                    <button class='btn btn-danger'>Delete</button>
                    </li>
                    `;
                    this.list.innerHTML += html;
                }
                
                //delete chat 
                   else {
                       const del =document.querySelectorAll('li');
                       del.forEach(element => {
                        //    console.log(element.getAttribute('data-id'));
                        //    console.log(data);
                           if(element.getAttribute('data-id')==data){
                            // console.log('helloooooo')
                                element.remove();
                            }
                        });
                    }
                    
                //   else  if(data == "string"){
                        // console.log('delete');
            
                        // const deleteChat =(id) =>{
                        //     const chats = document.querySelectorAll('li');
                        //     chats.forEach(chat =>{
                        //         if (chat.getAttribute('data-id')===id){
                        //             chat.remove();
                        //         }
                                
                        //     })
                        // }
                    }

            
            
    }
