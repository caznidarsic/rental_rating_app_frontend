import React, { useState } from 'react';
import axios from 'axios';
import MapView from './MapView.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RentalSearch.scss';


function RentalSearch() {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ latitude: 40, longitude: -100 });
    const [mapZoom, setMapZoom] = useState(3);

    const handleGeocode = async (event) => {
        try {
            event.preventDefault(); // needed to avoid re-rendering entire page
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                console.log(response.data);
                setCoordinates({ latitude: lat, longitude: lon });
                setMapZoom(17);
            } else {
                console.error('No results found for the provided address.');
            }
        } catch (error) {
            console.error('Error occurred while geocoding:', error);
        }
    };

    return (
        <div className='Map-container'>
            <div className='Map-container-list'>
                <form onSubmit={handleGeocode}>
                    <div className='Search-bar-box'>
                        <div className='Search-bar'>
                            <input
                                className="form-control rounded-pill"
                                type="text"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        {/* <button type="submit" className="btn btn-primary">Search</button> */}
                    </div>
                </form>
            </div>
            <div className='Map-container-map'>
                {coordinates && <MapView coordinates={coordinates} zoom={mapZoom}></MapView>}
            </div>
        </div>
    );
}

export default RentalSearch;