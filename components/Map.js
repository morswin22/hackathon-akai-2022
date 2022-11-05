import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config.js";
import { useGeolocated } from "react-geolocated";
import { Box } from '@mui/material';
import usePins from '../hooks/usePins';
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";

const POZNAN = {
  latitude: 52.406374,
  longitude: 16.9251681,
};

const DEFAULT_ZOOM = 12;

export default function Map({ onLMB, onRMB, onDragLRMB, onScroll, pointMaker, onMarkerClicked, onMarkHovered, mapPointToIDFnRef }) {
  const { data: pins, isSuccess } = usePins();

  const mapContainer = useRef(null);
  const mapView = useRef(null);
  const mapGraphics = useRef(null);

  const mapPointToIDRef = useRef({});
  const mapPointToID = uid => mapPointToIDRef.current[uid];
  mapPointToIDFnRef.current = mapPointToID;

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
    });

  const AddPointMarker = (longitude, latitude, color = [226, 119, 40]) => {
    let point = { //Create a point
      type: "point",
      longitude: longitude,
      latitude: latitude
    };

    let simpleMarkerSymbol = {
      type: "simple-marker",
      outline: {
        color: color,
        width: 100
      }
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol
    });

    mapPointToIDRef.current[pointGraphic.uid] = /* ID FROM DB */1;

    mapGraphics.current.add(pointGraphic);
  }


  useEffect(() => {
    if (!mapContainer.current)
      return;

    esriConfig.apiKey = 'AAPKab0afb37d278482798ff5c85e79ca788t1KKH2vzhBsOFuRW_qbpldjtxGXL5rR_hVmBIJeiudOwNo3yxu7G9FmM0bMsKcUf';
    esriConfig.assetsPath = '/arcgis';

    const map = new WebMap({
      basemap: "arcgis-nova",
    });

    mapGraphics.current = new GraphicsLayer({
      screenSizePerspectiveEnabled: true
    });
    map.add(mapGraphics.current);

    mapView.current = new MapView({
      map,
      container: "mapContainer",
      center: [POZNAN.longitude, POZNAN.latitude],
      zoom: DEFAULT_ZOOM,
    });

    mapView.current.ui.move(["zoom", map], "bottom-right");

    mapView.current.on("click", (event) => {
      if (event.button == 0 && onLMB != undefined)
      // left
      {
        onLMB(event);
        // if(hover)
      }
      if (event.button == 0 && onMarkerClicked != undefined) {
        // console.log(mapView.current);

        var screenPoint = {
          x: event.x,
          y: event.y
        };

        mapView.current.hitTest(screenPoint).then(function (response) {
          if (response.results.length) {
            var graphic = response.results.filter(function (result) {
              return result.graphic.layer === mapGraphics.current;
            });
            onMarkerClicked(event, graphic)
          }
        });
      }
      if (event.button == 2 && onRMB != undefined)
        // right
        onRMB(event);
    });

    mapView.current.on("pointer-move", (event) => {
      if (onMarkHovered != undefined) {
        var screenPoint = {
          x: event.x,
          y: event.y
        };

        mapView.current.hitTest(screenPoint).then(function (response) {
          if (response.results.length) {
            var graphic = response.results.filter(function (result) {
              return result.graphic.layer === mapGraphics.current;
            });
            onMarkHovered(event, graphic)
          }
        });
      }
    });

    mapView.current.on("drag", (event) => {
      if (onDragLRMB != undefined && event.button != 1) {
        onDragLRMB(event);
      }
    });

    mapView.current.on("mouse-wheel", (event) => {
      if (onScroll != undefined) {
        console.log("PRAWA KOBIET");
        onScroll(event);
      }
    })
  }, []);

  useEffect(() => {
    if (!isGeolocationEnabled || !coords || !mapView.current)
      return;

    mapView.current.goTo({
      center: [coords.longitude, coords.latitude],
      zoom: DEFAULT_ZOOM,
    });
  }, [coords]);

  useEffect(() => {
    if (!isSuccess)
      return;

    for (const pin of pins) {
      AddPointMarker(pin.longitude, pin.latitude, [pin.r, pin.g, pin.b]);
    }
  }, [pins, isSuccess]);
  pointMaker.current = AddPointMarker;

  return <Box id="mapContainer" ref={mapContainer} sx={{ width: '100vw', height: '100vh' }}></Box>;
}
