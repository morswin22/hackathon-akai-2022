import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config.js";
import { useGeolocated } from "react-geolocated";
import { Box } from '@mui/material';

const POZNAN = {
  latitude: 52.406374,
  longitude: 16.9251681,
};

const DEFAULT_ZOOM = 12;

export default function Map() {
  const mapContainer = useRef(null);
  const mapView = useRef(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
    });

  useEffect(() => {
    if (!mapContainer.current)
      return;
    
    esriConfig.apiKey = 'AAPKab0afb37d278482798ff5c85e79ca788t1KKH2vzhBsOFuRW_qbpldjtxGXL5rR_hVmBIJeiudOwNo3yxu7G9FmM0bMsKcUf';
    esriConfig.assetsPath = '/arcgis';
    
    const map = new WebMap({
      basemap: "arcgis-topographic",
    });

    mapView.current = new MapView({
      map,
      container: "mapContainer",
      center: [POZNAN.longitude, POZNAN.latitude],
      zoom: DEFAULT_ZOOM,
    });
  }, []);

  useEffect(() => {
    if (!isGeolocationEnabled || !coords || !mapView.current)
      return;

    mapView.current.goTo({
      center: [coords.longitude, coords.latitude],
      zoom: DEFAULT_ZOOM,
    });
  }, [coords]);

  return <Box id="mapContainer" ref={mapContainer} sx={{width: '100vw', height: '100vh'}}></Box>;
}
