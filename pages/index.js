import dynamic from "next/dynamic";
import Toolbar from "../components/Toolbar/Toolbar"
import Search from "../components/Search/Search"
import {Box} from '@mui/material'

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Map />
      <Box
        sx={{
          position: 'absolute',
          top: '20px',
          left: '20px'
        }}
      >
        <Search/>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px'
        }}
      >
        <Toolbar/>
      </Box>
    </div>
  );
}