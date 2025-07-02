import Chat from '../assets/Chat.jpg'
type message = {
  id: string;
  content: string;
  senderId: string;
  adminId: string;
  chatId :   string;
  receiverId:string;
  createdAt: string;
  updatedAt: string;
  sender: {
    id: string;
    name: string;
    image: string | null;
  };
  receiver:{
    id: string;
    name: string;
    image: string | null;
  }
};

type User = {
  id:string;
  name: string;
  email: string;
  password: string;
  image: string | null;
};

type PropsMessages={
    messages:message[];
    selectedChat:string | null;
    user:User;
    messageEndRef:React.RefObject<HTMLDivElement | null>;
}

const Messages = ({messages,selectedChat,user,messageEndRef}:PropsMessages) => {
  return (
    
          <div className='mt-16 h-[80vh] overflow-y-auto pr-2 '> 
             {(!Array.isArray(messages) || messages.length === 0)  && selectedChat  ? (
              <div className="text-center text-gray-400">No messages</div>
              ) :
            ( messages.map((message) => (   
             message.sender.name === user.name ?(
               <div key={message.id} className="mb-2 p-3 bg-purple-800 rounded-lg shadow-sm w-1/2 ml-96 ">
                  <p className="text-base">{message.content}</p>
               </div>
            ):(  
                <div key={message.id} className="flex mb-2    w-1/2">
                  <img src={message.sender.image ? `http://localhost:8080/uploads/${message.sender.image}` : Chat}  className='w-14 h-14 rounded-full' />
                  <p className="text-base bg-gray-200 ml-3 rounded-lg shadow-sm w-3/4 pl-3 pt-3 text-black">{message.content}</p>
                </div>
                
            )
            )))
           }
           <div ref={messageEndRef}></div>

          </div>
  )
}

export default Messages