import { cookies } from 'next/headers'
import LangBtn from './LangBtn'

export default function LangBtnWrapper() {
  const locale = cookies().get('locale')
  const lang = locale?.value

  return (
    <LangBtn lang={lang as string}/>
  )
}
