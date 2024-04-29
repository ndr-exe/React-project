import Contact from "../../../components/Contact/Contact";
import { getDictionary } from "../../dictionaries"


export default async function page({params:{lang}}: {params:{lang: string}}) {
  const dict = await getDictionary(lang)

  return <Contact dict={dict}/>
}
