import dynamic from "next/dynamic";
import Toolbar from "../components/Toolbar/Toolbar"
import Search from "../components/Search/Search"
import { Box } from '@mui/material'
import Head from 'next/head';
import { useState, useRef } from 'react'
import NewPinForm from '../components/Forms/NewPinForm'
import PinQuickView from '../components/PinQuickView'

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [{ x, y, latitude, longitude }, setToolbarCoords] = useState({ x: 0, y: 0, latitude: 0, longitude: 0 });
  const [{QVX, QVY}, setQuichViewCoordinance] = useState({QVX: 0, QVY: 0})
  const [pointMarker, setPointMarker] = useState(null)
  const [toolbarIsOpen, setToolbarIsOpen] = useState(false)
  const [newPlaceDialogIsOpen, setNewPlaceDialogIsOpen] = useState(false)
  const [newEventDialogIsOpen, setNewEventDialogIsOpen] = useState(false)
  const [quickViewIsOpen, setQuickViewIsOpen] = useState(false)
  const [quickViewUID, setQuickViewUID] = useState(null);
  const mapPointToIDFnRef = useRef(null)

  const pointMaker = useRef(null);

  function handleMapRMB(e) {
    setToolbarCoords({ x: e.x, y: e.y, latitude: e.mapPoint.latitude, longitude: e.mapPoint.longitude })
    setToolbarIsOpen(true)
    // if (pointMaker.current)
    //   pointMaker.current(e.mapPoint.longitude, e.mapPoint.latitude, [134, 62, 75]);
  }

  function handleMapLMB(e) {
    setToolbarCoords({ x: e.x, y: e.y, latitude: e.mapPoint.latitude, longitude: e.mapPoint.longitude })
  }

  function handleMarkedClicked(mark) {
    if(mark.length > 0){
      console.log(mark);
    }
  }

  function closeToolbar() {
    setToolbarIsOpen(false)
  }

  function handleMarkHovered(event, array) {
    if(array.length > 0 && !toolbarIsOpen){
      if(!quickViewIsOpen){
        setQuichViewCoordinance({QVX: event.x, QVY: event.y})
      }
      setQuickViewIsOpen(true)
      setQuickViewUID(array[0].graphic.uid);
    } else{
      setQuickViewIsOpen(false)
    }
  }

  return (
    <div>
      <Head>
        <link rel="icon" type="image/jpg" href="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/1200px-Felis_catus-cat_on_snow.jpg"></link>
      </Head>
      <Map 
        onRMB={handleMapRMB} 
        onMarkHovered={handleMarkHovered} 
        onMarkerClicked={handleMarkedClicked} 
        onMove={closeToolbar} 
        onScroll={closeToolbar} 
        onDragLRMB={closeToolbar} 
        pointMaker={pointMaker}
        mapPointToIDFnRef={mapPointToIDFnRef}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20px',
          left: '20px'
        }}
      >
        <Search />
      </Box>
      <Toolbar
        x={x}
        y={y}
        isOpen={toolbarIsOpen}
        setIsOpen={setToolbarIsOpen}
        setNewPlaceDialogIsOpen={setNewPlaceDialogIsOpen}
        setNewEventDialogIsOpen={setNewEventDialogIsOpen}
      />
      <NewPinForm
        open={newPlaceDialogIsOpen}
        onClose={() => {setNewPlaceDialogIsOpen(false)}}
        title='Add new Place'
        showDates={false}
        latitude={latitude}
        longitude={longitude}
        addMarkerRef={pointMaker}
      />
      <NewPinForm
        open={newEventDialogIsOpen}
        onClose={() => {setNewEventDialogIsOpen(false)}}
        title='Add new Event'
        showDates={true}
        latitude={latitude}
        longitude={longitude}
        addMarkerRef={pointMaker}
      />
      <PinQuickView
        x={QVX}
        y={QVY} 
        isOpen={quickViewIsOpen}
        setIsOpen={setQuickViewIsOpen}
        id={quickViewUID ? mapPointToIDFnRef.current(quickViewUID) : null}
      />
    </div>
  );
}