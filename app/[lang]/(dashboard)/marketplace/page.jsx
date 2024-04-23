import Main from "@/app/components/Marketplace/Main";
import { getDictionary } from "../../dictionaries"


export default async function Home({ children, params:{lang} }) {
  const dict = await getDictionary(lang) // en
  return <Main dict={dict}/>
}
