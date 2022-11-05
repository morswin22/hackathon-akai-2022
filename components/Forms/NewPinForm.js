import {Paper, Dialog, IconButton, Box, Button, TextField, Chip, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import useEventTags from '../../hooks/useEventTags'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import usePostNewPin from '../../hooks/usePostNewPin';

export default function NewPinForm({open, onClose, title, showDates, latitude, longitude, addMarkerRef}) {
    const [choosenTags, setChoosenTags] = useState([])
    const mutationNewPin = usePostNewPin()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date_start: null,
        date_end: null,
        choosenTags: [],
        latitude: latitude,
        longitude: longitude,
    })

    useEffect(() => {
        setFormData({
            ...formData,
            latitude: latitude,
            longitude: longitude,
        })
    }, [latitude, longitude]);

    const handleChangeTitle = (e) => {
        setFormData((oldData) => ({...oldData, name: e.target.value}))
    }

    const handleChangeDescription = (e) => {
        setFormData((oldData) => ({...oldData, description: e.target.value}))
    }

    const handleStartDateChange = (newStartDate) => {
        setFormData((oldData) => ({...oldData, date_start: newStartDate}))
    };

    const handleEndDateChange = (newEndValue) => {
        setFormData((oldData) => ({...oldData, date_end: newEndValue}))
    }

    const handleClickTag = (tagToToggle) => {
        if(formData.choosenTags.includes(tagToToggle)){
            setFormData((oldData) => ({...oldData, choosenTags: oldData.choosenTags.filter((tag) => tag !== tagToToggle)}))
        }
        else{
            setFormData((oldData) => ({...oldData, choosenTags: [...oldData.choosenTags, tagToToggle]}))
        }
    }

    const handleClickSave = () => {
        console.log(formData)
        mutationNewPin.mutate(formData, {
            onSuccess: (pin) => {
                if (addMarkerRef.current)
                    addMarkerRef.current(pin.longitude, pin.latitude, [pin.r, pin.g, pin.b]);
                onClose();
            }
        })
    }

    const { data: tags } = useEventTags()
    return(
        <Dialog open={open} onClose={onClose}>
            <Paper sx={{ width: '400px', height: '600px', position: 'relative' }}>
                <Box sx={{ marginTop: '10px' }}>
                    <Typography variant='h5' sx={{ flexGrow: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', width: '100%'}}>
                        {title}
                    </Typography>
                    <IconButton onClick={onClose} sx={{ position: 'absolute', top: '0', right: '0' }}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Box sx={{ padding: '0 10px 0 10px' }}>
                    <TextField label="Name" margin="normal" fullWidth value={formData.name} onChange={handleChangeTitle}/>
                    <TextField label="Description" multiline rows={4} fullWidth margin="normal" value={formData.description} onChange={handleChangeDescription}/>
                    {showDates && 
                    (<LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label='Start date'
                            value={formData.startDate}
                            onChange={handleStartDateChange}
                            renderInput={(params) => <TextField {...params} margin="normal" fullWidth/>}
                        />
                        <DateTimePicker
                            label='End date'
                            value={formData.endDate}
                            onChange={handleEndDateChange}
                            renderInput={(params) => <TextField {...params} margin="normal" fullWidth/>}
                        />
                    </LocalizationProvider>)}
                    <Box sx={{ marginTop: '10px' }}>
                        {tags && tags.map(tag => (
                            <Chip
                                label={tag}
                                variant={formData.choosenTags.includes(tag) ? 'filled' : 'outlined'}
                                onClick={() => handleClickTag(tag)}
                            />
                        ))}
                    </Box>
                </Box>
                <Box sx={{ bottom: '20px', position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button onClick={handleClickSave}>
                        Save
                    </Button>
                </Box>
            </Paper>
        </Dialog>
    )
}