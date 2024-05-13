import { useContext, useEffect, useState } from "react";
import "../Css/Layers.css";
import Controlers from "../components/Controlers";
import { ContextLayer } from "../components/ContextLayer";

export default function Layers(props) {
  const { osmLayerObject, darkLayerObject } = useContext(ContextLayer);
  const [osmVisiblity, setOsmVisibility] = useState(true);
  const [darkVisiblity, setDarkVisibility] = useState(true);
  const [switchLayer, setSwitchLayer] = useState(true);

  useEffect(() => {
    if (switchLayer) {
      setOsmVisibility(true);
      setDarkVisibility(false);
    } else {
      setOsmVisibility(false);
      setDarkVisibility(true);
    }
  }, [switchLayer]);

  const handleSwitchLayer = (nameOfLayer) => {
    [osmLayerObject, darkLayerObject].forEach((layer) => {
      
      const name = layer.get("layerName");
      if (name === nameOfLayer) {
        layer.setVisible(true);
      }
      if (switchLayer) setSwitchLayer(false);
      else setSwitchLayer(true);
    });
    
  };

  return (
    <>
      <div className="layers-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="radio"
            role="switch"
            name="layers"
            id="osmLayer"
            defaultChecked={true}
            onChange={(e) => {
              handleSwitchLayer(e.target.id);
            }}
          />
          <label className="form-check-label label" htmlFor="osmLayer">
            {osmLayerObject ? "OSM Layer" : null}
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="radio"
            role="switch"
            id="darkLayer"
            name="layers"
            defaultChecked={false}
            onChange={(e) => {
              handleSwitchLayer(e.target.id);
            }}
          />
          <label
            className="form-check-label label"
            htmlFor="darkLayer"
            style={{ fontFamily: "cursive" }}
          >
            {darkLayerObject ? "Dark Layer" : null}
          </label>
        </div>
      </div>
      <Controlers osmVisiblity={osmVisiblity} darkVisiblity={darkVisiblity} />
    </>
  );
}
