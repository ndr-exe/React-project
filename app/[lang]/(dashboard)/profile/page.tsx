import Profile from "../../../components/Profile/Profile";
import { getDictionary } from "../../dictionaries"


export default async function page({params:{lang}}: {params:{lang: string}}) {
  const dict = await getDictionary(lang)

  return (
    <Profile dict={dict}/>
  )
}
