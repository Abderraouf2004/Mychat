import Chat from '../assets/Chat.jpg'

type Chat = {
  id: string;
  name: string;
  isGroup: boolean;
  image: string | null;
  adminId: string;
  members:Member[];
  createdAt: string;
};
type User = {
  id:string;
  name: string;
  email: string;
  password: string;
  image: string | null;
};

type Member = {
  userId: string;
  user: User;
};

interface ChatsProps {
  chats: Chat[];
  user: User;
  getmessages: (chatId: string, name: string | null, image: string | null) => void;
  typechats:String;
}

const Chats = ({ chats, user, getmessages,typechats }:ChatsProps) => {
     const Chats = chats.filter((chat) =>
        typechats === 'group' ? chat.isGroup : !chat.isGroup
     );
     console.log("chats:",Chats)
  return (
    <div className="max-h-[80vh] overflow-y-auto px-2">

          <ul>
              {
              Chats.map((chat) =>{
              // const receiver = chat.members.find(m => m.userId !== user.id)?.user;
              return (      
              <li key={chat.id} className="shadow- flex items-center w-11/12 cursor-pointer p-2 text-black " onClick={() => getmessages(chat.id,chat.name,chat.image)} >
              <img src={ `http://localhost:8080/uploads/${chat.image}` }  className='w-14 h-14 rounded-full mr-3' />
              {chat?.name }
              </li>
              )
              })}
            </ul>

    </div>
  )
}

export default Chats