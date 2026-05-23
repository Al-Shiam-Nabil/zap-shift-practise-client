import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
export default function LeafletMap({ coverageArea, mapFunc }) {
  const position = [23.685, 90.3563];
  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: "600px", width: "100%" }}
      ref={mapFunc}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {coverageArea &&
        coverageArea.map((area, index) => (
          <Marker key={index} position={[area.latitude, area.longitude]}>
            <Popup>{area.covered_area.join(",")}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
