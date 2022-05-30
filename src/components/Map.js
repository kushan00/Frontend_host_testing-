import React from 'react'
import { GoogleMap, LoadScript , Marker } from '@react-google-maps/api';

const containerStyle = {
  marginTop:"220px",
  width: '1210px',
  height: '600px'
};

const position = {
  lat: 6.9147,
  lng: 79.9729
};

const onLoad = marker => {
    console.log('marker: ', marker)
  }


function Map() {
  return (

    <LoadScript
      googleMapsApiKey="AIzaSyBAGsTlZT7fLRb_IVRmMFSXf-qbE1nnIKk"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={10}
      >
           <Marker
      onLoad={onLoad}
      position={position}
    />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)