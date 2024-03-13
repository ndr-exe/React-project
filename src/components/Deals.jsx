import DealCard from "./DealCard";

export default function Deals(){
    return(
        <section className='w-full text-white my-24'>
      <div className='w-full h-[800px] bg-sky-700 absolute mix-blend-overlay'></div>

      <div className='max-w-[1240px] mx-auto py-12'>

        <div className='text-center py-8 text-slate-300'>
          <h2 className='text-3xl uppercase'>Available Kits</h2>
          <h3 className='text-5xl font-bold text-white py-8'>The right price for your Power Consumpiton</h3>
          <p className='text-3xl'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            laudantium odio ullam inventore aliquid ipsum quasi tenetur velit
            voluptatum iste.
          </p>
        </div>

        <div className='grid md:grid-cols-2'>
          <DealCard 
          type="Standard" 
          size="120 KW" 
          details="Lorem ipsum dolor, sit amet consectetur adipisicing."
          features={["Lorem, ipsum dolor.","Lorem, ipsum dolor.","Lorem, ipsum dolor.","Lorem, ipsum dolor.","Lorem, ipsum dolor."]} 
          />
          <DealCard 
          type="Premium" 
          size="200 KW" 
          details="Lorem ipsum dolor, sit amet consectetur adipisicing."
          features={["Lorem, ipsum dolor.","Lorem, ipsum dolor.","Lorem, ipsum dolor.","Lorem, ipsum dolor.","Lorem, ipsum dolor."]} 
          />

        </div>
      </div>
    </section>
    )
}