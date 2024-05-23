import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import Icon from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import markerShadowPng from "leaflet/dist/images/marker-shadow.png"
import 'leaflet/dist/leaflet.css';
import './MapView.scss';
function get() {

}

function MapView({ coordinates, zoom }) {

  useEffect(() => {
    console.log("UseEffect Ran!!!")
    // Create a map instance
    const map = L.map('map').setView([coordinates.latitude, coordinates.longitude], zoom);
    const markerIcon = L.icon({
      iconUrl: markerIconPng,
      shadowUrl: markerShadowPng,
      iconAnchor: [13, 40]
    })
    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker to the map
    L.marker([coordinates.latitude, coordinates.longitude], { icon: markerIcon }).addTo(map)
      .bindPopup('Your Location');

    map.on('moveend', function onDragEnd() {

      // alert(
      //   'eastBound:' + map.getBounds().getEast() + '\n' +
      //   'westBound:' + map.getBounds().getWest() + '\n' +
      //   'northBound:' + map.getBounds().getNorth() + '\n' +
      //   'southBound:' + map.getBounds().getSouth() + '\n'
      // )
    });
    // Cleanup function
    return () => {
      map.remove(); // Remove the map when the component unmounts
    };
  }, [coordinates]);

  return (
    <div id="map" className='Map' />
  );
}

export default MapView;