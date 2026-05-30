import React, { useState } from "react";
import LeafletMap from "./LeafletMap";

export default function CoverageMap({ coverageArea }) {
  const [mapData, setMapData] = useState(null);

  const mapFunc = (mapInfo) => {
    setMapData(mapInfo);
  };

  const handleCoverage = (e) => {
    e.preventDefault();
    const searchArea = e.target.search.value;

    const filteredArea = coverageArea.find((area) =>
      area.district.toLowerCase().includes(searchArea.toLowerCase()),
    );

    if (!filteredArea) {
      alert("not Found");
    }

    mapData.flyTo([filteredArea.latitude, filteredArea.longitude], 12);
  };

  return (
    <div className="space-y-10 mt-10">
      <div>
        <h2 className="text-2xl font-semibold text-secondary">
          We are available in 64 districts
        </h2>

        <div>
          <form onSubmit={handleCoverage} className="mt-5">
            <div className="relative w-100">
              <input
                name="search"
                type="text"
                className="bg-white rounded-full h-12 px-5 w-100 outline-none"
              />
              <button
                type="submit"
                className="bg-primary py-2 px-5 rounded-full h-12 absolute right-0 font-semibold cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-secondary">
        We deliver almost all over Bangladesh
      </h3>
      <LeafletMap mapFunc={mapFunc} coverageArea={coverageArea} />
    </div>
  );
}
