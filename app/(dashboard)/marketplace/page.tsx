import { cookies } from "next/headers"
import Main from "../../components/Marketplace/Main"
import { getDictionary } from "../../dictionaries"


export default async function Home() {
  const lang = cookies().get('locale')?.value
  const dict = await getDictionary(lang as string)

  return <Main dict={dict}/>
}
