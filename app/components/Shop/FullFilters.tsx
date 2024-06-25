import { GiPistolGun } from 'react-icons/gi';
import { SlTarget } from 'react-icons/sl';
import { GiBulletBill } from 'react-icons/gi';
import { GiMachineGunMagazine } from 'react-icons/gi';
import { FaPersonRifle } from 'react-icons/fa6';
import { GiWinchesterRifle } from 'react-icons/gi';
import { LuPocketKnife } from 'react-icons/lu';

export default function FullFilters({
  activeFilter,
  applyFilter,
}: {
  activeFilter: number;
  applyFilter: (number) => void;
}) {
  return (
    <div className=" h-full w-[250px] 2xl:w-[300px] px-5 rounded-md relative mt-5 ">
      <div className="w-full h-[350px] py-7  shadow-lg rounded-xl sticky top-32 flex flex-col items-center gap-1.5 ">
        <p className="text-xl text-neutral-500">Filter Categories</p>
        <ul>
          <li className=" ">
            <button
              className={`flex gap-1.5 items-center  hover:text-orange-500 text-xl transition-colors ${
                activeFilter === 0 && 'text-orange-500'
              }`}
              onClick={() => applyFilter(0)}
            >
              <span className="text-2xl">
                <GiPistolGun />
              </span>
              Handguns
            </button>
          </li>
          <li className=" ">
            <button
              className={`flex gap-1.5 items-center hover:text-orange-500 text-xl transition-colors ${
                activeFilter === 1 && 'text-orange-500'
              }`}
              onClick={() => applyFilter(1)}
            >
              <span className="text-2xl">
                <GiWinchesterRifle />
              </span>
              Shotgun
            </button>
          </li>
          <li className=" ">
            <button
              className={`flex gap-1.5 items-center hover:text-orange-500 text-xl transition-colors ${
                activeFilter === 2 && 'text-orange-500'
              }`}
              onClick={() => applyFilter(2)}
            >
              <span className="text-2xl">
                <FaPersonRifle />
              </span>
              Rifles
            </button>
          </li>
          <li className=" ">
            <button
              className={`flex gap-1.5 items-center hover:text-orange-500 text-xl transition-colors ${
                activeFilter === 3 && 'text-orange-500'
              }`}
              onClick={() => applyFilter(3)}
            >
              <span className="text-2xl">
                <SlTarget />
              </span>
              Sniper Rifles
            </button>
          </li>
          <li className=" ">
            <button
              className={`flex gap-1.5 items-center hover:text-orange-500 text-xl transition-colors ${
                activeFilter === 4 && 'text-orange-500'
              }`}
              onClick={() => applyFilter(4)}
            >
              <span className="text-2xl">
                <GiBulletBill />
              </span>
              Ammo
            </button>
          </li>
          <li className=" ">
            <button
              className={`flex gap-1.5 items-center hover:text-orange-500 text-xl transition-colors ${
                activeFilter === 5 && 'text-orange-500'
              }`}
              onClick={() => applyFilter(5)}
            >
              <span className="text-2xl">
                <LuPocketKnife />
              </span>
              Accessories
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
