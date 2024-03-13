import supportImg from "../assets/second.jpg"
import InfoCard from "./InfoCard"


export default function Steps(){
    return (
        <div name='support' className='w-full mt-24'>
        <div className='w-full h-[700px] bg-gray-800/90 absolute'>
          <img className='w-full h-full object-cover mix-blend-overlay' src={supportImg} alt="/" />
        </div>
        
        <div className='max-w-[1240px] mx-auto text-white relative'>
            <div className='px-4 py-12'>
                <h2 className='text-3xl pt-8 text-slate-300 uppercase text-center'>Instalation</h2>
                <h3 className='text-5xl font-bold py-6 text-center'>How Our Team Works With Clients</h3>
                <p className='py-4 text-3xl text-slate-200'>By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest. Discipline is the bridge between goals and accomplishment.</p>
            </div>
  
            <div className='grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black'>
                <InfoCard 
                header="Provide Information" 
                details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem."
                number="One"/>

                <InfoCard 
                header="Custom Planning" 
                details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem."
                number="Two"/>

                <InfoCard 
                header="Professional Instalation" 
                details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem."
                number="Three"/>
            </div>
        </div>
    </div>
    )
}