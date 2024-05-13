import { useContext, useEffect, useState } from "react";
import { ContextLayer } from "../components/ContextLayer";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { transform } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import ClusterSource from "ol/source/Cluster";
import ClusteringTempreture from "../components/ClusteringTempreture";

export default function ClusteringTempretureProvider() {
  const { mapObject } = useContext(ContextLayer);
  const [clusteredFeatures, setClusteredFeatures] = useState([]);

  useEffect(() => {
    fetch("/citiesWeather.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setClusteredFeatures(mapCitiesToFeatures(data.cities)))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  useEffect(() => {
    if (clusteredFeatures.length) {
      const vectorSource = new VectorSource({
        features: clusteredFeatures,
      });
      const clusterSource = new ClusterSource({
        source: vectorSource,
        minDistance: 10,
      });
      const vectorLayer = new VectorLayer({
        source: clusterSource,
      });
      mapObject.addLayer(vectorLayer);
    }
  }, [mapObject, clusteredFeatures]);

  const mapCitiesToFeatures = (cities) => {
    const allCities = [];
    Object.values(cities).forEach((eachCity) => {
      const point = [eachCity.city.coord.lon, eachCity.city.coord.lat];
      const city = eachCity.city.name;
      const weatherMain = eachCity.weather[0].main;
      const weatherDescription = eachCity.weather[0].description;
      const minTemprture = eachCity.main.temp_min;
      const maxTemprture = eachCity.main.temp_max;
      const projectedPoint = transform(point, "EPSG:4326", "EPSG:3857");
      const feature = new Feature({
        geometry: new Point(projectedPoint),
        city,
        weatherMain,
        weatherDescription,
        minTemprture,
        maxTemprture,
      });
      allCities.push(feature);
    });
    return allCities;
  };

  return (
    <>
      <ClusteringTempreture />
    </>
  );
}
