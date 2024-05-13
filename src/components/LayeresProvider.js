import TileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "ol/source";
import { useContext, useEffect } from "react";
import Layers from "../components/Layers";
import { ContextLayer } from "../components/ContextLayer";

export default function LayeresProvider() {
  const {
    mapObject,
    osmLayerObject,
    setOsmLayerObject,
    darkLayerObject,
    setDarkLayerObject,
  } = useContext(ContextLayer);

  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new OSM({}),
      visible: true,
      layerName: "osmLayer",
    });
    setOsmLayerObject(osmLayer);
    const darkLayer = new TileLayer({
      source: new XYZ({
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
      }),
      visible: false,
      layerName: "darkLayer",
    });
    setDarkLayerObject(darkLayer);
  }, []);

  useEffect(() => {
    if (mapObject) {
      if (osmLayerObject) mapObject.addLayer(osmLayerObject);
      if (darkLayerObject) mapObject.addLayer(darkLayerObject);
    }
  }, [mapObject]);

  return (
    <>
      <Layers />
    </>
  );
}
