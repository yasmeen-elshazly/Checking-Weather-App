import { useContext, useEffect, useRef } from "react";
import { ContextLayer } from "../components/ContextLayer";

export default function MapViewer() {
  const { mapObject } = useContext(ContextLayer);
  const mapDiv = useRef();
  useEffect(() => {
    if (mapObject) {
      mapObject.setTarget(mapDiv.current);
    }
  }, [mapObject]);

  return (
    <>
      <div
        style={{ width: "100%", height: "100%", position: "absolute" }}
        ref={mapDiv}
      ></div>
    </>
  );
}
