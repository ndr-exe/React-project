export default function CategoryButton({children,handleClick,filter,active}) {

    const activeClass = active ? "bg-blue-900" : ""

  return (
    <button 
        onClick={(e)=> {
            !active  ?  handleClick(e,filter) : handleClick(e,filter,'remove')

        }}
        className={"px-4 py-3 bg-slate-800 rounded-2xl hover:bg-blue-900 flex items-center gap-2 " + activeClass} >
        {children}
    </button>
  )
}
