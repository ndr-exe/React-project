import { cookies } from "next/headers";
// import Profile from "../../components/Profile/Profile";
import { getDictionary } from "../../dictionaries"


export default async function page() {

  const lang = cookies().get('locale')?.value
  const dict = await getDictionary(lang as string)

  return (
    // <Profile dict={dict}/>
    <></>
  )
}
