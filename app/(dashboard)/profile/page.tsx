import { cookies } from "next/headers";
import Profile from "../../components/Profile/Profile";
import { getDictionary } from "../../dictionaries"
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextPage } from "next";

export const dynamic = 'force-dynamic'


const page: NextPage = withPageAuthRequired(
  async () => {
    const lang = cookies().get('locale')?.value
    const dict = await getDictionary(lang as string)


   return <Profile/>
     
  },
  { returnTo: "/profile" },
);
export default page

