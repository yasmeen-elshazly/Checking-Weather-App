import { useContext, useEffect, useState } from "react";
import { Map, View } from "ol";
import { ContextLayer } from "../components/ContextLayer";
import MapViewer from "../components/MapViewer";

export default function MapProviver() {
  const { setMapObject } = useContext(ContextLayer);

  useEffect(() => {
    const map = new Map({
      controls: [],
    }); // Creating a new map instance
    const view = new View({
      center: [1000000, 2000000],
      zoom: 2,
    });
    map.setView(view);
    setMapObject(map);
  }, []);

  return (
    <>
      <MapViewer />
    </>
  );
}
