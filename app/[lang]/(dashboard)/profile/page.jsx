import Profile from "../../../components/Profile/Profile";
import { getDictionary } from "../../dictionaries"


export default async function page({ children, params:{lang} }) {
  const dict = await getDictionary(lang)

  return (
    <Profile dict={dict}/>
  )
}
