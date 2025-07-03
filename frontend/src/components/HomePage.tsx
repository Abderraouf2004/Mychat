import { useEffect, useRef, useState } from 'react';
import Chat from '../assets/Chat.jpg'
import { io, Socket } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import Chats from './Chats';
import Users from './Users';
import Messages from './Messages';
import Group from './Group';


const HomePage = () => {
  const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
};
axios.defaults.withCredentials = true;



  const rawUser = getCookie('user');
  const User = rawUser ? JSON.parse(rawUser) : null;
  const [user] = useState(User);
//  const [user, setUser] = useState<User | null>(User);
if (!user) {
  return (
    <div className="flex items-center justify-center h-screen text-black text-xl">
      Please log in to access the chat.
    </div>
  );
}

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



type Chat = {
  id: string;
  name: string;
  isGroup: boolean;
  image: string | null;
  adminId: string;
  members:Member[];
  createdAt: string;
};


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


  const [chats, setchats] = useState<Chat[]>([]);
  const [messages, setmessages] = useState<message[]>([]);
  const [selectedChat, setselectedChat] = useState<string | null>(null);
  const [ChatId, setChatId] = useState<string>('');
  const [image, setimage] = useState<string | null>(null);
  const [users, setusers] = useState<User[]>([]);
  const [content, setcontent] = useState<string>('');
  const [receiverId, setreceiverId] = useState<string | null>(null);
  const [socket, setsocket] = useState<Socket | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [typechats,settypechats]=useState<string>('private');
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(messages)
  

useEffect(()=>{
      setsocket(io("https://mychat-1-4ru5.onrender.com", {
        withCredentials: true,
        transports: ['websocket'], 
    }));
   
},[])

useEffect(()=>{
  socket?.emit('adduser',user?.id)
  socket?.on("getusers", (Users) => {
    console.log("Utilisateurs connectés :", Users);
  });
  socket?.on('getmessage',(data)=>{
    console.log(data);
   setmessages(prev => [...prev, data]);

  })
},[socket])

// // get chats

    const getchats= async()=>{
     await axios.get(`https://mychat-1-4ru5.onrender.com/api/chat/${user.id}`)
    .then((response) => {
    console.log(response.data);
    setchats(response.data)
  })
  .catch((error) => {
    console.error('Erreur lors de la requête GET', error);
  });
    }
    getchats();




// get users

 const getusers= async()=>{
     await axios.get('https://mychat-1-4ru5.onrender.com/api/users')
    .then((response) => {
    console.log(response.data);
    setusers(response.data)
  })
  .catch((error) => {
    console.error('Erreur lors de la requête GET', error);
  });
    }
    getusers();



//   const [loadingChats, setLoadingChats] = useState(true);
//   const [loadingUsers, setLoadingUsers] = useState(true);
// useEffect(() => {
//     if (!user) return;
    
//     // Fetch chats
//     const fetchChats = async () => {
//       try {
//         const response = await axios.get(`https://mychat-1-4ru5.onrender.com/api/chat/${user.id}`);
//         setchats(response.data);
//       } catch (error) {
//         console.error('Error fetching chats', error);
//       } finally {
//         setLoadingChats(false);
//       }
//     };

//     // Fetch users
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('https://mychat-1-4ru5.onrender.com/api/users');
//         setusers(response.data);
//       } catch (error) {
//         console.error('Error fetching users', error);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };

//     fetchChats();
//     fetchUsers();
//   }, [user]);

useEffect(() => {
  messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

useEffect(() => {
  axios.defaults.withCredentials = true;

  const interval = setInterval(async () => {
    try {
      await axios.post('https://mychat-1-4ru5.onrender.com/api/auth/refresh-token', {}, { withCredentials: true });
      console.log("Token refreshed automatically");
    } catch (err) {
      console.error("Failed to refresh token", err);
    }
  }, 15 * 60 * 1000);

  return () => clearInterval(interval); 
}, []);








  
  const getmessages = async(chatId: string,chatName:string | null,chatImage:string | null)=>{
     setselectedChat(chatName);
     setChatId(chatId)
     setimage(chatImage);
      const currentChat = chats.find((c) => c.id === chatId);
  // const receiver = currentChat?.members.find((m) => m.userId !== user.id)?.user;
  const receiver = currentChat?.members.find((m) => m.userId !== user?.id)?.user;

  if (receiver?.id) {
    setreceiverId(receiver.id);
  }else {
    console.warn("Receiver not found for chat:", chatId);
  }

     await axios.get(`https://mychat-1-4ru5.onrender.com/api/message/${chatId}`)
    .then((response) => {
    setmessages(response.data);
  })
  .catch((error) => {
    console.error('Erreur lors de la requête GET', error);
  });
    }


  const createchat=async(memberid:string | string[],name:string | null,memberimage:string | null,isGroup:boolean)=>{
       try {
 

          const Chatexist = isGroup ? chats.find(
               (chat) => chat.isGroup && chat.members.some((m) => m.userId === user.id) &&
               (Array.isArray(memberid)
                 ? memberid.every((id) => chat.members.some((m) => m.userId === id))
                 : user && chat.members.some((m) => m.userId === user.id))
            )
            : chats.find(
             (chat) =>
             !chat.isGroup &&
              chat.members.some((m) => m.userId === user.id) &&
              chat.members.some((m) => m.userId === memberid)
            );

          if (Chatexist) {
           getmessages(Chatexist.id, name, memberimage);
           return;
          }

const membersList = Array.from(new Set(
  Array.isArray(memberid) ? [user.id, ...memberid] : [user.id, memberid]
));


           const res =    await axios.post('https://mychat-1-4ru5.onrender.com/api/chat/create',
           {
            name:name,
            isGroup:isGroup,
            adminId:user.id,
            members:membersList,
            messages:[],
            image:memberimage
           });
          
      setchats(prev => [...prev, res.data]);
       } catch (error) {
        console.error("Erreur lors de la création du chat", error);
       }
  }


   const createmessage=async(ChatId:string,sender:string,Content:string,receiver:string | null)=>{
    if (!receiver) {
    console.error("ReceiverId is undefined! Message not sent.");
    return;
  }

    try {
         socket?.emit('sendmessage',
          {
             chatId:ChatId,
             senderId:sender,
             content:Content,
             receiverId:receiver
          }
         )
      setcontent('')
    } catch (error) {
      console.error('Erreur en envoyant le message', error);
    } 
   }


   const affichetypechats=(typechat:string)=>{
        settypechats(typechat)
   }
  
 console.log("User dans HomePage:", user);

  return (
    <div  className="container mx-auto flex h-full  bg-white text-white ">
      <div className= 'fixed  flex bg-gradient-to-r from-gray-50 via-gray-200 to-gray-300 w-1/5 h-full' >    
        <div className=' w-2/3'>
          <div className='h-1/5  flex  items-center p-3'>
          <img src={user?.image ? `https://mychat-1-4ru5.onrender.com/uploads/${user.image}` : Chat}  className='w-14 h-14 rounded-full' />
               <h1 className='text-2xl text-black ml-1'>{user.name}</h1>       
          </div>
          <div className="ml-5 mt-4 mb-4 text-xl font-bold text-black">
              <ul className="hidden md:flex space-x-6 font-medium">
               <li className="hover:text-gray-600  cursor-pointer" onClick={()=>affichetypechats('private')}>Chats</li>
               <li className="hover:text-gray-600  cursor-pointer"  onClick={()=>affichetypechats('group')}>Groupes</li>
              </ul>
          </div>
          {typechats === 'group' &&    
                 <div>
      <button onClick={() => setIsModalOpen(true)} className='font-semibold ml-2  py-1 rounded hover:shadow-2xl transition bg-black'>
        Create a new Group 
      </button>
      <Group isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}  users={users} createchat={createchat}/>
    </div>

          }
          <Chats chats={chats} user={user} getmessages={getmessages} typechats={typechats}/>         
        </div>
      </div>
       {/* chat selected*/}
      <div className="container   ml-72 w-2/3 ">
        {selectedChat &&  <div className='fixed w-1/4  h-1/12 bg-white flex  items-center '>
          <img src={image ? `https://mychat-1-4ru5.onrender.com/uploads/${image}` : Chat}  className='w-14 h-14 rounded-full' />
          <strong className='text-black ml-3'>{selectedChat}</strong>
        </div>}
          {/* messages */}
          <Messages messages={messages} selectedChat={selectedChat} user={user} messageEndRef={messageEndRef}/>
       {selectedChat &&   
        <form  onSubmit={(e) => e.preventDefault()} className='fixed w-2/3  text-black flex justify-center items-center space-x-4 '>
          <input value={content} onChange={(e)=>{setcontent(e.target.value)}} type="text" className=' bg-white w-2/3 h-10 rounded-full outline-1 pl-5 ' placeholder='Type a message..' />
          <button className=' bg-white rounded-2xl  h-10 w-10 outline-1'> <FontAwesomeIcon  icon={faPaperPlane} onClick={() => {
            if (content.trim() !== '') {
             createmessage(ChatId, user.id, content, receiverId);
            }}} />
          </button>
        </form>}
      </div>
      {/* users */}
      <div className='w-2/12 bg-gradient-to-r from-gray-50 via-gray-200 to-gray-300'>
           <div className="ml-5 mt-4 mb-4 text-xl font-bold text-black">
           <span>Users</span>
           </div>
              {/*list of users */}
              {/* <Users users={users} createchat={createchat} User={User}/> */}
              <Users users={users} createchat={createchat} User={user}/>
   
      </div>
    
    </div>

  );
};

export default HomePage;
