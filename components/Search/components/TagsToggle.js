import { Box, Paper, MenuList, MenuItem } from '@mui/material'
import useEventTags from '../../../hooks/useEventTags'
import Chip from '@mui/material/Chip';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import React from 'react';

export default function TagsToggle({ onTagSelectionChanged }) {
    const { data: tags } = useEventTags()
    const [selectedTags, setSelectedTags] = useState([])
    const [tagsToSelect, setTagsToSelect] = useState([])
    const [menuIsOpen, setMenuIsOpen] = useState(true)
    const anchorRef = React.useRef(null);

    function handleDelete(labelToDelete, id) {
        setSelectedTags((oldTags) => oldTags.filter(({ tag }) => tag !== labelToDelete))
        setTagsToSelect((oldTags) => [...oldTags, {tag: labelToDelete, id: id}])
        SelectionChanged();
    }

    function handleClose() {
        setMenuIsOpen(false)
    }

    function SelectionChanged() {
        if (onTagSelectionChanged != undefined) {
            onTagSelectionChanged({ selectedTags, notSelectedTags: tagsToSelect  });
        }
    }

    function handleClickMenuItem(tagToAdd, id) {
        console.log(tagToAdd, id)
        setTagsToSelect((oldTags) => oldTags.filter(({ tag }) => tag !== tagToAdd))
        setSelectedTags((oldTags) => [...oldTags, {tag: tagToAdd, id: id}])
        setMenuIsOpen(false);
        SelectionChanged();
    }

    useEffect(() => {
        if (tags) {
            setSelectedTags(tags)
        }
    }, [tags])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            {selectedTags && selectedTags.map(({ id, tag }) => (
                <Box sx={{ margin: '1px 3px 1px 3px' }} key={id}>
                    <Chip
                        label={tag}
                        size='small'
                        onDelete={() => handleDelete(tag, id)}
                        sx={{ margin: '5px 0 5px 0' }}
                    />
                </Box>
            ))}
            <IconButton
                size='small'
                ref={anchorRef}
                onClick={() => { setMenuIsOpen(true) }}
            >
                <AddIcon />
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
                                    {tagsToSelect.map(({tag, id}) => (
                                        <MenuItem onClick={() => handleClickMenuItem(tag, id)}>
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