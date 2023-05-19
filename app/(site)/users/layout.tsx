import { ReactNode } from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "@/app/actions/getUsers";
import UserList from "@/app/components/users/UserList";
import getCurrentUser from "@/app/actions/getCurrentUser";

const UsersLayout = async ({ children }: { children: ReactNode }) => {

  const [
    users,
    currentUser
  ] = await Promise.all([getUsers(), getCurrentUser()]);

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} currentUser={currentUser!} />
        { children }
      </div>
    </Sidebar>
  );
}
export default UsersLayout;