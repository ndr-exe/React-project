'use client';
import { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

export default function MobileFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [closeFilters, setCLoseFilters] = useState(false);

  return (
    <div className="">
      <div className="w-4/5 mx-auto items-center  text-md">
        <button
          onClick={showFilters ? () => setCLoseFilters(p => !p) : () => setShowFilters(p => !p)}
          className="w-full h-full flex justify-center items-center "
        >
          <span>FILTER ITEMS</span>
          <span className="text-xl">
            <IoIosArrowUp />
          </span>
        </button>
      </div>
      {showFilters && (
        <div className={`overflow-hidden`}>
          <div
            onAnimationEnd={() => closeFilters && (setShowFilters(false), setCLoseFilters(false))}
            className={`bg-green-300 py-4 px-4 applyFilterAnimation ${
              closeFilters && 'applyFilterAnimationClose'
            }`}
          >
            <ul>
              <div>
                <span>Categories</span>
                <div>
                  <li>GLOCK</li>
                  <li>AWP</li>
                  <li>M4A4</li>
                </div>
              </div>

              <div>
                <span>Price Ranges</span>
                <div className="flex ">
                  <li>
                    <button className="py-2 px-3 shadow-lg rounded-xl"> &#60; $100</button>
                  </li>
                  <li>
                    <button className="py-2 px-3 shadow-lg rounded-xl">$100 - $500</button>
                  </li>
                  <li>
                    <button className="py-2 px-3 shadow-lg rounded-xl">$500 &#62;</button>
                  </li>
                </div>

                <li>
                  <label htmlFor="caliber" className="font-medium mb-2">
                    Caliber
                  </label>
                  <select
                    id="caliber"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2 sm:text-sm"
                  >
                    <option value="">All Calibers</option>
                    <option value="9mm">9mm</option>
                    <option value="45acp">45 ACP</option>
                    <option value="223rem">223 Remington</option>
                    <option value="308win">308 Winchester</option>
                  </select>
                </li>

                <li>
                  <label htmlFor="action" className="block font-medium mb-2">
                    Action
                  </label>
                  <select
                    id="action"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2 sm:text-sm"
                  >
                    <option value="">All Actions</option>
                    <option value="semi-auto">Semi-Automatic</option>
                    <option value="bolt">Bolt-Action</option>
                    <option value="pump">Pump-Action</option>
                    <option value="revolver">Revolver</option>
                  </select>
                </li>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
