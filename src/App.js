import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import stadiumData from "./stadiumsNFL";
import "./styles.css";

function Map() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <GoogleMap defaultZoom={4.5} defaultCenter={{ lat: 37, lng: -95 }}>
      {stadiumData.map(location => (
        <Marker
          key={location.recordid}
          position={{
            lat: location.geometry.coordinates[1],
            lng: location.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedLocation(location);
          }}
        />
      ))}

      {selectedLocation && (
        <InfoWindow
          className="infocard"
          position={{
            lat: selectedLocation.geometry.coordinates[1],
            lng: selectedLocation.geometry.coordinates[0]
          }}
          onCloseClick={() => {
            setSelectedLocation(null);
          }}
        >
          <div>
            <h1>{selectedLocation.fields.name1}</h1>
            <h5>
              {selectedLocation.fields.address1},{" "}
              {selectedLocation.fields.state} {selectedLocation.fields.zip}
            </h5>
            <hr />
            <ul>
              <li>
                <h3>Home of the {selectedLocation.fields.team}</h3>
              </li>
              <li>
                <h3>
                  {selectedLocation.fields.name1} has a max capacity of{" "}
                  {selectedLocation.fields.capacity}
                </h3>
              </li>
              {selectedLocation.fields.comments_1 ? (
                <li>
                  <h3>{selectedLocation.fields.comments_1}</h3>
                </li>
              ) : null}
            </ul>
            <img className="stadiums" src={selectedLocation.fields.image} />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: `100wh`, height: `100vh` }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCEd5b45w2pMAPDtANvKcdgnb5m1BK-FSo`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
