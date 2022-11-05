import {Box, Paper, MenuList, MenuItem} from '@mui/material'
import useEventTags from '../../../hooks/useEventTags'
import Chip from '@mui/material/Chip';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import React from 'react';

export default function TagsToggle() {
    const { data: tags } = useEventTags()
    const [selectedTags, setSelectedTags] = useState([])
    const [tagsToSelect, setTagsToSelect] = useState([])
    const [menuIsOpen, setMenuIsOpen] = useState(true)
    const anchorRef = React.useRef(null);

    function handleDelete(labelToDelete) {
        setSelectedTags((oldTags) => oldTags.filter((tag) => tag !== labelToDelete))
        setTagsToSelect((oldTags) => [...oldTags, labelToDelete])
    }

    function handleClose() {
        setMenuIsOpen(false)
    }

    function handleClickMenuItem(labelToAdd){
        setTagsToSelect((oldTags) => oldTags.filter((tag) => tag !== labelToAdd))
        setSelectedTags((oldTags) => [...oldTags, labelToAdd])
        setMenuIsOpen(false)
    }

    useEffect(() => {
        if(tags){
            setSelectedTags(tags)
        }
    }, [tags])

    return(
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {selectedTags && selectedTags.map((tag) => (
                <Box sx={{ margin: '5px, 5px, 5px, 5px' }} key={tag}>
                    <Chip 
                        label={tag}
                        size='small'
                        onDelete={() => handleDelete(tag)}
                    />
                </Box>
            ))}
            <IconButton
                size='small'
                ref={anchorRef}
                onClick={() => {setMenuIsOpen(true)}}
            >
                <AddIcon/>
            </IconButton>
            <Popper
                open={menuIsOpen}
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
                        {/* <ClickAwayListener onClickAway={handleClose}> */}
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList>
                                {tagsToSelect.map((tag) => (
                                    <MenuItem onClick={() => handleClickMenuItem(tag)}>
                                        {tag}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    )
}