import axios from 'axios'
import {Box, Paper, Typography, Chip} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import { useRef, useEffect, useState } from 'react'

export default function PinQuickView({x, y, isOpen, setIsOpen, id}) {
    const anchorRef = useRef(null);
    const [quickViewData, setQuickViewData] = useState({name: '', tags: []})

    useEffect(() => {
        if (id !== null) {
            axios.get(`/api/pin?id=${id}`).then((response) => {
                setQuickViewData( response.data ? response.data :  {name: '', tags: []})
                console.log(response.data)
            });
        }
    }, [id]);
    
    function handleCloseQuickView(){
        setIsOpen(false)
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
                        <ClickAwayListener onClickAway={handleCloseQuickView}>
                            <Paper sx={{ width: '200px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography sx={{ textAlign: 'center' }} variant='h4'>
                                    {quickViewData.name}
                                </Typography>
                                <Box sx={{display: 'flex', justifyContent:'center'}}>
                                    {quickViewData.tags && quickViewData.tags.map(({tag}) => (
                                        <Chip
                                            label={tag}
                                            size='small'
                                        />
                                    ))}
                                </Box>
                            </Paper>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
            </Popper>
        </Box>
    )
}