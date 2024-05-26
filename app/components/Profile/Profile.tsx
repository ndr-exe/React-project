import { Session, getSession } from "@auth0/nextjs-auth0";

import UserInfoCard from './UserInfoCard'
import { getCustomerAvatar } from "../../../api";
export const dynamic = 'force-dynamic'


export default async function Profile({dict}: {dict: DictType}) {
    const session: any = await getSession()
    const data = session && session.user ? await getCustomerAvatar(session.user.sub) : 'placeholder-url'
    
    
    return <UserInfoCard dict={dict} userData={session.user} initialAvatar={data[0].avatar} />
    
   
}
