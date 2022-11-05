import {Box,Paper, MenuList, MenuItem, ListItemIcon, ListItemText} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import React, {useEffect} from 'react'

export default function Toolbar({x, y, isOpen, setIsOpen, setNewPlaceDialogIsOpen, setNewEventDialogIsOpen}){

    const anchorRef = React.useRef(null);
    function handleCloseMenu(){
        setIsOpen(false)
    }

    function handleAddNewPlace() {
        setNewPlaceDialogIsOpen(true)
    }

    function handleAddNewEvent(){
        setNewEventDialogIsOpen(true)
    }  

    return(
        <Box>
            <Box sx={{ top: y, left: x, width: 0, height: 0, position: 'absolute'}} ref={anchorRef}/>
            <Popper
                open={isOpen}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                transition
                disablePortal
                >
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleCloseMenu}>
                            <MenuList sx={{ width: '100%' }}>
                                <MenuItem onClick={handleAddNewEvent}>
                                    <ListItemIcon>
                                        <AddIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        Add new event
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleAddNewPlace}>
                                    <ListItemIcon>
                                        <AddBusinessIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        Add new place
                                    </ListItemText>
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
            </Popper>
        </Box>
    )
}