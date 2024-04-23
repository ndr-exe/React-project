import Contact from "../../../components/Contact/Contact";
import { getDictionary } from "../../dictionaries"



export default async function page({ children, params:{lang} }) {
  const dict = await getDictionary(lang)

  return <Contact dict={dict}/>
}
