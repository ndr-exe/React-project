import Navbar from './Navbar'

export default function Header({dict}) {
  return (
    <header className='h-full row-span-1'>
      <Navbar dict={dict}/>
    </header>
  )
}
