import Feature from "./Feature"

export default function Features(){
    return (
        <section name='platforms' className='w-full my-32'>
      <div className='max-w-[1240px] mx-auto px-2'>
        <h2 className='text-5xl font-bold text-center'>Features We Provide</h2>
        <p className='text-2xl py-8 text-gray-500 text-center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis,
          ab. Officia sunt nulla aspernatur culpa, eaque tenetur excepturi
          nostrum tempore.
        </p>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
          <Feature 
            header="Feature 1"
            details="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores maxime deserunt voluptatibus consequatur similique
            voluptates!"/>
          <Feature 
            header="Feature 2"
            details="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores maxime deserunt voluptatibus consequatur similique
            voluptates!"/>
          <Feature 
            header="Feature 3"
            details="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores maxime deserunt voluptatibus consequatur similique
            voluptates!"/>
          <Feature 
            header="Feature 4"
            details="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores maxime deserunt voluptatibus consequatur similique
            voluptates!"/>
          <Feature 
            header="Feature 5"
            details="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores maxime deserunt voluptatibus consequatur similique
            voluptates!"/>
          <Feature 
            header="Feature 6"
            details="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores maxime deserunt voluptatibus consequatur similique
            voluptates!"/>
          <Feature 
            header="Feature 7"
            details="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores maxime deserunt voluptatibus consequatur similique
            voluptates!"/>
          <Feature 
            header="Feature 8"
            details="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores maxime deserunt voluptatibus consequatur similique
            voluptates!"/>

        </div>
      </div>
    </section>
    )
}