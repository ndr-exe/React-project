export default function CategoryButton({children,handleFilter,filter,activeFilter}) {
  const active = activeFilter === filter
  const activeClass = activeFilter === filter ? "bg-blue-900" : "bg-slate-800"

return (
  <button 
      onClick={(e)=> {
          !active  ?  handleFilter(filter) : handleFilter(filter,'remove')

      }}
      className={"px-4 py-3 rounded-2xl hover:bg-blue-900 flex items-center gap-2 " + activeClass} >
      {children}
  </button>
)
}
