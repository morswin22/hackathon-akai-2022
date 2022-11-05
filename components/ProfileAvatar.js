import {Avatar, Box} from '@mui/material'
import {useState} from 'react'

export default function ProfileAvatar({letters, setLoginDialogIsOpen}) {

    return(
        <Box onClick={() => letters === '?' ? setLoginDialogIsOpen(true) : null}>
            <Avatar
                sx={{ bgcolor: 'red', width: '60px', height: '60px', fontSize: '30px' }}
                alt="Avatar"
            >
                {letters}
            </Avatar>
        </Box>
    )
}