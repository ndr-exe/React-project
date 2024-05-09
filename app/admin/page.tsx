import { getUsers, User } from "../../api";
import AddUserBtn from "../components/Users/AddUserBtn";
import DeleteUser from "../components/Users/DeleteUser";
import UpdateUserBtn from "../components/Users/UpdateUserBtn"
export const dynamic = 'force-dynamic'


export default async function page() {
    const users = await getUsers()
    users.sort((a: User,b: User)=> a.id-b.id)
    // let users: User[]
  return (
    <div className="w-full h-full">
            <h2 className="text-center pt-4 text-lg font-semibold">Users</h2>
            <div className="min-h-min max-h-[70%] w-[75%] mx-auto mt-10 overflow-y-scroll">
            <table className="border-spacing-6 w-full">
            <tbody className="pt-3">
                <tr className="border-b border-b-gray-600/80"> 
                    <th className="font-semibold text-gray-600 text-left py-2 w-[75px]">ID</th>
                    <th className="font-semibold text-gray-600 text-left py-2 ">User</th>
                    <th className="font-semibold text-gray-600 text-left py-2 ">Email</th>
                    <th className="font-semibold text-gray-600 text-center py-2 ">Age</th>
                    <th></th>
                    <th></th>
                </tr>

                {/* <tr className="border-b border-gray-500/40 pt-3 hover:bg-gray-700/15">
                    <td className="py-2 pl-1">1</td>
                    <td className="py-1">dakdiakd</td>
                    <td className="py-2">opophelia@denmark.dkhenia</td>
                    <td className="py-2 text-center">12</td>
                    <td className="py-2"><button><GrEdit/></button></td>
                    <td className="py-2"><button className="text-xl"><RiDeleteBin5Line /></button></td>
                </tr> */}
                {users.map((user: User)=> {
                    return (
                    <tr className="border-b border-gray-500/40 pt-3 hover:bg-gray-700/15" key={user.id}>
                    <td className="py-2 pl-1">{user.id}</td>
                    <td className="py-1">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2 text-center">{user.age}</td>
                    <td className="py-2"><UpdateUserBtn user={user}/></td>
                    <td className="py-2"><DeleteUser id={user.id}/></td>
                </tr>
                )
                })}
                
                </tbody>
            </table>
            </div>
            <AddUserBtn/>
            

    </div>
  )
}
