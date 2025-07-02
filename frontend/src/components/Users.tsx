import React from 'react'

type User = {
  id:string;
  name: string;
  email: string;
  password: string;
  image: string | null;
};

type PropsUsers={
    users:User[];
    createchat:(memberid:string,membername:string | null,memberimage:string | null,isGroup:boolean) => void;
    User:User
}

const Users = ({users,User,createchat}:PropsUsers) => {
  return (
    <div className="max-h-[80vh] overflow-y-auto px-2">
           <ul>         
                {
                 users.filter((user) => user.id !== User.id).map((user) => ( 
                <li key={user.id} className="shadow- flex items-center w-11/12 cursor-pointer p-2 text-black " onClick={()=>createchat(user.id,user.name,user.image,false)}  >
                <img src={`http://localhost:8080/uploads/${user.image}`}  className='w-14 h-14 rounded-full mr-3' />
                {user.name}
                </li>
                ))}
              </ul>
    </div>
  )
}

export default Users