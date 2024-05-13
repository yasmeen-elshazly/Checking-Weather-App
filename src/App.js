import "./App.css";
import { useState } from "react";
import { ContextLayer } from "./components/ContextLayer";
import Searching from "./components/Searching";
import MapProviver from "./components/MapProvider";
import LayeresProvider from "./components/LayeresProvider";
import ClusteringTempretureProvider from "./components/ClusteringTempretureProvider";

function App() {
  const [mapObject, setMapObject] = useState();
  const [osmLayerObject, setOsmLayerObject] = useState();
  const [darkLayerObject, setDarkLayerObject] = useState();

  return (
    <div>
      <ContextLayer.Provider
        value={{
          mapObject,
          setMapObject,
          osmLayerObject,
          setOsmLayerObject,
          darkLayerObject,
          setDarkLayerObject,
        }}
      >
        <Searching />
        <LayeresProvider />
        <MapProviver />
        <ClusteringTempretureProvider />
      </ContextLayer.Provider>
    </div>
  );
}

export default App;
