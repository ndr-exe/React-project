import Navbar from './Navbar'

export default function Header({dict}: {dict: DictType}) {
  return (
    <header className='h-full row-span-1'>
      <Navbar dict={dict}/>
    </header>
  )
}
