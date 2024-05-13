import { useContext, useEffect, useRef } from "react";
import { ContextLayer } from "../components/ContextLayer";
import { Overlay } from "ol";

export default function ClusteringTempreture() {
  const { mapObject } = useContext(ContextLayer);
  const popupRef = useRef();

  useEffect(() => {
    if (mapObject) {
      mapObject.on("click", (event) => {
        let clickFeature = null;
        const props = popupPosition(event);
        mapObject.addOverlay(props);
        mapObject.forEachFeatureAtPixel(event.pixel, (feature) => {
          clickFeature = feature;
        });
        if (!clickFeature) {
          props.setPosition(null);
          popupRef.current.innerHTML = "";
        } else {
          props.setPosition(clickFeature.getGeometry().getCoordinates());
          const featureData = clickFeature.get("features")[0];
          const content = createPopupContent(featureData);
          if (popupRef.current) popupRef.current.innerHTML = content;
        }
      });
    }
  }, [mapObject]);

  const weatherImage = (feature) => {
    const weather = feature.get("weatherMain");
    switch (weather) {
      case "Clouds":
        return "/images/Cloudy.png";
      case "Clear":
        return "/images/Sunny.png";
      case "Rain":
        return "/images/Rainy.png";
      case "Snow":
        return "/images/Snowy.png";
      case "Thunderstorm":
        return "/images/Storm.png";
      case "Haze":
        return "/images/Windy.png";
      case "Mist":
        return "/images/Sand.png";
      case "Dust":
        return "/images/Sand.png";
      case "Sand":
        return "/images/Sand.png";
    }
  };

  const popupPosition = (event) => {
    let positioning = "";
    const props = new Overlay({
      element: popupRef.current,
    });
    if (event.pixel[0] < 350 && event.pixel[1] < 300) {
      positioning = "top-left";
    } else if (event.pixel[0] < 350) {
      positioning = "bottom-left";
    } else if (event.pixel[1] < 300) {
      positioning = "top-right";
    } else if (event.pixel[0] < 350 && event.pixel[1] > 400) {
      positioning = "bottom-left";
    } else if (event.pixel[1] > 400) {
      positioning = "bottom-right";
    } else {
      positioning = "bottom-right";
    }
    props.setPositioning(positioning);
    return props;
  };

  const createPopupContent = (featureData) => {
    const {
      city,
      weatherMain,
      weatherDescription,
      minTemprture,
      maxTemprture,
    } = featureData.getProperties();
    const content = `<div>
          <img src=${weatherImage(
            featureData
          )} className="card-img-top" alt=${weatherMain} style="width:150px;margin:0px 10px"/>
        </div>
        <div style="border-left: 1px solid gray;margin: 10px 10px 10px 0px">
        <div style="margin-left: 10px">
          <h5  style="font-family: Serif;font-weight: 700;">${city}</h5>
          <p style="margin: 0px;font-family: Serif;font-size: 14px;">
          Weather : ${weatherMain}<br/>
          Description : ${weatherDescription}<br/>
          minTemperature : ${minTemprture}<br/>
          maxTemperature : ${maxTemprture}
          </p>
        </div>
        </div>`;
    return content;
  };

  return (
    <>
      <div
        className={`card mb-3 flex-row align-items-center justify-content-center text-bg-dark`}
        style={{
          maxWidth: "400px",
          boxShadow: "2px 2px 10px 0 rgba(0,0,0,0.5)",
        }}
        ref={popupRef}
      ></div>
    </>
  );
}
