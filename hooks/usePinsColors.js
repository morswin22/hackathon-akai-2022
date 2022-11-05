import PinsService from '../services/PinsService'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useColors(){
    return useQuery(['getColors'], async () => {
        const responce = await axios.get('/api/colors')
        return responce.data
    })
}