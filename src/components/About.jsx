export default function About(){
    return (
        <section className='w-full my-32'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='text-center'>
                <h2 className='text-5xl font-bold'>Transform Your Rooftop & Garden Into Power Plant</h2>
                <p className='text-3xl py-6 text-gray-500'>Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.</p>
            </div>

            <div className='grid md:grid-cols-3 gap-1 px-2 text-center'>
                <div className='border py-8 rounded-xl shadow-xl' >
                    <p className='text-6xl font-bold text-orange-600'>250+</p>
                    <p className='text-gray-400 mt-2'>Projects</p>
                </div>
                <div  className='border py-8 rounded-xl shadow-xl' >
                    <p className='text-6xl font-bold text-orange-600'>5</p>
                    <p className='text-gray-400 mt-2'>Cities</p>
                </div>
                <div className='border py-8 rounded-xl shadow-xl' >
                    <p className='text-6xl font-bold text-orange-600'>36+</p>
                    <p className='text-gray-400 mt-2'>Megawatts per month</p>
                </div>
            </div>
        </div>
    </section>
    )
}