import React, { useState } from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import * as parksData from './data/skateboard-parks.json'
import mapStyles from './mapStyles';
import './App.css';


function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  return (
    <GoogleMap 
    defaultZoom={10} 
    defaultCenter={{lat: 45.421532, lng: -75.697189}} 
    defaultOptions={{ styles: mapStyles }}
    >
    {parksData.features.map(park => (
      <Marker 
      key={park.properties.PARK_ID} 
      position={{
        lat: park.geometry.coordinates[1],
        lng: park.geometry.coordinates[0]
      }}
      onClick={() => {
        setSelectedPark(park);
      }}
      icon={{
        url: '/skateboarding.svg',
        scaledSize: new window.google.maps.Size(25,25)
      }}
      />
    ))}

    {selectedPark && 
    <InfoWindow position={{
      lat: selectedPark.geometry.coordinates[1],
      lng: selectedPark.geometry.coordinates[0]
    }}
      onCloseClick={() => {
        setSelectedPark(null);
      }}
    >
      <div>
      <h2>{selectedPark.properties.NAME}</h2>
      <p>{selectedPark.properties.DESCRIPTIO}</p>
      </div>
    </InfoWindow>
    }
    </GoogleMap>
  );
  
}

const WrapperMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div className="App">
      <WrapperMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCj68QCkyxVL32rnGhp4wkn2_5VG4UNFJo`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `800px` }} />}
        mapElement={<div style={{ height: `600px` }} />}

      />

      
    </div>
  );
}

export default App;
