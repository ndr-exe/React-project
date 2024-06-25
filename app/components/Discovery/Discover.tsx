import Link from 'next/link';
import Image from 'next/image';
import first from '../../../public/img/pexels-goumbik-669283.jpg';
import second from '../../../public/img/pexels-karolina-grabowska-5202434.jpg';
import third from '../../../public/img/pexels-tima-miroshnichenko-6204669.jpg';

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted max-w-screen-xl 2xl:mx-auto">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Featured Products
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Discover Our Top Firearms
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our selection of high-quality firearms for all your shooting needs.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              src={first}
              alt="Handgun"
              width={400}
              height={300}
              className="object-cover w-full h-64"
            />
            <div className="p-4 bg-background">
              <h3 className="text-xl font-bold">Glock 19 Gen 5</h3>
              <p className="text-sm text-muted-foreground">Reliable and accurate 9mm handgun.</p>
            </div>
          </div>
          <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              src={third}
              alt="Rifle"
              width={400}
              height={300}
              className="object-cover w-full h-64"
            />
            <div className="p-4 bg-background">
              <h3 className="text-xl font-bold">AR-15 Rifle</h3>
              <p className="text-sm text-muted-foreground">
                Versatile and customizable modern sporting rifle.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              src={second}
              alt="Shotgun"
              width={400}
              height={300}
              className="object-cover w-full h-64"
            />
            <div className="p-4 bg-background">
              <h3 className="text-xl font-bold">Remington 870 Shotgun</h3>
              <p className="text-sm text-muted-foreground">
                Reliable and versatile pump-action shotgun.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[900px] text-center text-muted-foreground mt-6">
          <p>
            Explore our curated selection of top-quality firearms, each designed to meet the needs
            of discerning shooters. Whether youre in the market for a reliable handgun, a versatile
            rifle, or a dependable shotgun, our featured products offer unparalleled performance and
            craftsmanship.
          </p>
        </div>
      </div>
    </section>
  );
}
