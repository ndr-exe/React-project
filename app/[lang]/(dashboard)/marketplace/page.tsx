import Main from "../../../components/Marketplace/Main"
import { getDictionary } from "../../dictionaries"


export default async function Home({params:{lang}} : {params: {lang: string}}) {
  const dict = await getDictionary(lang)
  return <Main dict={dict}/>
}
