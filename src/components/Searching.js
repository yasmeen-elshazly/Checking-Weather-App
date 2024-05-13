import { useContext, useEffect, useState } from "react";
import { ContextLayer } from "../components/ContextLayer";
import { transform } from "ol/proj";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import "../Css/Searching.css";

export default function Searching() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPlaces, setSearchPlaces] = useState([]);
  const { mapObject } = useContext(ContextLayer);

  useEffect(() => {
    var getData = setTimeout(() => {
      const getPlaceCoordinate = async () => {
        fetch(
          `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json`
        )
          .then((responseObject) => responseObject.json())
          .then((data) => setSearchPlaces(data));
      };
      getPlaceCoordinate();
    }, 500);
    return () => clearTimeout(getData);
  }, [searchQuery]);

  const moveMap = (lon, lat) => {
    const prejectedCoord = transform([lon, lat], "EPSG:4326", "EPSG:3857");
    mapObject.getView().animate({ zoom: 10 }, { center: prejectedCoord });
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setSearchPlaces([]);
  };

  return (
    <>
      <div className="search-bar-main-container">
        <div className="search-bar-container">
          <input
            className="search-bar"
            id="SearchPlace"
            type="text"
            placeholder="Search Place"
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <button
              className="button"
              onClick={() => {
                setSearchQuery(document.getElementById("SearchPlace").value);
                moveMap(searchPlaces[0].lon, searchPlaces[0].lat);
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <button className="button" onClick={handleResetSearch}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        </div>
        {searchPlaces.map((place) => {
          return (
            <div
              className="search-result"
              onClick={() => moveMap(place.lon, place.lat)}
            >
              {place.display_name}
            </div>
          );
        })}
      </div>
    </>
  );
}
