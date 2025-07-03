import Chat from '../assets/Chat.jpg';

type Chat = {
  id: string;
  name: string;
  isGroup: boolean;
  image: string | null;
  adminId: string;
  members: Member[];
  createdAt: string;
};

type User = {
  id: string;
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
  getmessages: (chatId: string, name: string | null, image: string) => void;
  typechats: string;
}

const Chats = ({ chats, user, getmessages, typechats }: ChatsProps) => {
  const filteredChats = chats.filter((chat) =>
    typechats === 'group' ? chat.isGroup : !chat.isGroup
  );

  return (
    <div className="max-h-[80vh] overflow-y-auto px-2">
      <ul>
        {filteredChats.map((chat) => {
          const imageUrl = chat.image
            ? `https://mychat-1-4ru5.onrender.com/uploads/${chat.image}`
            : Chat;

          return (
            <li
              key={chat.id}
              className="shadow-md flex items-center w-11/12 cursor-pointer p-2 text-black rounded hover:bg-gray-100"
              onClick={() =>
                getmessages(chat.id, chat.name, chat.image ?? '')
              }
            >
              <img
                src={imageUrl}
                className="w-14 h-14 rounded-full mr-3 object-cover"
                alt={chat.name}
              />
              {chat.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Chats;
