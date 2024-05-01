import { cookies } from "next/headers";
import Contact from "../../components/Contact/Contact";
import { getDictionary } from "../../dictionaries"


export default async function page() {
  
  const lang = cookies().get('locale')?.value
  const dict = await getDictionary(lang as string)

  return <Contact dict={dict}/>
}
