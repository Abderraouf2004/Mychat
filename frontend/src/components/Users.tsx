import Chat from '../assets/Chat.jpg'

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
};

type PropsUsers = {
  users: User[];
  createchat: (memberid: string, membername: string | null, memberimage: string, isGroup: boolean) => void;
  User: User | null;
};

const Users = ({ users, User, createchat }: PropsUsers) => {
  return (
    <div className="max-h-[80vh] overflow-y-auto px-2">
      <ul>
        {User &&
        users
       .filter((user) => user.id !== User.id)
          .map((user) => {
            const imageUrl = user.image
              ? `https://mychat-1-4ru5.onrender.com/uploads/${user.image}`
              : Chat;

            return (
              <li
                key={user.id}
                className="shadow-md flex items-center w-11/12 cursor-pointer p-2 text-black rounded hover:bg-gray-100"
                onClick={() =>
                  createchat(user.id, user.name, user.image ?? '', false)
                }
              >
                <img
                  src={imageUrl}
                  className="w-14 h-14 rounded-full mr-3 object-cover"
                  alt={user.name}
                />
                {user.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Users;
