type PropsType = {
  children: React.ReactNode,
  handleFilter: Function,
  filter: string,
  activeFilter: string
}

export default function CategoryButton({children,handleFilter,filter,activeFilter}: PropsType) {
  const active = activeFilter === filter
  const activeClass = activeFilter === filter ? "text-orange-500" : "text-black dark:text-gray-100"

return (
  <button 
      onClick={()=> {
          !active  ?  handleFilter(filter) : handleFilter(filter,'remove')

      }}
      className={"px-4 py-3 rounded-2xl font-bold flex items-center gap-2 " + activeClass} >
      {children}
  </button>
)
}
