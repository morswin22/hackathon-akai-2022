import {Dialog, Box, Typography, TextField, Button} from '@mui/material'
import {useState} from 'react'
import usePostNewUser from '../hooks/usePostNewUser'
import setLocalStorage from '../hooks/setLocalStorage'

export default function LoginDialog({isOpen, setIsOpen, setLetters}) {

    const newUserMutation = usePostNewUser()

    const [formData, setFormData] = useState({username: '', password: ''})

    function handleChangeUsername(e){
        setFormData((oldValue) => ({...oldValue, username: e.target.value}))
    }
    function handleChangePassword(e){
        setFormData((oldValue) => ({...oldValue, password: e.target.value}))
    }

    function handleClickSubmit(){
        newUserMutation.mutate({username: formData.username}, {
            onSuccess: ({data})=>{
                console.log(data)
                console.log('Succes', data.id)
                setLocalStorage('userId', data.id)
            }
        })
        setIsOpen(false)
        setLetters(formData.username[0] + formData.password[0])
    }

    return(
        <Dialog open={isOpen} onClose={() => { setIsOpen(false) }}>
            <Box sx={{ width: '300px', height: '400px', display: 'flex', flexDirection: 'column', padding: '0 10px 0 10px', position: 'relative', overflow: 'hidden' }}>
                <Typography variant = 'h3' sx={{ textAlign: 'center' }}>
                    Log in 
                </Typography>
                <TextField label = 'Username' sx={{ marginTop: '40px'}} value={formData.username} onChange={handleChangeUsername}/>
                <TextField label = 'Password' sx={{ marginTop: '30px'}} value={formData.password} onChange={handleChangePassword}/>
                <Button sx={{ position: 'absolute', bottom: '20px', width: '100%' }} onClick={handleClickSubmit}>
                    Submit
                </Button>
            </Box>
        </Dialog>
    )
}