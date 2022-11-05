import PinsService from '../services/PinsService'
import { useQuery } from '@tanstack/react-query'

export default function usePins(){
    return useQuery(['getPins'], () => PinsService.getPins())
}