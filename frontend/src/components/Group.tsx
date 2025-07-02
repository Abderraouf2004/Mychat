import  { useState } from 'react'

type User = {
  id:string;
  name: string;
   image: string | null;
};



type GroupProps = {
  isOpen: boolean;
  onClose: () => void;
  createchat:(membersid:string | string[],membername:string | null,memberimage:string | null,isGroup:boolean)=>void;
  users:User[];
};



const Group = ({ isOpen, onClose,users,createchat}: GroupProps) => {
    const [groupName, setGroupName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
      const selecteMember = (id: string) => {
      setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Group</h2>
          <button className="text-gray-500 hover:text-red-500" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mb-4 text-black">
          <label className="block text-sm font-medium text-gray-700">Group Name</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        {/* Members */}
        <div className="mb-4  text-black">
          <label className="block text-sm font-medium text-gray-700">Select Members</label>
          <div className="max-h-40 overflow-y-auto mt-1 border rounded-md p-2">
            {users.map((user) => (
              <label key={user.id} className="flex items-center space-x-2 text-sm mb-1 ">
                <input
                  type="checkbox"
                  value={user.id}
                  checked={selectedMembers.includes(user.id)}
                  onChange={() => selecteMember(user.id)}
                />
                 <img src={`http://localhost:8080/uploads/${user.image}`}  className='w-14 h-14 rounded-full mr-3' />
                {user.name}
              </label>
            ))}
          </div>
        </div>


        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
          <button onClick={()=>createchat(selectedMembers,groupName,null,true)} className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
        </div>
      </div>
    </div>
  )
}

export default Group