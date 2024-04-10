import Image from "next/image"
import Link from "next/link"

export default function Item({title,description,price,brand,category,thumbnail,id}) {

    // change title style and structure
    let titleSize = 'text-lg'
    if(title.length > 13) titleSize = 'text-sm'

  return (
    <Link href={`/${id}`} className="grid grid-rows-3 grid-cols-4 border-2 border-blue-950 rounded-lg overflow-hidden m-7 hover:bg-black">
        <div className="row-start-1 row-end-4 col-start-1 col-end-3 overflow-hidden"> 
            <Image src={thumbnail} alt="" width={150} height={150} className="h-full w-full"/>
        </div>

        <div className="row-start-1 row-end-3 col-start-3 col-end-5 flex flex-col gap-5">
            <h3 className={`w-[80%] self-center pt-3 ${titleSize} tracking-wide font-bold`}>{title}</h3>
            <ul className="p-4 flex flex-col gap-2 text-sm text-gray-500 ">
                <li>
                    <span className="italic">Brand: </span> <span className="text-white">{brand}</span>
                </li>
                <li>
                    <span className="italic">Category: </span> <span className="text-white">{category}</span>
                </li>
                <li>
                    <span className="italic">Description:</span> <span className="text-white">{description}</span>
                </li>
                
            </ul>
        </div>
        <p className=" h-[70%] row-start-3 row-end-4 col-start-3 self-end col-end-4 flex justify-center items-center bg-blue-950 gap-1">
            <span className="italic text-sm text-gray-500">Price:</span>
            <span className="text-lg"><span className="text-sm">$</span>{price}</span>
        </p>
        <button className="h-[70%] row-start-3 row-end-4 col-start-4 col-end-5 self-end bg-green-800 hover:bg-green-600 text-sm">Add to Cart</button>
</Link>
  )
}

