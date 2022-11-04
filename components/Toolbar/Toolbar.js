import {Paper, MenuList, MenuItem, ListItemIcon, ListItemText} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

export default function Toolbar(){
    return(
        <Paper 
            sx={{
                width: '200px',
                display: 'flex'
            }}
        >
            <MenuList sx={{ width: '100%' }}>
                <MenuItem>
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Add new event
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <AddBusinessIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Add new place
                    </ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    )
}