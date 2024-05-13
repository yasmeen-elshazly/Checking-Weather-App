import { useContext, useEffect, useState } from "react";
import { ContextLayer } from "../components/ContextLayer";
import { FullScreen, Rotate, Zoom } from "ol/control";
import "../Css/Controlers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faArrowUp,
  faInfo,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { createRoot } from "react-dom/client";

export default function Controlers(props) {
  const { osmVisiblity, darkVisiblity } = props;
  const [attributionCollapse, setAttributionCollapse] = useState(false);
  const { mapObject } = useContext(ContextLayer);

  useEffect(() => {
    if (mapObject) {
      mapObject.addControl(new Zoom());
      zoomControlChange();
      mapObject.addControl(new Rotate());
      rotateControlChange();
      mapObject.addControl(new FullScreen());
    }
  }, [mapObject]);

  useEffect(() => {
    if (mapObject) {
      const attributionContainer = document.getElementsByClassName(
        "ol-attribution-data"
      )[0];
      if (attributionCollapse && darkVisiblity) {
        attributionContainer.innerHTML = `<a href="https://stadiamaps.com/" target="_blank" class="ol-attribution-anchor">&copy; Stadia Maps</a>`;
      } else if (attributionCollapse && osmVisiblity) {
        attributionContainer.innerHTML = `<a href="https://www.openstreetmap.org" target="_blank" class="ol-attribution-anchor">&copy; OpenStreetMap contributors</a>`;
      } else {
        attributionContainer.innerHTML = "";
      }
    }
  }, [osmVisiblity, darkVisiblity, attributionCollapse]);

  function zoomControlChange() {
    const zoomControl = mapObject.controls.array_.find(
      (control) => control instanceof Zoom
    );
    const zoomInElement = document.createElement("div");
    const zoomOutElement = document.createElement("div");
    zoomControl.element.querySelector(".ol-zoom-in").innerHTML = "";
    zoomControl.element.querySelector(".ol-zoom-in").appendChild(zoomInElement);
    createRoot(zoomInElement).render(<FontAwesomeIcon icon={faPlus} />);
    zoomControl.element.querySelector(".ol-zoom-out").innerHTML = "";
    zoomControl.element
      .querySelector(".ol-zoom-out")
      .appendChild(zoomOutElement);
    createRoot(zoomOutElement).render(<FontAwesomeIcon icon={faMinus} />);
  }

  function rotateControlChange() {
    const rotateControl = mapObject.controls.array_.find(
      (control) => control instanceof Rotate
    );
    const rotateElement = document.createElement("div");
    rotateControl.element.querySelector(".ol-rotate-reset").innerHTML = "";
    rotateControl.element
      .querySelector(".ol-rotate-reset")
      .appendChild(rotateElement);
    createRoot(rotateElement).render(<FontAwesomeIcon icon={faArrowUp} />);
  }

  function attributionControlHandler() {
    if (attributionCollapse) {
      setAttributionCollapse(false);
    } else {
      setAttributionCollapse(true);
    }
  }

  return (
    <>
      <div className="attribution-container dark">
        <button
          className="ol-attribution"
          onClick={attributionControlHandler}
          style={{ color: !attributionCollapse ? "gray" : "lightgray" }}
        >
          <span className="ol-attribution-data"></span>
          {!attributionCollapse ? (
            <FontAwesomeIcon icon={faInfo} />
          ) : (
            <FontAwesomeIcon icon={faAngleLeft} />
          )}
        </button>
      </div>
    </>
  );
}
