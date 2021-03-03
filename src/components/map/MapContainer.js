import React, {useContext, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, MarkerClusterer, useLoadScript} from "@react-google-maps/api";
import MarkItem from "./MarkItem";

const MapContainer = ({mapClubs, zoom, setZoom, selected, setSelected, center, setCenter}) => {
    const [map, setMap] = useState(null);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAP_KEY
    });

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Map is loading";

    const mapContainerStyle = {
        width: "100%",
        height: "100%"
    };

    const option = {
        disableDefaultUI: true,
        zoomControl: true
    };

    const changeZoom = () => {
        if (map != null) {
            setZoom(map.zoom);
        }
    };

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            onLoad={map => {setMap(map);}}
            center={center}
            options={option}
            onZoomChanged={changeZoom}>
            <MarkerClusterer
                onClusteringEnd={(clusters) => {
                    clusters.clusters.map((cluster) => {
                        cluster.clusterIcon.styles = [{
                            url: `${process.env.PUBLIC_URL}/static/images/map/cluster.png`,
                            height: 58,
                            width: 67,
                            textColor: '#FFFFFF',
                            textSize: 18,
                        }];
                    })
                }}>
                {(cluster) =>
                    mapClubs.content.map(club => (
                            <Marker
                                id={club.id}
                                position={{
                                    lat: club.latitude,
                                    lng: club.longitude
                                }}
                                clusterer={cluster}
                                onClick={() => {
                                    setSelected(club);
                                    setZoom(15);
                                    setCenter({
                                        lat: club.latitude,
                                        lng: club.longitude
                                    })
                                }}
                                icon={{url: `${process.env.PUBLIC_URL}/static/images/map/location.png`}}/>
                        )
                    )}
            </MarkerClusterer>

            {selected && (
                <InfoWindow position={{lat: selected.latitude, lng: selected.longitude}}
                            onCloseClick={() => {
                                setSelected(null);
                            }}>
                    <MarkItem mapClub={selected}/>
                </InfoWindow>)}
        </GoogleMap>
    )

}

export default MapContainer;