import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TagsToggles from './components/TagsToggle'
import {Box} from '@mui/material'

export default function Search() {
    return (
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', width: 400, flexDirection: 'column' }}
        >
          <Box sx={{ display: 'flex' }}>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search on MEOW"
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
          <TagsToggles/>
        </Paper>
      );
}